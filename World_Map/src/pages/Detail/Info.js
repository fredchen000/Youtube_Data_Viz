import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { withRouter } from 'react-router-dom';


export default class Info extends React.Component {

  static propTypes = {
    detailInfo: PropTypes.array.isRequired,
    unit: PropTypes.string.isRequired,
    judge: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <div className={`${styles.detailCard} ${styles.box}`}>
        {_.map([0,1,2,3], (item, index) => {
          // console.log(parseFloat(dayPower[`TPWR${index+1}`]).toFixed(2))
          return(
            <div key={index} className={styles.detail}>
              {this.props.judge && parseFloat(this.props.detailInfo[index]).toFixed(2) < 0.04 ? 0.00 : parseFloat(this.props.detailInfo[index]).toFixed(2)}{this.props.unit}
            </div>
          );
        })}
      </div>
    );
  }
}
