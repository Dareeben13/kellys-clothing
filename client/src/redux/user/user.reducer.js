import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: ""
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: ""
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FALIURE:
        case UserActionTypes.SIGN_OUT_FALIURE:
        case UserActionTypes.SIGN_UP_FALIURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}

export default userReducer;