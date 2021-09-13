// IMPORT PACKAGE REFERENCES

import React , {Fragment , useState} from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES


// COMPONENT

const renderList = (rating, setRating) => (
    <div>
        {testFn(rating, setRating)}
    </div>
);

const testFn = (rating , setRating) => {
    const content = [];
    for(let i = 0 ; i < 10 ; i++){

        let starStyles = {
            color: '#eaeaea',
            display: 'inline-block', 
            width: '9px', 
            overflow: 'hidden', 
            direction: (i%2===0) ? 'ltr' : 'rtl',
        };
        if (rating.rating  >= i && rating.rating !== null) {
            starStyles.color = 'gold';
        }
        content.push(<span className="fa fa-star" style={starStyles} key={i} onMouseOver={() => handleMouseover(i , setRating)} onMouseOut={() => handleMouseout(setRating)} onClick={() => handleClick(i, setRating)}></span>);
            
    }
    return (
        <div>
            <div className="">
                {content}
            </div>
        </div>
    );
};

const handleMouseover = (rating , setRating) => {

    setRating((prev) => ({
        rating,
        ratingCopy: prev.rating
    }));
     
};

const handleMouseout = (setRating) => {
   
    setRating((prev) => ({
        rating: (prev.ratingCopy)
    }));
};

const handleClick = (rating, setRating) => {
    setRating(() => ({
        rating,
        ratingCopy: rating,
    }));

    
};

const DisplayStars = (props) => {
    const [rating , setRating] = useState({rating: (props.rating * 2) - 1, ratingCopy: null});
    return (
        <Fragment>
            {renderList(rating , setRating)}
        </Fragment>
    );
};
DisplayStars.propTypes = {
    rating: PropTypes.number,
};

export { DisplayStars };