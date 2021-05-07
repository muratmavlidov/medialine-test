import { AnyFunction } from "../types";
import { AppEvents } from "./events";
import { Dispatch } from "redux";
import api, { IProductsResult, INamesResult } from "../services/api";
import { IProductData } from '../components/product-card'; 

type ActionUnion<A extends Record<string, AnyFunction>> = ReturnType<
  A[keyof A]
>;

type ActionCreator<T, P> = (payload: P) => { type: T; payload: P };
type ActionCreatorWithoutPayload<T> = () => { type: T };

export function makeAction<T extends AppEvents>(
  type: T
): ActionCreatorWithoutPayload<T>;
export function makeAction<T extends AppEvents, P>(
  type: T
): ActionCreator<T, P>;
export function makeAction<T extends AppEvents, P>(type: T) {
  return function (payload?: P) {
    return { type, payload };
  };
}

const getProductsFetch = makeAction(AppEvents.GET_PRODUCTS_FETCH);

const getProductsSuccess = makeAction<
  AppEvents.GET_PRODUCTS_SUCCESS,
  IProductsResult[]
>(AppEvents.GET_PRODUCTS_SUCCESS);

const getNamesFetch = makeAction(AppEvents.GET_NAMES_FETCH);

const getNamesSuccess = makeAction<
  AppEvents.GET_NAMES_SUCCESS,
  INamesResult[]
>(AppEvents.GET_NAMES_SUCCESS);

export const changeCart = makeAction<
  AppEvents.CHANGE_CART,
  IProductData
>(AppEvents.CHANGE_CART);

type IUSDData = number;
export const updateUSD = makeAction<
AppEvents.UPDATE_USD,
IUSDData
>(AppEvents.UPDATE_USD);

const actions = {
  getProductsFetch,
  getProductsSuccess,
  getNamesFetch,
  getNamesSuccess,
  changeCart,
  updateUSD
};

export type GlobalActions = ActionUnion<typeof actions>;

export const getData = () => {
  return async (dispatch: Dispatch<GlobalActions>) => {
    dispatch(getNamesFetch())
    dispatch(getProductsFetch())
    try {
      const namesData = await api.getNames();
      const productsData = await api.getProducts();
      dispatch(getNamesSuccess(namesData));
      dispatch(getProductsSuccess(productsData));
    } catch (e) {
      console.error(e);
    }
  };
}