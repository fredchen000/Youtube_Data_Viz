import _ from 'lodash'

async function run(func, params) {

  let res = await fetch(`http://10.89.238.234:5001/api/v0.1/${func}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(
      params,
    ),
  });
  res = await res.json();
  if (typeof res === 'string' && (res.startsWith('{') || res.startsWith('['))) res = JSON.parse(res);
  if (res && res.error) {
    console.error(res.error);
    throw res.error;
  }

  return res;
}

export default run;
