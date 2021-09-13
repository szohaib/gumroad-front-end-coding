// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DisplayStars } from './DisplayStars';

// IMPORT PROJECT REFERENCES


// COMPONENT



const renderList = (reviews) => (
    
    <div className="review-wrapper d-flex">
        <div className="list-group animated fadeIn">
            {console.log('old' , reviews)}
            {reviews.map((review, index) => {
                return (
                    <div key={index} className="review-section d-flex">
                        <DisplayStars rating={review.rating} isEdit={false}></DisplayStars>
                        <strong className="review-stars ml-3" style={{width: '30px', fontSize: '14px'}}>{review.rating}</strong>
                        <p className="review-text animated fadeIn ml-1" style={{fontSize: '14px'}}>{review.reviewText}</p>
                       
                    </div>
                );
            })}
        </div>
    </div>
);

const ReviewsList = (props) => {
    return(
        <Fragment>
            {console.log('hey' , props)}
            {renderList(props.reviews)}
        </Fragment>
    );
};

ReviewsList.propTypes = {
    reviews: PropTypes.array,
};

export { ReviewsList };