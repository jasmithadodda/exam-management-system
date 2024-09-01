/* This code snippet is creating a Redux store using Redux Toolkit. It imports the `configureStore`
function from `@reduxjs/toolkit`, as well as an `authReducer` from the file located at
`./slices/authSlice`. It then configures the Redux store with the `authReducer` as part of the
reducers object, and exports the created store as `store`. This store will be used to manage the
application's state using Redux. */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
