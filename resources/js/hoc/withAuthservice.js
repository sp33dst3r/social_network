import React from 'react';

import {UserConsumer} from '../withuser-service/withuser-service'

const withAuthService = () => (Wrapped) => {
    return (props) => {

        return (
            <UserConsumer>
                {
                    (userService) => {
                       return <Wrapped { ...props } userService={userService} />
                    }
                }


            </UserConsumer>
        )
    }
}

export default withAuthService;
