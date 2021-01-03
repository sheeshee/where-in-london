import { latLngBounds, latLng } from 'leaflet';
import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

const bounds = latLngBounds(
    latLng(51.0, -1), latLng(52.0, 1)
)

class Mapper extends Component {
    constructor(props){
        super(props);
        this.geojsonRef = React.createRef();
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 10,
          }
    }

    style = feature => {
        var color = this.getColor(feature.properties.latest_average_price)
        return {
            fillColor: color,
            weight: 2,
            opacity: 0.5,
            color: "black",
            dashArray: "10",
            fillOpacity: 0.8
        }
    }

    getColor = value => {
        try {
            return this.props.gradient.colorFromValue(value)
        } catch (error) {
            console.error("Could not get a color value!\n", error)
            return 0;
        }
    }

    onEachFeature = (feature, layer) => {
        layer.on({
          mouseover: this.highlightFeature.bind(this),
          mouseout: this.resetHighlight.bind(this),
          click: this.clickOnFeature.bind(this)
        });
    }

    highlightFeature = (e) => {
        var layer = e.target;
        this.props.updateHoveredBorough(layer.feature.properties.name)
        layer.setStyle({
            fillOpacity: 1
        })
    }

    resetHighlight = (e) => {
        this.props.updateHoveredBorough("")
        this.geojsonRef.current.leafletElement.resetStyle(e.target)
    }

    clickOnFeature = (e) => {
        var layer = e.target;
        console.log("Clicked on " + layer.feature.properties.name)
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
