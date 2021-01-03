import './App.css';

import React, { Component } from 'react'
import ControlPanel from './components/ControlPanel'
import Mapper from './components/Mapper'
import ColorGradient from './components/ColorGradient'

// downloaded data from here:
// https://skgrange.github.io/data.html

class App extends Component {
  constructor(props){
    super(props);
    this.updateHoveredBorough = this.updateHoveredBorough.bind(this)
    this.updateSelectedBoroughs = this.updateSelectedBoroughs.bind(this)
    this.state = {
      hoveredBorough: "",
      selectedBoroughs: [],
      data: null,
      prices: null
    }
    console.log('App Constructed')
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/data/london_boroughs.json')
    .then( response => response.json() )
    .then( data => {
      console.log('Loaded boroughs!');
      var prices = data.features.map(f => parseFloat(f.properties.latest_average_price));
      this.setState({data: data, prices: prices})
    })
    .catch(error => console.error('Failed to load data:\n', error))
  }

  updateHoveredBorough = ( hoveredBorough ) => {
    this.setState({
      hoveredBorough: hoveredBorough
    })
  }

  updateSelectedBoroughs = ( clickedBorough ) => {
    var boroughs = this.state.selectedBoroughs;
    if( boroughs.includes(clickedBorough)){
      boroughs = boroughs.filter(item => item !== clickedBorough)
    } else {
      boroughs.push(clickedBorough)
    }
    this.setState({ selectedBoroughs: boroughs })
  }

 render(){
   if(this.state.data){
    var gradient = new ColorGradient(this.state.prices)
    var controlPanel =
      <ControlPanel
        hoveredBorough={this.state.hoveredBorough}
        selectedBoroughs={this.state.selectedBoroughs}
        gradient={gradient}
      />

   }
  return (
    <div>
      {controlPanel}
      <Mapper
        gradient={gradient}
        data={this.state.data}
        updateHoveredBorough={this.updateHoveredBorough}
        updateSelectedBoroughs={this.updateSelectedBoroughs}
      />

    </div>
   )
 }
}

export default App;
