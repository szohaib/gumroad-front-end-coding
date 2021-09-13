import { fetchProducts } from '../../services/Products_Reviews_Service';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_FULFILLED = 'FETCH_PRODUCTS_FULFILLED';
export const FETCH_PRODUCTS_REJECTED = 'FETCH_PRODUCTS_REJECTED';


// ACTION GENERATORS
const fetchProductsAction = () => ({
    type: FETCH_PRODUCTS,
    payload: fetchProducts()
});


// EXPORT ACTIONS

export {fetchProductsAction as fetchProducts};