import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { plugControl } from './action.js';
import WorldMap from './WorldMap.js';
import Chord from './Chord.js';
import Parallel from './Parallel.js';
import 'antd/dist/antd.css';
import {Dropdown, Menu} from 'antd';


class World extends React.Component {

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
      month: "01",
      category: "Autos & Vehicles",
      property: "views",
      color: "dodgerblue",
      country: "US",
    };
  }
  componentDidMount(){

  }
  componentWillReceiveProps(props) {
  }

  render() {
    const {month, category, property, color, country} = this.state;
    return (
      <div className={styles.body}>
        <div className={styles.title}>
          World Youtube Video Trending Statistic Visualiztion
        </div>
        <div className={styles.d3Area}>
          <WorldMap month={month} category={category} property={property} color={color}/>
          <div className={styles.category}>
            Filter Options
            <br/>
            <div className={styles.detail}>
              Month: {month}
              <br/>
              <button onClick={(e) => {this.setState({ month: "11"});}}>11</button>
              <button onClick={(e) => {this.setState({ month: "12"});}}>12</button>
              <button onClick={(e) => {this.setState({ month: "01"});}}>01</button>
              <button onClick={(e) => {this.setState({ month: "02"});}}>02</button>
              <br/>
              <button onClick={(e) => {this.setState({ month: "03"});}}>03</button>
              <button onClick={(e) => {this.setState({ month: "04"});}}>04</button>
              <button onClick={(e) => {this.setState({ month: "05"});}}>05</button>
              <button onClick={(e) => {this.setState({ month: "06"});}}>06</button>
            </div>
            <div className={styles.detail}>
              Category: {category}
              <br/>
              <select value={this.state.category} onChange={(event) => {this.setState({category: event.target.value})}}>
                {_.map(['Music', 'Comedy', 'Entertainment', 'News & Politics',
                        'People & Blogs', 'Howto & Style', 'Film & Animation',
                        'Science & Technology', 'Gaming', 'Sports',
                        'Nonprofits & Activism', 'Pets & Animals', 'Travel & Events',
                        'Autos & Vehicles', 'Education', 'Shows', 'Movies', 'Trailers'],
                        (item, index) => {
                        return(
                          <option value={item}>{item}</option>
                        );
                })}
              </select>
            </div>
            <div className={styles.detail}>
              Numeric Value: {property}
              <br/>
              <select value={this.state.property} onChange={(event) => {
                if(event.target.value === "toxic_rate"){
                  this.setState({
                    property: event.target.value,
                    color: "#FF4136",
                  });
                }
                else if(event.target.value === "favor_rate"){
                  this.setState({
                    property: event.target.value,
                    color: "#FF851B",
                  });
                }
                else if(event.target.value === "comment_rate"){
                  this.setState({
                    property: event.target.value,
                    color: "#2ECC40",
                  });
                }
                else{
                  this.setState({
                    property: event.target.value,
                    color: "dodgerblue",
                  });
                }
              }}>
                {_.map(['views', 'likes', 'dislikes', 'comment_count', 'toxic_rate', 'favor_rate', 'comment_rate'],
                        (item, index) => {
                        return(
                          <option value={item}>{item}</option>
                        );
                })}
              </select>
            </div>
            {/*<div className={styles.detail}>
              Country: {country}
              <br/>
              <select value={this.state.country} onChange={(event) => {this.setState({country: event.target.value})}}>
                {_.map(['US', 'CA', 'JP', 'KR', 'MX', 'IN', 'GB', 'FR', 'DE', 'RU'],
                        (item, index) => {
                        return(
                          <option value={item}>{item}</option>
                        );
                })}
              </select>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(World);
