
import {combineReducers} from 'redux';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';
import { HYDRATE } from 'next-redux-wrapper';

const reducer = (state = { app: 'init', page: 'init' }, action) => {
  switch (action.type) {
      case HYDRATE:
          if (action.payload.app === 'init') delete action.payload.app;
          if (action.payload.page === 'init') delete action.payload.page;
          return state;
      case 'APP':
          return { ...state, app: action.payload };
      case 'PAGE':
          return { ...state, page: action.payload };
      default:
          return state;
  }
};

const rootReducer = combineReducers({
  wrapper: reducer,
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;