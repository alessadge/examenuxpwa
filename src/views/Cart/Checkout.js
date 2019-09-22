import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Button } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import config from '../../config/config';
import CardProduct from './CartProduct';

class Checkout extends Component {
  getItems() {
    const items = this.props.cart;

    return JSON.stringify(
      items.map(item => ({ id: item.id, quantity: item.quantity, variationId: _.isNil(item.variationId) ? '' : item.variationId })),
    );
  }

  render() {
    return (
      

        <Button color="black" fluid type="submit" href="./Home"onClick={CardProduct.removeItem}>
          Checkout
        </Button>
        

    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default Checkout;
