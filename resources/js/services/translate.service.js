
import messages from '../locales'
class Translate {
    constructor(lang){

    }
    getMessages(){
        console.log(messages, "messages");
        return messages;
    }
}

export{
    Translate
}
