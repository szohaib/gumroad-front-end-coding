import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_FULFILLED,
    FETCH_PRODUCTS_REJECTED,
} from '../actions/Products_Reviews_Actions';


// INITIALIZE STATE

const initialState = {
    products: [],
    reviews: {},
    fetching: false,
    fetched: false,
    failed: false
};


// REDUCER

export const FetchProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                products: state.products,
                reviews: state.reviews,
                fetching: true,
                fetched: false,
                failed: false
            };
        case FETCH_PRODUCTS_FULFILLED:
            return {
                ...state,
                products: action.payload.productData,
                reviews: action.payload.productReviews,
                fetching: false,
                fetched: true,
                failed: false
            };
        case FETCH_PRODUCTS_REJECTED:
            return {
                ...state,
                products: [],
                reviews: {},
                fetching: false,
                fetched: false,
                failed: true
            };
        default:
            return state;
    }
};