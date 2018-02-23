import React from 'react';
import {render} from 'react-dom';
const {browserHistory, hashHistory, Route, Router} = require('react-router');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/Signin.jsx';
import Headercomponent from './components/Header.jsx';
import AdminHome from './components/Admin.jsx';
import UserHome from './components/UserHome.jsx';
import GoogleMapNavigation from './components/googleMapNavigation.jsx';
import GoogleMapSME from './components/googleMapSME.jsx';
import './styles/index.css';

const mainComponent=React.createClass({
  render: function(){
      return(
        <div>
          <Headercomponent/>
          {this.props.children}
        </div>
      );
  }
});

render(
  <MuiThemeProvider>
  <Router history={hashHistory}>
      <div>
        <Route path= '/' component={App} />
          <Route component={mainComponent}>
            <Route path= '/userHome' component={UserHome}/>
            <Route path= '/adminHome' component={AdminHome}/>
            <Route path= '/SME' component={GoogleMapSME}/>
            <Route path= '/navigate' component={GoogleMapNavigation}/>
          </Route>
      </div>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
