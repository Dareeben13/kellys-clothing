import { call, all, put, takeLatest, take } from 'redux-saga/effects'

import UserActionTypes from '../user/user.types'
import CartActionTypes from './cart.types'

import { clearCart } from './cart.actions'

export function* clearCartOnSignOut() {
    yield put(clearCart())
}

export function* clearCartOnPayment() {
    yield put(clearCart())
}

export function* paymentSuccessClearCart() {
    yield take(CartActionTypes.CLEAR_CART, clearCartOnPayment)
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield (all([
        call(onSignOutSuccess),
        call(paymentSuccessClearCart)
    ]))
}