import _ from 'lodash';
import run from '../../helpers/api.js'

export async function plugControl(relayArray, plugID) {
  const relayJSON = {
    "relay": _.join(relayArray, ';'),
    "r_led": 0,
    "g_led": 0,
  };
  const param = {
    relayJSON: relayJSON,
    plugID: plugID
  }
  const res = await run('ctrl', param);

  return (res);

}
