import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import run from '../../helpers/api.js';
import styles from './styles.scss';
import Info from './Info.js'
import News from './News.js'
import _ from 'lodash';
import Chart from "react-apexcharts";


import './styles.scss';


class Detail extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      predict: {},
      series: [],
      error: "",
      options: {
        chart: {
          type: 'candlestick',
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            speed: 1000,
          }
        },
        title: {
          text: 'Recent Prices',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          },
          forceNiceScale: true,
        }
      },
    };
  }

  componentWillReceiveProps(props) {
  }

  async componentDidMount(){

    const param = {
      "symbol": this.props.match.params.id,
    };

    const result = await run('get_stock_price', param);
    if (result.warn) {
      this.setState({
        error: "Not Supported Yet",
      });
    }
    else {
      let stock_series = []
      _.each(result,(item, index)=>{
        stock_series.push({
          x: new Date(parseInt(index)),
          y: [item["Open"].toFixed(2), item["High"].toFixed(2), item["Low"].toFixed(2), item["Close"].toFixed(2)]
        })
      });
      var stock_data = [{data:stock_series}];
      this.setState({
        series: stock_data,
      });
      const predict = await run('predict', param);
      console.log(predict);
      this.setState({
        predict: predict,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, series, options, predict } = this.state;
    if(error === "Not Supported Yet"){
      return(
        <div className={styles.body}>
          <div className={styles.infoPlain}>
            <div className={styles.stripName}>
              Stock prediction for {this.props.match.params.id} is not supported yet
            </div>
            <div className={styles.error}>
              Please contact lchenbm@connect.ust.hk to train model for this symbol
            </div>
          </div>
        </div>
      )
    }
    else{
      console.log(predict.LGR);
      return (
        <div className={styles.body}>
          <div className={styles.infoPlain}>
            <div className={styles.stripName}>
              Stock Prediction for {this.props.match.params.id}
            </div>
            <div className={styles.chart}>
              <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="candlestick"
                  width="100%"
                  height="100%"
              />
            </div>
            <div className={styles.stripName}>
              Predict Trend
            </div>
            <div className={styles.classifier}>
              <div className={styles.cell}>
                <div>Logistic Regression</div>
                <div>Trend Prediction</div>
              </div>
              <div className={styles.cell}>
                <div>1 Day</div>
                {predict.LGR && predict.LGR[0] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>7 Day</div>
                {predict.LGR && predict.LGR[1] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>30 Day</div>
                {predict.LGR && predict.LGR[2] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
            </div>
            {/*   Decision Tree   */}
            <div className={styles.classifier}>
              <div className={styles.cell}>
                <div>Decision Tree</div>
                <div>Trend Prediction</div>
              </div>
              <div className={styles.cell}>
                <div>1 Day</div>
                {predict.DT && predict.DT[0] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>7 Day</div>
                {predict.DT && predict.DT[1] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>30 Day</div>
                {predict.DT && predict.DT[2] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
            </div>
            {/*   Random Forest   */}
            <div className={styles.classifier}>
              <div className={styles.cell}>
                <div>Random Forest</div>
                <div>Trend Prediction</div>
              </div>
              <div className={styles.cell}>
                <div>1 Day</div>
                {predict.RF && predict.RF[0] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>7 Day</div>
                {predict.RF && predict.RF[1] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>30 Day</div>
                {predict.RF && predict.RF[2] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
            </div>
            {/*   XGB   */}
            <div className={styles.classifier}>
              <div className={styles.cell}>
                <div>XGBoost</div>
                <div>Trend Prediction</div>
              </div>
              <div className={styles.cell}>
                <div>1 Day</div>
                {predict.XGB && predict.XGB[0] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>7 Day</div>
                {predict.XGB && predict.XGB[1] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
              <div className={styles.cell}>
                <div>30 Day</div>
                {predict.XGB && predict.XGB[2] > 0
                  ? <div className={styles.iconRed}>&#xe65f;</div>
                  : <div className={styles.iconGreen}>&#xe65d;</div>
                }
              </div>
            </div>

            <div className={styles.news}>
              <div className={styles.stripName}>
                Today's Top5 News <span className={styles.iconRed}>&#xe648;Bullish</span><span className={styles.iconGreen}>&#xe648;Bearish</span>
              </div>
              {_.map(predict.news, (item, index) => {
                return(
                  <News
                    key={index}
                    source={item.news_from}
                    title={item.news_title}
                    description={item.news_text}
                    url={item.news_link}
                    sent={predict.desc_sent[index]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Detail);
