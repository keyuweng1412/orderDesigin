import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import store from './store/index'
import OrderM from './components/OrderM';

const App = (
    <Provider store={store}>
        <OrderM />
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'));

