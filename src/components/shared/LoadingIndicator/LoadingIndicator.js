// IMPORT PACKAGE REFERENCES

import React from 'react';
import PropTypes from 'prop-types';


// COMPONENT

const LoadingIndicator = (props) => (
    <div>
        {
            props.busy &&
            <div className="loading">
                <div></div>
                <div></div>
                <div></div>
            </div>
        }
    </div>
);


// CONFIGURE COMPONENT PROP TYPES

LoadingIndicator.propTypes = {
    busy: PropTypes.bool
};


// EXPORT COMPONENT

export { LoadingIndicator };