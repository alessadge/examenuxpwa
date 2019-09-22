import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } from 'react-share';
import { Header, Card, Icon, Grid } from 'semantic-ui-react';

class SocialBox extends Component {
  render() {
    return (
      <h3></h3>
    );
  }
}

SocialBox.propTypes = {
  permalink: PropTypes.string.isRequired,
};

export default SocialBox;
