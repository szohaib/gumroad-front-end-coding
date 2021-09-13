// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// IMPORT PROJECT REFERENCES

import { fetchProducts } from '../state/actions/Products_Reviews_Actions';
import { ProductList } from './ProductList';


// COMPONENT

class ProductsBrowser extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.fetchProducts();
    }

    render() {
        return (
            <div>
                <ProductList products={this.props.products} reviews={Object.values(this.props.reviews)}></ProductList>
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
    reviews: PropTypes.object
};


// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { fetching, fetched, failed, products, reviews } = state.products;

    console.log(state);

    return { fetching, fetched, failed, products, reviews };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchProducts }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(ProductsBrowser);


// EXPORT COMPONENT

export { hoc as ProductsBrowser };