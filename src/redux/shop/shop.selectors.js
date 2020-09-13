import { createSelector } from 'reselect'

import memoize from 'lodash.memoize'


const selectShop = (state) => state.shop

export const selectCollections = createSelector(
    [selectShop],

    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],


    collections => collections ? Object.keys(collections).map(key => collections[key]) : []

)

export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectCollections],

        collections => collections ? collections[collectionUrlParam] : null
    )
)


    // The logic above is just a logical selector to return the collectionUrlParam that is equall to value of our COLLECTION_ID_MAP keys
    // We are doing this because our URL parameter is a string whereas the id from each collection we wanna match is an integar number