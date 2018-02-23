import React, {Component} from 'react';
import { Grid, Input, Checkbox, Button, Dropdown } from 'semantic-ui-react';
import request from 'superagent';

const options=[{key:"conference room",text:"conference room",value:"conference room"},
            {key:"training room",text:"training room",value:"training room"},
            {key:"ODC",text:"ODC",value:"ODC"}
           ]
class Admin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tower: "",
      floor: "",
      wing: "",
      room: "",
      cubicle: "",
      type: "",
      lat:"",
      long:""
    };
  }
  componentWillMount(){
      let context = this;
      console.log("navigator: ", navigator);
      if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let { latitude, longitude } = position.coords;
          console.log('latitude: ', latitude);
          console.log('longitude: ', longitude);
          context.setState({lat: latitude,long: longitude})
        });
      } else {
        console.log('not available');
      }
    }



  onConfirm() {
    let { tower, floor, wing, room, cubicle, type, lat, long } = this.state;

    let location = {
      tower: type.toLowerCase(),
      floor: floor.toLowerCase(),
      wing: wing.toLowerCase(),
      room: room.toLowerCase(),
      cubicle: cubicle.toLowerCase(),
      lat: lat,
      long:long,
      type: type.toLowerCase()
    };
    request.post("/location").send({location:location}).end((err, res)=>{
    if(res.text=="success"){
      console.log("successfull");
      this.setState({
            tower: "",
            floor: "",
            wing: "",
            room: "",
            cubicle: "",
            lat:"",
            long:"",
            type: ""});
          }
      else{
        console.log("error failed in db");
      }
    })
    console.log(location);
    }


  render() {
      console.log("state variables", this.state);
    return(

      <Grid>

      <Grid.Row style={{marginTop:"20%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12} style={{textAlign:"center", fontWeight:"normal", textTransform:"capitalize", letterSpacing:"2px",fontFamily:"Open Sans"}} ><h1>Add the Location</h1></Grid.Column>
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
        <Grid.Column width={12}><Input fluid   placeholder='wing*' required value={this.state.wing} onChange={(e) => this.setState({ wing: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid   placeholder='Room*' required value={this.state.room} onChange={(e) => this.setState({ room: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

      <Grid.Row style={{marginTop:"0%"}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}><Input fluid   placeholder='Cubicle*' required value={this.state.cubicle} onChange={(e) => this.setState({ cubicle: e.target.value })}/></Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>

            <Grid.Row style={{marginTop:"0%"}} only='mobile'>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}><Dropdown fluid   placeholder='Type*' selection search options={options} required value={this.state.type} onChange={(e, selected) => this.setState({ type: selected.value })}/></Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>


            <Grid.Row style={{marginTop:"2%"}} only='mobile'>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={6}> <center><Button fluid style={{borderRadius:"25px", letterSpacing:"2px", fontWeight:"bold", textTransform:"uppercase", fontSize:"100%"}} onClick={this.onConfirm.bind(this)}>Confirm</Button></center></Grid.Column>
              <Grid.Column width={5}></Grid.Column>
            </Grid.Row>

    </Grid>


    );
  }

}
module.exports = Admin;
