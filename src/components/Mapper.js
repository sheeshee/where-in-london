import { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class Mapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
          }
    }
    render(){
        const position =[this.state.lat, this.state.lng]
        return(
            <Map center={position} zoom={this.state.zoom}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </Map>
        )
    }
}

export default Mapper;
