import UserActionTypes from './user.types'


export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});


export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})


export const signInFaliure = (error) => ({
    type: UserActionTypes.SIGN_IN_FALIURE,
    payload: error
})



export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFaliure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FALIURE,
    payload: error
})


export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FALIURE,
    payload: error
})