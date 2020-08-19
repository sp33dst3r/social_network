import { userConstants } from '../reducer_constant';

const initialState = {
    submitted: false,
    authorized: false,
    userData:{
        user_id:'',
        access_token: '',
        expires_in: '',
        refresh_token: '',
    }
}

const userReducer = (state = initialState, action) => {

    switch (action.type){
        case userConstants.FORM_SUBMITTED:
           // console.log(action, "ACTION");
            return {
                ...state,
                submitted: action.payload
            }
        case userConstants.FORM_USER_AUTHORIZE_STATUS_CHANGE:
            // console.log(action, "ACTION");
            return {
                ...state,
                authorized: action.payload
            }
        case userConstants.FORM_USER_RECEIVED:
            // console.log(action, "ACTION");
            return {
                ...state,
                userData: {
                    access_token:  action.payload.access_token,
                    expires_in: action.payload.expires_in,
                    refresh_token: action.payload.refresh_token,
                    user_id: action.payload.user_id,
                }

            }
        default:
            return state;
        }

    }

export default userReducer;
