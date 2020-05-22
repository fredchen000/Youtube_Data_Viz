
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { plugControl } from './action.js';
import { withRouter } from 'react-router-dom';
import data from './month_cat_country.json';
import geo_json from './custom.geo.json';
import target from './target.geo.json';
import { select, geoPath, geoMercator, min, max, scaleLinear, scaleLog, transition, easeLinear } from "d3";
import d3Tip from "d3-tip";


class Parallel extends React.Component {
  static defaultProps = {
    month: "01",
    category: "Autos & Vehicles",
    property: "likes",
    color: "red",
  }
  static propTypes = {
    month: PropTypes.string,
    category: PropTypes.string,
    property: PropTypes.string,
    color: PropTypes.string,
    country: PropTypes.string,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
    this.wrapRef = React.createRef();
    this.svgRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState){
    const {month, category, property, color, country } = nextProps;
    const svg = select(this.svgRef.current);

    const target_data = {};
    _.each( data, (item, key) => {
      const k = key.replace(/'+/g,'').replace("(", '').replace(")", '').split(',').map(function(item) {
        return item.trim();
      });
      if(k[0] === month && k[1] === category){
        target_data[k[2]] = item;
      }
    });
    const empty_object = {
      comment_count: 0,
      dislikes: 0,
      likes: 0,
      views: 0,
    };

    _.each( geo_json.features, (item, key) => {
      if(item.properties.iso_a2 in target_data){
        item.properties = {...item.properties, ...target_data[item.properties.iso_a2]};
      }
      else{
        item.properties = {...item.properties, ...empty_object};
      }
    });

    const empty_data = _.cloneDeep(geo_json);
    _.each( empty_data.features, (item, key) => {
      item.properties = {...item.properties, ...empty_object};
    });


    const { width, height } = this.wrapRef.current.getBoundingClientRect();

    const minProp = min(geo_json.features, feature => feature.properties[property]);
    const maxProp = max(geo_json.features, feature => feature.properties[property]);

    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", color]);

    const projection = geoMercator()
      .fitSize([width, height], geo_json)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    const t = transition()
      .duration(1000)
      .ease(easeLinear);

    const tooltip = d3Tip()
      .style('border', 'solid 1px black')
      .style('background-color', 'white')
      .style('border-radius', '10px')
      .style('padding', '3px 4px')
      .style('font-size', '14px')
      .html(d => `
        <div>
          ${d.properties["admin"]}<br/>
          Views: ${d.properties["views"]}<br/>
          Likes: ${d.properties["likes"]} <br/>
          Dislikes: ${d.properties["dislikes"]} <br/>
          Comment Count: ${d.properties["comment_count"]} <br/>
        </div>`
      );
    svg.call(tooltip);

    svg.selectAll(".country")
      .data(empty_data.features)
      .join("path")
      .attr("class", "country")
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", d => pathGenerator(d));

    const dots = svg.selectAll(".country")
      .data(geo_json.features)
      .join("path")
      .attr("class", "country")

    dots.transition(t)
    .attr("fill", feature => colorScale(feature.properties[property]))
    .attr("d", d => pathGenerator(d))

    dots.on('mouseover', tooltip.show).on('mouseout', tooltip.hide)
    return true;
  }


  componentWillReceiveProps(props) {
  }


  componentDidMount(){
    const {month, category, property, color, country } = this.props;
    const svg = select(this.svgRef.current);

    const target_data = {};
    _.each( data, (item, key) => {
      const k = key.replace(/'+/g,'').replace("(", '').replace(")", '').split(',').map(function(item) {
        return item.trim();
      });
      if(k[0] === month && k[1] === category){
        target_data[k[2]] = item;
      }
    });
    const empty_object = {
      comment_count: 0,
      dislikes: 0,
      likes: 0,
      views: 0,
    };

    _.each( geo_json.features, (item, key) => {
      if(item.properties.iso_a2 in target_data){
        item.properties = {...item.properties, ...target_data[item.properties.iso_a2]};
      }
      else{
        item.properties = {...item.properties, ...empty_object};
      }
    });

    const empty_data = _.cloneDeep(geo_json);
    _.each( empty_data.features, (item, key) => {
      item.properties = {...item.properties, ...empty_object};
    });


    const { width, height } = this.wrapRef.current.getBoundingClientRect();

    const minProp = min(geo_json.features, feature => feature.properties[property]);
    const maxProp = max(geo_json.features, feature => feature.properties[property]);

    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", color]);

    const projection = geoMercator()
      .fitSize([width, height], geo_json)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    const t = transition()
      .duration(1000)
      .ease(easeLinear);

    const tooltip = d3Tip()
      .style('border', 'solid 1px black')
      .style('background-color', 'white')
      .style('border-radius', '10px')
      .style('padding', '3px 4px')
      .style('font-size', '14px')
      .html(d => `
        <div>
          ${d.properties["admin"]}<br/>
          Views: ${d.properties["views"]}<br/>
          Likes: ${d.properties["likes"]} <br/>
          Dislikes: ${d.properties["dislikes"]} <br/>
          Comment Count: ${d.properties["comment_count"]} <br/>
        </div>`
      );
    svg.call(tooltip);

    svg.selectAll(".country")
      .data(empty_data.features)
      .join("path")
      .attr("class", "country")
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", d => pathGenerator(d));

    const dots = svg.selectAll(".country")
      .data(geo_json.features)
      .join("path")
      .attr("class", "country")

    dots.transition(t)
    .attr("fill", feature => colorScale(feature.properties[property]))
    .attr("d", d => pathGenerator(d))

    dots.on('mouseover', tooltip.show).on('mouseout', tooltip.hide)
  }

  componentWillUnmount() {
  }

  render() {
    return (
        <div ref={this.wrapRef} className={styles.d3Parallel}>
          <svg ref={this.svgRef} className={styles.svg}></svg>
        </div>
    );
  }
}

export default withRouter(Parallel);
