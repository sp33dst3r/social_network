class UserService {
     register(user) {
       return  axios.post('/api/register', {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        })

    }
    login(user) {
        return  axios.post('/api/login', {
             email: user.email,
             password: user.password,
         })

     }
}

export{
    UserService
}
