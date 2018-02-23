import React from 'react';
import {render} from 'react-dom';
const {browserHistory, hashHistory, Route, Router} = require('react-router');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/Signin.jsx';
import AdminHome from './components/Admin.jsx';
import UserHome from './components/UserHome.jsx';
import './styles/index.css';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
  <Router history={hashHistory}>
      <div>
          <Route path= '/' component={App}/>
          <Route path= '/userHome' component={UserHome}/>
          <Route path= '/adminHome' component={AdminHome}/>
      </div>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
