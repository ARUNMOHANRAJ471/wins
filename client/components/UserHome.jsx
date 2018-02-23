import React, {Component} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    console.log("cookies",cookies.get('type'));
      return (
        <p>dsgnbvdnfb</p>
        );
  }
}
module.exports = App;
