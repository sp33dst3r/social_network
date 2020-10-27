import axios from 'axios';
const getTokenStorage = localStorage.getItem("access_token");
const expires_in = localStorage.getItem("expires_in");
let isAlreadyFetchingAccessToken = false;

let subscribers = [];
const saveUserToStorage = (response) => {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    localStorage.setItem('expires_in', response.data.expires_in);
    localStorage.setItem('user_id', response.data.user_id);
}
const getUserFromStorage = () => {
    const expires_in = window.localStorage.getItem("expires_in");
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    const user_id = window.localStorage.getItem("user_id");
    return {
        expires_in,
        access_token,
        refresh_token,
        user_id
    }
}
function isTokenExpiredError() {
    const expires_in = localStorage.getItem("expires_in")

   // const accessTokenExpires = getTokenStorage && STORAGE.jwtDecode(getTokenStorage.access_token);
    const getTime = new Date().getTime() / 1000;
    return expires_in <= getTime;
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

function setAuthBearerToken(token) {
    console.log(token, "TOKEN");

    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
}

function onAccessTokenFetched(accessToken) {
    console.log("onAccessTokenFetched");

    subscribers.forEach(callback => callback(accessToken));
    subscribers = [];
}


async function resetTokenAndReattemptRequest(error) {
    console.log("ASYNC");

    try {
      const { response: errorResponse } = error;
      const resetToken = localStorage.getItem("refresh_token");
      console.log(resetToken, "RESET TOKEN");

      if (!resetToken) {
          console.log("return Promise.reject(error);");

        return Promise.reject(error);
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken) => {
            console.log(accessToken, "accessToken");

          errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(axios(errorResponse.config));
        });
      });

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        const response = await axios({
          method: 'post',
          url: "/oauth/token",
          data: {
              refresh_token: resetToken,
          },
        });

        if (!response.data) {
          return Promise.reject(error);
        }

        const newToken = response.data.access_token;
        setAuthBearerToken(newToken);
        onAccessTokenFetched(newToken);
        localStorage.setItem('token', {
          access_token: newToken,
          refresh_token: response.data.refresh_token,
        });
        isAlreadyFetchingAccessToken = false;
      }

      return retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export async function fetchWithAuth(url, options) {

    const loginUrl = '/login'; // url страницы для авторизации
    let tokenData = null; // объявляем локальную переменную tokenData

    if (sessionStorage.authToken) { // если в sessionStorage присутствует tokenData, то берем её
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
       return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }

    if (!options.headers) { // если в запросе отсутствует headers, то задаем их
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) { // проверяем не истек ли срок жизни токена
            try {
                const newToken = await refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
                saveToken(newToken);
            } catch (err) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
               return  window.location.replace(loginUrl);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }

    return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
}

export {
    saveUserToStorage,
    getUserFromStorage,
    isTokenExpiredError,
    setAuthBearerToken,
    resetTokenAndReattemptRequest
}
