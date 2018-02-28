import React, {Component} from 'react';
import { DirectionsRenderer } from "react-google-maps";
const { compose, withProps, lifecycle } = require("recompose");

let direction = {
  origin: {  lat: 45.85703, lng: -87.65126 },
  destination:{ lat:41.8525800, lng: -87.6514100},
  travelMode:"WALKING"
}
const MapWithADirectionsRenderer = compose(
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng( direction.origin.lat, direction.origin.lng),
        destination: new google.maps.LatLng( direction.destination.lat, direction.destination.lng),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <div>  {props.directions && <DirectionsRenderer directions={props.directions} />}</div>
);

export default class ReactDirectionRender extends Component {
  componentWillMount(){
    // console.log("DirectionsRenderer calling");
        direction = {
          origin: this.props.source,
          destination:this.props.destination,
          travelMode:"WALKING"
        }
        console.log(direction);
        // console.log(this.props.source);

  }
  render() {
    return (
        <MapWithADirectionsRenderer  />
    );
  }
}
