import React, {Component} from 'react';
import { Grid, Input, Checkbox, Button, Dropdown } from 'semantic-ui-react';
import request from 'superagent';

const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const options = [
  {key:"conference room", text:"Conference Room", value:"conference room"},
  {key:"training room", text:"Training Room", value:"training room"},
  {key:"ODC", text:"ODC", value:"odc"}
];

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tower: "",
      floor: "",
      wing: "",
      room: "",
      type: "",
      lat:"",
      long:""
    };
    this.toast = this.toast.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentWillMount() {
    let context = this;
    // console.log("navigator: ", navigator);
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        context.setState({lat: latitude, long: longitude});
      });
    } else {
      console.log('not available');
    }
  }

  toast(message) {
    this.refs.asd.warning(
      message,
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  onConfirm() {
    let { tower, floor, wing, room, type, lat, long } = this.state;

    let location = {
      tower: type.toLowerCase(),
      floor: floor.toLowerCase(),
      wing: wing.toLowerCase(),
      room: room.toLowerCase(),
      lat: lat,
      long: long,
      type: type.toLowerCase()
    };
    request.post("/location").send({location:location}).end((err, res) => {
      if(res.text == "success") {
        this.setState({
          tower: "", floor: "", wing: "", room: "",
          lat:"", long:"", type: ""
        });
        this.toast(`${lat} : ${long}`);
      } else {
        console.log("error failed in db");
        this.toast('Location addition failed!');
      }
    });
  }

  render() {
    return(
      <Grid>
      <Grid.Row style={{marginTop:"20%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12} style={{textAlign:"center", fontWeight:"normal", textTransform:"capitalize", letterSpacing:"2px",fontFamily:"Open Sans"}} ><h1>Add Location</h1></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid placeholder='Tower*' required value={this.state.tower} onChange={(e) => this.setState({ tower: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid   placeholder='Floor*' required value={this.state.floor} onChange={(e) => this.setState({ floor: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid   placeholder='Wing*' required value={this.state.wing} onChange={(e) => this.setState({ wing: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid   placeholder='Room*' required value={this.state.room} onChange={(e) => this.setState({ room: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Dropdown fluid   placeholder='Type*' selection search options={options} required value={this.state.type} onChange={(e, selected) => this.setState({ type: selected.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>


      <Grid.Row style={{marginTop:"2%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}> <center><Button fluid style={{
          letterSpacing:"2px",
          fontWeight:"bold",
          textTransform:"uppercase",
          fontSize:"100%"
        }}
        onClick={this.onConfirm.bind(this)}>Confirm</Button></center></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row only='mobile'>
        <ToastContainer ref='asd'
            toastMessageFactory={ToastMessageFactory}
            className='toast-top-left' />
      </Grid.Row>
    </Grid>


    );
  }

}
module.exports = Admin;
