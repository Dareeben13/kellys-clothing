import { takeLatest, call, put, all } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFaliure } from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections')
        const snapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFaliure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}


export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}