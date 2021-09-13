// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// IMPORT PROJECT REFERENCES

import { fetchProducts } from '../state/actions/Products_Reviews_Actions';


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
                {this.props.products.map(prodcut => {
                    return (
                        <p key={prodcut.id}>{prodcut.id}</p>
                    );
                })}
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
};


// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { fetching, fetched, failed, products } = state.products;

    console.log(state);

    return { fetching, fetched, failed, products };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchProducts }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(ProductsBrowser);


// EXPORT COMPONENT

export { hoc as ProductsBrowser };