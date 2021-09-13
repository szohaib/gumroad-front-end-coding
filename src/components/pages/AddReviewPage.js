// IMPORT PACKAGE REFERENCES

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../services/Products_Reviews_Service';
import {DisplayStars} from '../ProductsBrowser/DisplayStars';
import { NavLink } from 'react-router-dom';

// COMPONENT

const AddReviewPage = (props) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setText] = useState('');
    const [reviewSubmitted , setReviewSubmitted] = useState(false);
    const dispatch = useDispatch();
    return (
        
        <div className="p-3 d-flex justify-content-center">
            <div className="card" style={{width: '600px'}}>
                <div className="card-body">
                    <h1 className="card-title mb-4">What&apos;s your rating?</h1>
                    <div className="rating-block">
                        <h6 className="mb-2">Rating</h6>
                        <DisplayStars rating={rating} isEdit={true} emitData={(emittedData) => emittedRating(emittedData , setRating)}></DisplayStars>
                    </div>
                    <div className="review-block mt-4">
                        <h6 className="mb-2">Review</h6>
                        <input type="text" value={reviewText} onChange={(e) => setText(e.target.value)}></input>
                    </div>
                    <button type="button" className="btn btn-light btn-sm mt-3" onClick={() => addNewReview(rating , reviewText , props, dispatch , setReviewSubmitted)}>Submit Review</button>

                    {showSuccessMessage(reviewSubmitted)}
                    
                </div>
            </div>
        </div>
    );
};

const showSuccessMessage = (reviewSubmitted) => {
    if(reviewSubmitted){
        return <p>Review Successfully submitted. Please click here to go back <NavLink to='/reviews' activeClassName='menu selected' exact={true}>Reviews Page</NavLink></p>;
    }
};


const emittedRating = (rating, setRating) => {
    setRating(( rating / 2 ) + 0.5);
};

const addNewReview = async (rating, reviewText, props, dispatch, setReviewSubmitted) => {
    try{
        const productId = props.match.params.productId;
        await addReview({productId: productId, rating: rating, reviewText: reviewText});
        setReviewSubmitted(true);
    }
    catch(error){
        console.error(error);
    }
};

export { AddReviewPage };