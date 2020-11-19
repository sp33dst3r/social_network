
class Bank {
    getDisciplines(){
        return  axios.get('/api/disciplines', {})
    }
}

export{
    Bank
}
