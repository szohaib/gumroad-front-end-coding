import { fetchReviews , fetchProducts } from '../../services/Products_Reviews_Service';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_REVIEWS_PENDING = 'FETCH_REVIEWS_PENDING';
export const FETCH_REVIEWS_FULFILLED = 'FETCH_REVIEWS_FULFILLED';
export const FETCH_REVIEWS_REJECTED = 'FETCH_REVIEWS_REJECTED';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_FULFILLED = 'FETCH_PRODUCTS_FULFILLED';
export const FETCH_PRODUCTS_REJECTED = 'FETCH_PRODUCTS_REJECTED';


// ACTION GENERATORS
const fetchReviewsAction = () => ({
    type: FETCH_REVIEWS,
    payload: fetchReviews()
});
const fetchProductsAction = () => ({
    type: FETCH_PRODUCTS,
    payload: fetchProducts()
});


// EXPORT ACTIONS

export { fetchReviewsAction as fetchReviews, fetchProductsAction as fetchProducts};