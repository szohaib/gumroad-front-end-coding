// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {ReviewsList} from './ReviewsList';
import { useHistory } from 'react-router-dom';
import { DisplayStars } from './DisplayStars';

// IMPORT PROJECT REFERENCES


// COMPONENT

const renderList = (products, productReviews , history) => (
    <div>
        <div className="list-group animated fadeIn">
            {products.map((product, index) => {
                // const productNameStyles = {
                //     fontSize: '40px',
                //     margin: '0px'
                // };
                return (
                    (<div key={index} className="card mb-3" style={{width: '600px'}}>
                        <div className="card-body">
                            <h1 className="card-title">{product.data.productName}</h1>
                            <div className="product-rating d-flex align-items-center" >
                                <h4 style={{margin: '0px'}} className="mr-3">{product.averageRating}</h4>
                                <DisplayStars rating={Math.round(product.averageRating)}></DisplayStars>
                                <button type="button" className="btn btn-light btn-sm" style={{marginLeft: 'auto'}} onClick={() => addReviewNow(product.id, history)}>Add Review</button>
                            </div>
                            <hr/>
                            <h5 style={{fontWeight: 'bold'}} className="mb-3">Reviews</h5>
                            {productReviews.map((productReview) => {
                                if(productReview.productId === product.id){
                                    return (<ReviewsList reviews={productReview.reviews} key={productReview.productId}></ReviewsList>);
                                }
                            })}
                        </div>
                    </div>)
                );
            })}
        </div>
        
    </div>
);

const addReviewNow = (productId, history) => {
    
    history.push(`addReview/${productId}`);
};


const ProductList = (props) => {
    let history = useHistory();
    return(
        <Fragment>
            {renderList(props.products , props.reviews, history)}
        </Fragment>
    );
};

ProductList.propTypes = {
    products: PropTypes.array,
    reviews: PropTypes.array
};

export { ProductList };