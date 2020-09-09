// There are actually two types of selectors that we can write
// INPUT SELECTORS : Which doesn't use createSelector
// OUTPUT SELECTORS :   Which uses createSelector

import { createSelector } from 'reselect'

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    // createSelector Takes two Arguments
    // First is a Collection i.e an Array of Input Selectors
    [selectCart],
    //  Second is a Function that returns the value we want out of the selector
    (cart) => cart.cartItems

);

export const selectCartHidden = createSelector(
    [selectCart],

    (cart) => cart.hidden
)

// Because we used createSelector to make the selectCartItems selector, the Selector is now a memoized selector 


export const selectCartItemsCount = createSelector(
    [selectCartItems],

    (cartItems) => cartItems.reduce(
        (quantitySum, cartItem) => quantitySum + cartItem.quantity,
        0
    ),
)

export const selectCartTotal = createSelector(
    [selectCartItems],

    (cartItems) => cartItems.reduce(
        (quantitySum, cartItem) => quantitySum + cartItem.quantity * cartItem.price,
        0
    ),

)
