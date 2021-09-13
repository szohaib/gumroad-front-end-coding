// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// IMPORT PROJECT REFERENCES

import { fetchProducts, fetchReviews } from '../state/actions/Products_Reviews_Actions';
import { ProductList } from './ProductList';
import { LoadingIndicator } from '../shared/LoadingIndicator/LoadingIndicator';
import firebase from 'firebase';


// COMPONENT

class ProductsBrowser extends Component {

    constructor(props) {
        super(props);
        this.unsubscribers = [];
    }

    async componentDidMount() {
        await this.props.fetchProducts();
        const productIds = this.props.products.map((product) => {
            return product.id;
        });
        const firebaseDB = firebase.firestore();

        this.unsubscribers = productIds.map(productId => {
            return firebaseDB.collection('products').doc(productId).collection('productReviews').onSnapshot(
                async () => {
                    await this.props.fetchProducts();
                    await this.props.fetchReviews();
                });
        });
    }

    componentWillUnmount(){
        for(let i = 0 ; i < this.unsubscribers.length ; i++){
            this.unsubscribers[i]();
        }
    }

    render() {
        return (
            <div>
                <ProductList products={this.props.products} reviews={Object.values(this.props.reviews)} />
                {
                    this.props.fetching && <LoadingIndicator busy={this.props.fetching} />
                }
            </div>
        );
    }
}

ProductsBrowser.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
    products: PropTypes.array,
    reviews: PropTypes.object,
    fetchReviews: PropTypes.func.isRequired
};


// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { fetching, fetched, failed, products } = state.products;
    const { reviews } = state.reviews;

    console.log(state);

    return { fetching, fetched, failed, products, reviews };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchProducts, fetchReviews }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(ProductsBrowser);


// EXPORT COMPONENT

export { hoc as ProductsBrowser };