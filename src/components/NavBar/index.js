import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Label, Menu, Button, Input, Form } from 'semantic-ui-react';
import config from '../../config/config';
import { openMenu, openSearch, closeSearch } from './actions';
import { isSearchVisible } from './reducer';
import { getCart } from '../../views/Cart/reducer';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      toSearchPage: false,
    };

    this.showSidebar = this.showSidebar.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openSearch = this.openSearch.bind(this);
  }

  getQuantity() {
    const { cart } = this.props;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  setSearch(e) {
    this.setState({ search: e.target.value });
  }

  /**
   * Handle search form submit.
   * Set state for redirecting to search page and close search box.
   */
  handleSubmit() {
    this.setState({ toSearchPage: this.state.search, search: '' }, () => this.props.closeSearch());
  }

  /**
   * Open search box when icon is clicked.
   * Reset search input and redirect when the search is opened.
   */
  openSearch() {
    this.setState({ toSearchPage: false, search: '' }, () => this.props.openSearch());
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    const { searchVisible } = this.props;

    return (
      <Segment basic color="black" inverted size="small" className="nav-bar">
        <Menu fluid secondary>
          <Menu.Item onClick={this.showSidebar} fitted>
            <Icon name="content" size="large" onClick={this.showSidebar} className="shop-icon" />
          </Menu.Item>
          <Menu.Item className="shop-name" fitted>
           
                <Link to="/">Prestige Watches</Link>
          
            
          </Menu.Item>
          <Menu.Item position="right" fitted>
            <Menu.Item fitted>
              
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label
                      color="red"
                      size="mini"
                      floating
                      circular
                      content={this.getQuantity()}
                      className="cart-counter"
                    />
                  )}
                </Link>
              </Icon.Group>
            </Menu.Item>
          </Menu.Item>
        </Menu>
        {this.state.toSearchPage !== false && searchVisible ? <Redirect to={`/search/${this.state.toSearchPage}`} /> : null}
      </Segment>
    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  closeSearch: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
  searchVisible: isSearchVisible(state.navbar),
});

export default connect(
  mapStateToProps,
  { openMenu, openSearch, closeSearch },
)(NavBar);
