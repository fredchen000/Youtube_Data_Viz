import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

export default class Root extends React.Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  render() {
    return (
      <BrowserRouter>
        {this.props.app}
      </BrowserRouter>
    );
  }
}
