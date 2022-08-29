import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './src/slices/cartSlice'

export const store = configureStore({
  reducer: {
    // products: productsReducer,
    cart: cartReducer
  }
})
