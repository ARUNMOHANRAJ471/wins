import React, {Component} from 'react';
import { Marker } from "react-google-maps";
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'
const {hashHistory, Route, Router} = require('react-router');

export default class MarkerComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModel:false,
      profile:{
        name:"Santhosh J(Digital)",
        mailid:"santhosh.j09@wipro.com",
        mobilenumber:"9715205554",
        skills:["AWS, Nodejs"],
        location:{
          source:{ lat: 53.593745, lng: -113.528274 },
          destination:{ lat: 53.593591, lng: -113.528887 }
        }
      }
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.navigate = this.navigate.bind(this);

  }
  toggleModal(){
    let showModel = !this.state.showModel
    this.setState({
      showModel: showModel,
    })
  }
  navigate(){
    console.log('navi');
    let showModel = !this.state.showModel;
    let obj = this;
    this.setState({
      showModel: showModel
    });
    this.props.navigateTo(this.props.position,this.props.placeName)
  }
  render() {
      let modelopen = this.state.showModel;
      // let name = "Santhosh J(Digital)";
      // let mailid = "santhosh.j09@wipro.com";
      let profile = this.state.profile;
    return (
      <div>
        <Marker
          position={this.props.position}
          icon={this.props.icon}
          onDblClick={this.props.onDblClick}
          onClick={this.toggleModal}
          label={this.props.label}
        />
        <Modal open={modelopen} closeIcon size={'mini'} style={{height:'fit-content',width:'80%'}}>

          {/* <Header icon='archive' content='Archive Old Messages' /> */}
          <Modal.Content>
              {/* <Icon name='close' size={'large'} onClick={this.toggleModal} style={{textAlign:'right'}}/> */}
            <p>{profile.name}</p>
            <p>{profile.mailid}</p>
            <p>{profile.mobilenumber}</p>
            <p>{profile.skills}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.toggleModal} >
              <Icon name='chevron left' /> Back
            </Button>
            <Button color='green' onClick={this.navigate} >
              <Icon name='chevron right' /> Go
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
