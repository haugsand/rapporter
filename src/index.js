import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { Provider } from 'react-redux'

import * as thunks from './state/thunks'
import store from './state/store'
import App from './components/App';


if (process.env.NODE_ENV === `development`) {
    require('./../public/index.css'); 
}


store.dispatch(thunks.fetchVegobjekttyper());
store.dispatch(thunks.fetchArea('region', 'regioner'));
store.dispatch(thunks.fetchArea('fylke', 'fylker'));
store.dispatch(thunks.fetchArea('kommune', 'kommuner'));


ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
            <Route path="/(:vegobjekttype)" component={App} />
            <Route path="/(:vegobjekttype)/(:column)" component={App} />
            <Route path="/(:vegobjekttype)/(:column)/(:row)" component={App} />
            <Route path="/(:vegobjekttype)/(:column)/(:row)/(:result)" component={App} />
        </Router>
    </Provider>
    ), document.getElementById('root')
);
