import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { withRouter } from 'react-router-dom';


export default class News extends React.Component {

  static propTypes = {
    source: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    sent: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(props) {
  }

  render() {
    const {title, description, url, source, sent} = this.props;
    console.log(sent, sent>=0);
    return (
      <div className={`${styles.newsCards} ${styles.box} ${ sent >= 0 ? styles.red : styles.green}`}>
          <div>{title}</div>
          <div>- {description}</div>
          <a href={url}>{source}</a>
      </div>
    );
  }
}
