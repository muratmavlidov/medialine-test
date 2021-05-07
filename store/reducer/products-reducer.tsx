import { GlobalActions } from "../actions";
import { AppEvents } from "../events";
import { IGood, IProductsResult, INamesResult } from "../../services/api";
const uuidv4 = require("uuid/v4");

interface IProductsState {
  products: IGood[]
  dataLoading: boolean
  names: INamesResult
}

export const exampleInitialState: IProductsState = {
  products: null,
  dataLoading: false,
  names: null,
};

const productsAdapter =(data: IProductsResult) => {
  return data.Value.Goods.filter(item => item.P > 0);
};

export default (state = exampleInitialState, action: GlobalActions): IProductsState => {
  switch (action.type) {
    case AppEvents.GET_PRODUCTS_FETCH:
      return { ...state, dataLoading: true }
    case AppEvents.GET_PRODUCTS_SUCCESS:
      return { ...state, dataLoading: false, products: productsAdapter(action.payload) }
    case AppEvents.GET_NAMES_FETCH:
      return { ...state, dataLoading: true }
    case AppEvents.GET_NAMES_SUCCESS:
      return { ...state, dataLoading: false, names: action.payload }
    default:
      return state;
  }
} 
