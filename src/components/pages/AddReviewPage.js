// IMPORT PACKAGE REFERENCES

import React, { useState } from 'react';
import { addReview } from '../services/Products_Reviews_Service';
import {DisplayStars} from '../ProductsBrowser/DisplayStars';

// COMPONENT

const AddReviewPage = (props) => {
    const [rating] = useState(0);
    const [reviewText, setText] = useState('');
    return (
        
        <div className="p-3 d-flex justify-content-center">
            <div className="card" style={{width: '600px'}}>
                <div className="card-body">
                    <h1 className="card-title mb-4">What&apos;s your rating?</h1>
                    <div className="rating-block">
                        <h6 className="mb-2">Rating</h6>
                        <DisplayStars rating={rating}></DisplayStars>
                    </div>
                    <div className="review-block mt-4">
                        <h6 className="mb-2">Review</h6>
                        <input type="text" value={reviewText} onChange={(e) => setText(e.target.value)}></input>
                    </div>
                    <button type="button" className="btn btn-light btn-sm mt-3" onClick={() => addNewReview(rating , reviewText , props)}>Submit Review</button>
                    
                </div>
            </div>
        </div>
    );
};

const addNewReview = async (rating, reviewText, props) => {
    try{
        const productId = props.match.params.productId;
        await addReview({productId: productId, rating: rating, reviewText: reviewText});
    }
    catch(error){
        console.error(error);
    }
};

export { AddReviewPage };