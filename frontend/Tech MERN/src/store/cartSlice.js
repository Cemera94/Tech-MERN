import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../config/localStorageConfig';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotalPrice: 0,
    cartCouponTotalPrice: 0,
    isNewItem: false,
    isOldItem: false,
    isRemovedItem: false,
  },
  reducers: {
    setAddToCart: (state, action) => {
      let copyCartItems = [...state.cartItems];
      let findIndex = null;

      copyCartItems.find((item, index) => {
        if (item._id === action.payload._id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        copyCartItems.push({
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price,
        });
        state.cartTotalPrice =
          parseInt(state.cartTotalPrice) + action.payload.price;
        state.isNewItem = true;
        state.isOldItem = false;
        state.isRemovedItem = false;
      } else {
        copyCartItems[findIndex].count += 1;
        copyCartItems[findIndex].totalPrice =
          copyCartItems[findIndex].count * copyCartItems[findIndex].price;
        state.cartTotalPrice = subTotal(copyCartItems);
        state.isOldItem = true;
        state.isNewItem = false;
        state.isRemovedItem = false;
      }
      state.cartItems = copyCartItems;
    },
    setRemoveItem: (state, action) => {
      let copyCartItems = [...state.cartItems];
      let findIndex = null;

      copyCartItems.find((item, index) => {
        if (item._id === action.payload._id) {
          findIndex = index;
        }
      });

      if (findIndex != null) {
        copyCartItems.splice(findIndex, 1);
        state.isNewItem = false;
        state.isOldItem = false;
        state.isRemovedItem = true;

        state.cartTotalPrice = subTotal(copyCartItems);
      }

      state.cartItems = copyCartItems;
    },
    setHandleCount: (state, action) => {
      let copyCartItems = [...state.cartItems];
      let findIndex = null;

      copyCartItems.find((item, index) => {
        if (item._id === action.payload.element._id) {
          findIndex = index;
        }
      });

      if (action.payload.operation === 'decrement' && findIndex !== null) {
        if (copyCartItems[findIndex].count != 1) {
          copyCartItems[findIndex].count--;
          copyCartItems[findIndex].totalPrice =
            copyCartItems[findIndex].count * copyCartItems[findIndex].price;
          state.cartTotalPrice = subTotal(copyCartItems);
          state.isNewItem = false;
          state.isOldItem = false;
          state.isRemovedItem = false;
        } else if (copyCartItems[findIndex].count === 1) {
          copyCartItems.splice(findIndex, 1);
          state.isNewItem = false;
          state.isOldItem = false;
          state.isRemovedItem = true;
          state.cartTotalPrice = subTotal(copyCartItems);
          localStorage.removeItem(localStorageConfig.CART);
          localStorage.removeItem(localStorageConfig.CART_TOTAL_PRICE);
        }
      } else if (
        action.payload.operation === 'increment' &&
        findIndex !== null
      ) {
        copyCartItems[findIndex].count++;
        copyCartItems[findIndex].totalPrice =
          copyCartItems[findIndex].count * copyCartItems[findIndex].price;
        state.cartTotalPrice = subTotal(copyCartItems);
        state.isNewItem = false;
        state.isOldItem = false;
        state.isRemovedItem = false;
      }
      state.cartItems = copyCartItems;
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
    setCartCouponPrice: (state, action) => {
      state.cartCouponTotalPrice = action.payload;
    },
  },
});

function subTotal(arr) {
  return arr.reduce((acc, current) => {
    return acc + current.totalPrice;
  }, 0);
}

export const {
  setAddToCart,
  setRemoveItem,
  setHandleCount,
  setCart,
  setCartTotalPrice,
  setCartCouponPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
