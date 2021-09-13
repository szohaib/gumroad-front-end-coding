// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES
import { DisplayReviewsPage } from '../pages/DisplayReviewsPage';


// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>      
            <Switch>
                <Route path='/' component={DisplayReviewsPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);