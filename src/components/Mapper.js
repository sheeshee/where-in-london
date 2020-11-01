import { latLngBounds, latLng } from 'leaflet';
import { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

const bounds = latLngBounds(
    latLng(51.0, -1), latLng(52.0, 1)
)

class Mapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 10,
          }
    }

    style = feature => {
        var color = this.props.gradient.colorFromValue(feature.properties.area_hectares)
        return {
            fillColor: color,
            weight: 2,
            opacity: 0.5,
            color: "black",
            dashArray: "10",
            fillOpacity: 0.8
        }
    }

    render(){
        const position =[this.state.lat, this.state.lng]
        return(
            <Map
                center={position}
                zoom={this.state.zoom}
                minZoom={10}
                maxBounds={bounds}
            >
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={this.props.data} style={this.style} />
            </Map>
        )
    }
}

export default Mapper;
