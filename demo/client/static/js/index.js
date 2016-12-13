import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';

import Homepage from './homepage';
import Form from './form';


render (
    <div>
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="homepage" component={Homepage} />
                <Route path="form" component={Form} />
            </Route>
        </Router>
    </div>,
    
    document.getElementById('main-container')
)