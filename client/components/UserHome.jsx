import React, {Component} from 'react';
import { Dropdown, Input, Menu } from 'semantic-ui-react'
let typeOptions = [{key:"places",text:"places",value:"places"},
{key:"persons",text:"persons",value:"persons"},
{key:"SME",text:"SME",value:"SME"},]
class App extends Component {
  constructor() {
    super();
    this.state = {
      contentForDestination:[]
    };
    this.updateContent = this.updateContent.bind(this);
  }
  updateContent(e, a) {
    let res = a.value;
    let context = this;
    $.ajax({
      url:"/updateContent",
      type:'POST',
      data: {
        typeOfDestination: res
      },
      success: function(data)
      {
        console.log(data);
        context.setState({contentForDestination:data});
      }.bind(this),
      error: function(err)
      {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  componentWillMount() {
    let context = this;
    // console.log("navigator: ", navigator);
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        context.setState(currentLocation:{lat: latitude, long: longitude});
      });
    } else {
      console.log('not available');
    }
  }
  render() {
      return (
        <div>
          <div><Input value="Your Location" fluid disabled/></div>
          <Menu>
            <Dropdown onChange={this.updateContent} icon='world' pointing className='link item' options={typeOptions} /><Dropdown selection fluid placeholder='your Destination' pointing className='link item' options={this.state.contentForDestination} />
          </Menu>
        </div>
        );
  }
}
module.exports = App;
