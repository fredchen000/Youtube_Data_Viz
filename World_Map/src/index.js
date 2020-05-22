import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import App from './containers/App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root app={<App />}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// sserviceWorker.unregister();
