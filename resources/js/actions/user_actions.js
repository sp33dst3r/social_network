import { userConstants } from '../reducer_constant';
const formSubmitter = (sbm) => {
    return {
        type: userConstants.FORM_SUBMITTED,
        payload: sbm
    }
}

const search = (result) => {
    return {
        type: userConstants.SEARCH,
        payload: result
    }
}

const userDataReceiver = (userData) => {
    return {
        type: userConstants.FORM_USER_RECEIVED,
        payload: userData
    }
}
const isAuthorised = (data) => {
    return {
        type: userConstants.FORM_USER_AUTHORIZE_STATUS_CHANGE,
        payload: data
    }
}

export {
    formSubmitter,
    userDataReceiver,
    isAuthorised,
    search
}
