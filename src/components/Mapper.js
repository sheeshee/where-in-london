import { latLngBounds, latLng } from 'leaflet';
import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

const bounds = latLngBounds(
    latLng(50.0, -3), latLng(53.0, 3)
)

const idleOpacity = 0;
const hoverOpacity = 0.5;
const activeOpacity = 0.8;

class Mapper extends Component {
    constructor(props){
        super(props);
        this.geojsonRef = React.createRef();
        this.state = {
            lat: 51.505,
            lng: -0.1278,
            zoom: 9,
          }
    }

    style = feature => {
        var color = this.props.boroughColours[feature.properties.name];
        return {
            fillColor: color,
            weight: 2,
            opacity: 0.5,
            color: "black",
            // dashArray: "10",
            fillOpacity: this.props.selectedBoroughs.includes(feature.properties.name) ? activeOpacity : idleOpacity
        }
    }

    onEachFeature = (feature, layer) => {
        layer.on({
          mouseover: this.highlightFeature.bind(this),
          mouseout: this.resetHovered.bind(this),
          click: this.clickOnFeature.bind(this)
        });
    }

    highlightFeature = (e) => {
        var layer = e.target;
        this.props.updateHoveredBorough(layer.feature.properties.name)
        this.setHighlight(layer)
    }

    setHighlight = (layer) => {
        layer.setStyle({
            fillOpacity: this.props.selectedBoroughs.includes(layer.feature.properties.name) ? activeOpacity : hoverOpacity
        })
    }

    resetHovered = (e) => {
        this.props.updateHoveredBorough("")
    }

    clickOnFeature = (e) => {
        var layer = e.target;
        this.props.updateSelectedBoroughs(layer.feature.properties.name);
        this.setHighlight(layer) // added this line to keep layer from being un-highlighted on click
    }

    render(){
        const position =[this.state.lat, this.state.lng]
        return(
            <Map
                center={position}
                zoom={this.state.zoom}
                minZoom={9}
                maxBounds={bounds}
            >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { this.props.data ?
            <GeoJSON
                ref={this.geojsonRef}
                data={this.props.data}
                style={this.style}
                onEachFeature={this.onEachFeature.bind(this)}
            /> : null}
            </Map>
        )
    }
}

export default Mapper;
