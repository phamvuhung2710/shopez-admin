import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    // products: productsReducer,
    cart: cartReducer
  }
})