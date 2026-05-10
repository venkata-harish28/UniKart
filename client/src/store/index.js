import { configureStore } from '@reduxjs/toolkit';
import authReducer        from './slices/authSlice';
import productReducer     from './slices/productSlice';
import wishlistReducer    from './slices/wishlistSlice';
import chatReducer        from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth:         authReducer,
    products:     productReducer,
    wishlist:     wishlistReducer,
    chat:         chatReducer,
    notifications: notificationReducer,
  },
});