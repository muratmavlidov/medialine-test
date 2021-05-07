import { GlobalActions } from "../actions";
import { AppEvents } from "../events";
import { IProductData } from '../../components/product-card'; 

interface ICartState {
  items: IProductData[],
  usd: number
}

export const exampleInitialState: ICartState = {
  items: [],
  usd: 74,
};

export default (state = exampleInitialState, action: GlobalActions): ICartState => {
  switch (action.type) {

    case AppEvents.CHANGE_CART:
      return { ...state, items: action.payload }
    case AppEvents.UPDATE_USD:
      return { ...state, usd: action.payload }
    default:
      return state;
  }
} 
