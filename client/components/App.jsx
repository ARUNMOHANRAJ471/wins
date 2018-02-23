import React, {Component} from 'react';
import Admin from './Admin.jsx';
import Signin from './Signin.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: null
    };
  }
  render() {
    let { login } = this.state;
    if(login) {
      if(login === "admin") {
        return <Admin />;
      } else {
        return (
          <div className='App'>
              Logged In
          </div>
        );
      }
    } else {
      return (
        <Signin onLoginSuccess={(username) => this.setState({ login: username })} />
      );
    }
  }
}
