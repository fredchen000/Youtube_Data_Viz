import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import run from '../../helpers/api.js'
import styles from './styles.scss';
import { plugControl } from './action.js';
import { withRouter } from 'react-router-dom';


class Card extends React.Component {

  static propTypes = {
    plugID: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      count: [],
      cpwr: [],
      cur: [],
      pfactor: [],
      relay: [],
      tmp: [],
      tpwr: [],
      vol: 0,
      timestamp: 0,
      dayRecord: {},
    };
  }

  componentWillReceiveProps(props) {
  }

  async componentDidMount(){

    const param = {
      "plug": this.props.plugID,
    };

    const result = await run('get_data', param);
    console.log('result', result);

    const countT = result.COUNT.split(';') || [];
    const cpwrT = result.CPWR.split(';') || [];
    const curT = result.CUR.split(';') || [];

    const pfactorT = result.PFACTOR.split(';');
    const relayT = result.RELAY.split(';');

    const tmpT = result.TMP.split(';');
    const tpwrT = result.TPWR.split(';');

    const volT = result.VOL || 0;
    const timestampT = result.timestamp || 0;
    const dayRecordT = result.dayRecord || {};

    this.setState({
      count: countT,
      cpwr: cpwrT,
      cur: curT,
      pfactor: pfactorT,
      relay: relayT,
      tmp: tmpT,
      tpwr: tpwrT,
      vol: volT,
      timestamp: timestampT,
      dayRecord: dayRecordT,
    });
    this.interval = setInterval(async () => {
      const result = await run('get_data', param);
      console.log('result', result);

      const countT = result.COUNT.split(';') || [];
      const cpwrT = result.CPWR.split(';') || [];
      const curT = result.CUR.split(';') || [];

      const pfactorT = result.PFACTOR.split(';');
      const relayT = result.RELAY.split(';');

      const tmpT = result.TMP.split(';');
      const tpwrT = result.TPWR.split(';');

      const volT = result.VOL || 0;
      const timestampT = result.timestamp || 0;
      const dayRecordT = result.dayRecord || {};

      this.setState({
        count: countT,
        cpwr: cpwrT,
        cur: curT,
        pfactor: pfactorT,
        relay: relayT,
        tmp: tmpT,
        tpwr: tpwrT,
        vol: volT,
        timestamp: timestampT,
        dayRecord: dayRecordT,
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { cpwr, relay, tmp } = this.state;
    return (
        <div className={`${styles.plugInfo} ${styles.fine}`}>
          <div
            className={styles.menu}
            onClick={()=>{
              console.log('click');
              this.props.history.push("/detail/"+this.props.plugID);
            }}
          >&#xe6c0;</div>
          <p className={styles.title}>排插  {this.props.plugID}<span className={`${styles.dot} ${styles.fineDot}`} /></p>
          <div className={styles.plugPlain}>
            {
              _.map([0,1,2,3], (i) => {
                return (
                  <div className={styles.plug} key={i}>
                    <div>{`插頭${i+1}`}</div>
                    <div>{cpwr[i]}瓦</div>
                    <div
                      className={`${styles.icon} ${this.state.relay[i] === "1" ? styles.iconOn : styles.iconOff}`}
                      onClick={async ()=>{
                        let relayJson = relay;
                        relayJson[i] = relayJson[i] === '1' ? '0' : '1';
                        const result = await plugControl(relayJson, this.props.plugID);
                        if(result.success){
                          this.setState({
                            relay: relayJson,
                          });
                        }

                      }}
                    >
                      &#xe623;
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className={styles.mainInfo}>
            <p>總功率: {_.sumBy(cpwr, o => {return parseFloat(o)}).toFixed(2)}瓦</p>
            <p>排插溫度: {parseFloat(_.maxBy(tmp, o => {return parseFloat(o)})).toFixed(2)}˚C</p>
            <p>電壓: {this.state.vol} V</p>
          </div>
        </div>
    );
  }
}

export default withRouter(Card);
