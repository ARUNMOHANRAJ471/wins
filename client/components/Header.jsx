import React, {Component} from 'react';
import { Menu, Header, Image, Icon} from 'semantic-ui-react';
const {hashHistory, Route, Router} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const menuStyle={
  color:'#ffffff'
}

export default class headercomponent extends Component{
  constructor(){
    super();
  }
  handleLogout(event) {
   event.preventDefault();
   cookies.remove("type");
   hashHistory.push("/");
   location.reload();
}


  render(){
    return(
      <Menu secondary fluid style={{textAlign:"center",height:"55px",fontFamily:"Open Sans", color:"white", backgroundColor:'lightblue'}}>

           <Menu.Item>
              <Image size='mini' rounded={true} src='/assets/images/wipro.jpg' />
           </Menu.Item>
           <Menu.Item>
             <Header as='h2' color='blue'>WINS</Header>
           </Menu.Item>
           <Menu.Menu position='right'>
             <Menu.Item name='profile' style={menuStyle} >
                  <Icon name='user' size="large"/>
             </Menu.Item>
             <Menu.Item name='logout' style={menuStyle} onClick={this.handleLogout.bind(this)} >
                  <Icon name='sign out' size="large"/>
             </Menu.Item>
           </Menu.Menu>
       </Menu>
    );
  }
}
