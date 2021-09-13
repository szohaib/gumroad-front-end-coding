// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES


// COMPONENT



const renderList = (reviews) => (
    
    <div className="review-wrapper">
        <div className="list-group animated fadeIn">
            {console.log('reviews' , reviews)}
            {reviews.map((review, index) => {
                return (
                    <div key={index} className="review-section">
                        <p className="review-text" style={{fontSize: '14px'}}>{review.reviewText}</p>
                       
                    </div>
                );
            })}
        </div>
    </div>
);

const ReviewsList = (props) => {
    return(
        <Fragment>
            {console.log('props' , props)}
            {renderList(props.reviews)}
        </Fragment>
    );
};

ReviewsList.propTypes = {
    reviews: PropTypes.array,
};

export { ReviewsList };