import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './features/placeSlice';
import loginReducer from './features/authoritySlice';

export default configureStore({
  reducer: { place: placeReducer, authority: loginReducer },
});
