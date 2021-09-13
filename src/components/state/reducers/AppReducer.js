// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS
import { FetchProductsReducer } from './FetchProductsReducer';
import { FetchReviewsReducer } from './FetchReviewsReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    reviews: FetchReviewsReducer,
    products: FetchProductsReducer
});