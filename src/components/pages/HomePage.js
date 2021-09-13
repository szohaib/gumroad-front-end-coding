// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';


// COMPONENT

const HomePage = () => (
    <div className="p-3 d-flex align-items-center justify-content-center flex-column" >
        <h1>Welcome to Gumroad Product Ratings</h1>
        <h4>Please click <NavLink to="/reviews"> here</NavLink> to check out product ratings</h4>
    </div>
);

export { HomePage };