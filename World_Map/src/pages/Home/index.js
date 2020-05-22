import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { plugControl } from './action.js';
import Card from './Card.js'


class Home extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      symbol: "",
      error: "",
    };
    console.log(this.props.history);
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.title}>
          Please Input the Symbol(Ticker)
        </div>
        {/* {_.map(plugs, (item, index) => {
        //   return(<Card key={index} plugID={item} />);
        // })} */}
        <div className={styles.addPlug}>
          <input
            placeholder="Symbol (ex: AAPL)"
            onChange={(event)=>{
              this.setState({
                symbol: event.target.value,
              });
            }}
          />
          <div
            className={styles.addButton}
            onClick={() => {
                this.props.history.push("/detail/"+this.state.symbol);
            }}
          >Search</div>
        </div>
        <div style={{color: 'red'}}>{this.state.error}</div>
      </div>
    );
  }
}

export default withRouter(Home);
