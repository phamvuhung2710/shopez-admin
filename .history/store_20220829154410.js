import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
})
