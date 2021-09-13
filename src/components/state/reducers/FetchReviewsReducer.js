import {
    FETCH_REVIEWS_PENDING,
    FETCH_REVIEWS_FULFILLED,
    FETCH_REVIEWS_REJECTED,
} from '../actions/Products_Reviews_Actions';


// INITIALIZE STATE

const initialState = {
    reviews: {},
    products: [],
    fetching: false,
    fetched: false,
    failed: false
};


// REDUCER

export const FetchReviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_REVIEWS_PENDING:
            return {
                ...state,
                reviews: state.reviews,
                products: state.products,
                fetching: false,
                fetched: true,
                failed: false
            };
        case FETCH_REVIEWS_FULFILLED:
            return {
                ...state,
                reviews: action.payload.productReviews,
                products: action.payload.productData,
                fetching: false,
                fetched: true,
                failed: false
            };
        case FETCH_REVIEWS_REJECTED:
            return {
                ...state,
                reviews: {},
                products: [],
                fetching: false,
                fetched: false,
                failed: true
            };
        default:
            return state;
    }
};