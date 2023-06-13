import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import { middleware } from './middleware';

const store = configureStore({
  reducer: {
    products: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export default store;
