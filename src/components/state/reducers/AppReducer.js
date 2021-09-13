// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS
import { FetchProductsReducer } from './FetchProductsReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    products: FetchProductsReducer
});