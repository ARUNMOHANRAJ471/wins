import React, {Component} from 'react';
import {Menu, Image, Grid, Input, Checkbox, Button, Header } from 'semantic-ui-react';
const {hashHistory, Route, Router} = require('react-router');
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
            cookies.set('type', 'employee', { path: '/' });
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

setCookieforGuest(){
  cookies.set('type', 'guest', { path: '/' });
  hashHistory.push('/userHome');
}

  render(){
    return(
      <Grid className="signin">
        <Menu secondary fluid style={{textAlign:"center",height:"55px",fontFamily:"Open Sans", color:"white", backgroundColor:'lightblue'}}>

             <Menu.Item>
                <Image size='mini' rounded={true} src='/assets/images/wipro.jpg' />
             </Menu.Item>
             <Menu.Item>
               <Header as='h2' color='blue'>WINS</Header>
             </Menu.Item>
         </Menu>
        <Grid.Row only='mobile'>
          <Grid.Column width={16} style={{fontWeight:"normal", letterSpacing:"2px",fontFamily:"Open Sans"}} ><Header textAlign='center' as='h2'  color='blue'>Wipro Internal Navigation System</Header></Grid.Column>
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
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}> <center>
            <Button fluid  style={{boxShadow: "5px 10px 18px #eee", letterSpacing:"2px", fontWeight:"bold", textTransform:"uppercase", fontSize:"100%"}}
              onClick={this.signin.bind(this)}>
              SIGN IN
            </Button>
          </center></Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
        <Grid.Row only='mobile'>
          <Grid.Column width={16} textAlign="center">
            <a onClick={this.setCookieforGuest.bind(this)}  style={{color:'blue'}}><u>Login as Guest</u></a>

          </Grid.Column>
        </Grid.Row>

      </Grid>

    );
  }
}
