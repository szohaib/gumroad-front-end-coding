// IMPORT PACKAGE REFERENCES

import React , {Fragment , useState} from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES


// COMPONENT

const renderList = (rating, setRating, isEdit, emitData) => (
    <div>
        <div className="">
            {testFn(rating, setRating, isEdit, emitData)}
        </div>
        
    </div>
);

const testFn = (rating , setRating, isEdit, emitData) => {
    const content = [];
    for(let i = 0 ; i < 10 ; i++){

        let starStyles = {
            color: '#eaeaea',
            display: 'inline-block', 
            width: '9px', 
            overflow: 'hidden', 
            direction: (i%2===0) ? 'ltr' : 'rtl',
            cursor: isEdit ? 'pointer' : 'default'
        };
        if (rating.rating  >= i && rating.rating !== null) {
            starStyles.color = 'gold';
        }
        content.push(<span className="fa fa-star" style={starStyles} key={i} onMouseOver={() => handleMouseover(i , setRating, isEdit)} onMouseOut={() => handleMouseout(setRating, isEdit)} onClick={() => handleClick(i, setRating, isEdit , emitData)}></span>);
            
    }
    return (
        <div>
            <div className="">
                {content}
            </div>
        </div>
    );
};

const handleMouseover = (rating , setRating, isEdit) => {
    if(isEdit){
        setRating((prev) => ({
            rating,
            temp_rating: prev.rating
        }));
    }    
};

const handleMouseout = (setRating, isEdit) => {
    if(isEdit){
        setRating((prev) => ({
            rating: (prev.temp_rating)
        }));
    }
};

const handleClick = (rating, setRating, isEdit, emitData) => {
    if(isEdit){
        setRating(() => ({
            rating,
            temp_rating: rating,
        }));

        if(emitData){
            emitData(rating);
        }
    }
};

const DisplayStars = (props) => {
    const [rating , setRating] = useState({rating: (props.rating * 2) - 1, temp_rating: null});
    return (
        <Fragment>
            {renderList(rating , setRating, props.isEdit , props.emitData)}
        </Fragment>
    );
};
DisplayStars.propTypes = {
    rating: PropTypes.number,
    isEdit: PropTypes.bool,
    emitData: PropTypes.func
};

export { DisplayStars };