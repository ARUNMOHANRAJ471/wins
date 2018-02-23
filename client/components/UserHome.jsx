import React, {Component} from 'react';
import { Dropdown, Input, Menu } from 'semantic-ui-react';
let typeOptions = [
  {key:"places",text:"places",value:"places"},
  {key:"persons",text:"persons",value:"persons"},
  {key:"SME",text:"SME",value:"SME"}
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      contentForDestination: [],
      typeOfDestination: "",
      destinationValue: "",
      latitude: "",
      longitude: ""
    };
    this.getDestinationCoordinates = this.getDestinationCoordinates.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        console.log("current location captured");
        this.setState({ latitude, longitude });
      });
    } else {
      console.log("not available");
    }
  }

  updateContent(e, a) {
    let res = a.value;
    let context = this;
    this.setState({ typeOfDestination: res });
    $.ajax({
      url:"/updateContent",
      type:'POST',
      data: { typeOfDestination: res },
      success: function(data) {
        console.log(data);
        context.setState({contentForDestination: data});
      }.bind(this),
      error: function(err) {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  getDestinationCoordinates() {
    let { typeOfDestination, destinationValue } = this.state;
    $.ajax({
      url: "/coordinates",
      type:'POST',
      data: {
        typeOfDestination: typeOfDestination,
        destinationValue: destinationValue
      },
      success: function(data) {
        console.log(data);
        // context.setState({contentForDestination: data});
      }.bind(this),
      error: function(err) {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  render() {
      return (
        <div>
          <div><Input value="Your Current Location" fluid disabled/></div>
          <Menu>
            <Dropdown onChange={this.updateContent} icon='world' pointing className='link item' options={typeOptions} />
            <Dropdown selection fluid placeholder='your Destination' pointing className='link item' options={this.state.contentForDestination} />
          </Menu>
        </div>
      );
  }
}
module.exports = App;
