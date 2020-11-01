import { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import Rainbow from 'rainbowvis.js'

// downloaded data from here:
// https://skgrange.github.io/data.html
import data from './data/london_boroughs.json'

const colorGradient = new Rainbow();
const colorLow = "green"
const colorHigh = "red"
colorGradient.setSpectrum(colorLow, colorHigh)

// get min and max of data
const areas = data.features.map(f => parseFloat(f.properties.area_hectares));
const maxArea = Math.max(...areas)
const minArea = Math.min(...areas)

class Mapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
          }
    }

    getRank = value => {
        // x100 because default range of Color Gradient is 100.
        let rank = (value - minArea)/(maxArea - minArea) * 100
        return rank
    }

    style = feature => {
        let rank = this.getRank(feature.properties.area_hectares);
        return {
            fillColor: "#".concat(colorGradient.colorAt(rank)),
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
            <Map center={position} zoom={this.state.zoom}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={data} style={this.style} />
            </Map>
        )
    }
}

export default Mapper;
