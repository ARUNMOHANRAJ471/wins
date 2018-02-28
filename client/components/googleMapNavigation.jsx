import React, {Component} from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, BicyclingLayer,Polyline } from "react-google-maps";
import MarkerComponent from './markerComponent.jsx';
import ReactDirectionRender from './reactDirectionRender.jsx';
// import ReactDirectionSample from './reactDirectionSample.jsx';

const locationDetails = {
  source:{},
  destination:{}
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom}
    defaultCenter={props.currentLocation}
  >
    {/* <MarkerComponent position={{ lat: 53.593745, lng: -113.528274 }} /> */}
     <ReactDirectionRender source={props.currentLocation} destination={props.destination} placeName={props.placeName}/>
  </GoogleMap>
))

export default class googleMapNavigation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {lat: 53.593745, lng: -113.528274 },
      destination:{lat: 53.593591, lng: -113.528887}
    }
  }
  componentWillMount(){
    let obj = this;
    this.setState({
      currentLocation:obj.props.source,
      destination:obj.props.destination,
      placeName:this.props.placeName
    })
  }
  render() {
    // console.log('props.location: source', this.props.source);
    // console.log('props.location:destination ', this.props.destination);
    let currentLocation = this.props.source;
    let destination = this.props.destination;
    let placeName = this.props.placeName;
    return (
      <Grid>
      <Grid.Row only='mobile'>
          <Grid.Column width={16} >
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWYd6MmYQML0hfPti_I1H3yP_NY_HvDQE&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `550px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              destination = {this.props.destination}
              currentLocation={this.props.source}
              placeName = {this.props.placeName}
              zoom={10}
            />
          </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{}} only='mobile'>
        <Grid.Column width={2}></Grid.Column>
        {/* <Grid.Column width={12} style={{textAlign:"center", fontWeight:"normal", letterSpacing:"1px",fontFamily:"Open Sans"}} >
        <h1 style={{letterSpacing:"2px"}}>Google Map </h1>

        </Grid.Column> */}
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}
