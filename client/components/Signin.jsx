import React, {Component} from 'react';
import { Grid, Input, Checkbox, Button } from 'semantic-ui-react';
const {hashHistory, Route, Router} = require('react-router');

export default class Signin extends Component{
  constructor(){
    super();
    this.state = {
      name: "",
      password: ""
    };
  }

  signin() {
    let { name, password } = this.state;
    if(name === "admin" && password === "admin") {
      // this.props.onLoginSuccess(name);
      hashHistory.push('/adminHome');
    } else {
      $.ajax({
        url:"/login",
        type:'POST',
        data: {
          name: name,
          password: password
        },
        success: function(data)
        {
          if(data == 'success') {
            console.log('success');
            hashHistory.push('/userHome');
          } else if(data == 'failure') {
            console.log('failure');
          }
        }.bind(this),
        error: function(err)
        {
          console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
  }

  render(){
    return(
      <Grid className="signin">
        <Grid.Row style={{marginTop:"30%"}} only='mobile'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12} style={{textAlign:"center", fontWeight:"normal", textTransform:"capitalize", letterSpacing:"2px",fontFamily:"Open Sans"}} ><h1>WINS</h1></Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>

        <Grid.Row style={{marginTop:"10%"}} only='mobile'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Input fluid icon='user' iconPosition='left' placeholder='username'
              value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>

        <Grid.Row style={{marginTop:"5%"}} only='mobile'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Input fluid icon='lock' iconcolor="blue" iconPosition='left' type="password" placeholder='Password'
              value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>

        {/* <Grid.Row style={{marginTop:"-2%"}} only='mobile'>
          <Grid.Column width={7}></Grid.Column>
          <Grid.Column width={7}>  <Checkbox  label={<label style={{letterSpacing:"1px"}}>Remember me</label>} /></Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row> */}

        <Grid.Row style={{marginTop:"2%"}} only='mobile'>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column width={6}> <center>
            <Button fluid  style={{borderRadius:"5px", boxShadow: "5px 10px 18px #eee", letterSpacing:"2px", fontWeight:"bold", textTransform:"uppercase", fontSize:"100%"}}
              onClick={this.signin.bind(this)}>
              SIGN IN
            </Button>
          </center></Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid.Row>

      </Grid>

    );
  }
}
