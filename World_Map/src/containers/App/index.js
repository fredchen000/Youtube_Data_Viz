import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import Stock from '../../pages/Detail';
import World from '../../pages/World'
import _ from 'lodash';
import '@/styles/app.scss';

import styles from './styles.scss';


class App extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          Comp4462 Project
          <div
            className={styles.returnIcon}
            onClick={()=>{
              this.props.history.push('/');
            }}
          >
            &#xe624;
          </div>
        </div>
        <Route path="/" component={World} />
      </div>
    );
  }
}

export default withRouter(App);
