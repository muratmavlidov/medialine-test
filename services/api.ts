import axios from 'axios';

const _API_BASE = "https://raw.githubusercontent.com/nakukop/test/main";

export interface IGood {
  B: boolean,
  C: number,
  CV?: any,
  G: number,
  P: number,
  Pl: any,
  T: number
}

export interface IProductsResult {
  Error: string,
  Id: number,
  Success: boolean,
  Value: {
    Goods: IGood[]
  }
}

export interface INameBData {
  N: string,
  T: number | string
}

interface INameB {
  [key: number]: INameBData
}

export interface IName {
  B: INameB
  C?: number,
  G: string
}

export interface INamesResult {
  [key: number]: IName 
}

export default {
  getProducts: async () => {
    return axios.get(`${_API_BASE}/products.json`)
      .then(({ data }) => data);
  },

  getNames: async () => {
    return axios.get(`${_API_BASE}/names.json`)
      .then(({ data }) => data);
  }
}
