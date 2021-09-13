// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {ReviewsList} from './ReviewsList';

// IMPORT PROJECT REFERENCES


// COMPONENT

const renderList = (products, productReviews) => (
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


const ProductList = (props) => {
    return(
        <Fragment>
            {renderList(props.products , props.reviews)}
        </Fragment>
    );
};

ProductList.propTypes = {
    products: PropTypes.array,
    reviews: PropTypes.array
};

export { ProductList };