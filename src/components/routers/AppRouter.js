// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES
import { DisplayReviewsPage } from '../pages/DisplayReviewsPage';
import { AddReviewPage } from '../pages/AddReviewPage';


// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>      
            <Switch>
                <Route path='/reviews' component={DisplayReviewsPage} />
                <Route path='/addReview/:productId' component={AddReviewPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);