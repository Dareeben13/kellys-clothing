import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  // this line is just telling redux persist that i want to use local storage as our default storage

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

const persistConfig = {
    key: 'root',  // key is just to tell the point inside our reducer object we want to start storing everything.
    storage,
    whitelist: ['cart']
}

// whitelist is an array containing the string names of any of the reducer that we want to store

//  our user session is already handled by firebase, so no need to persist it

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})
export default persistReducer(persistConfig, rootReducer)