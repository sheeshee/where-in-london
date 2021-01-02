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
    this.updateBoroughName = this.updateBoroughName.bind(this)
    this.updateBoroughSize = this.updateBoroughSize.bind(this)
    this.state = {
      selectedBoroughName: "",
      selectedBoroughSize: 0,
      data: null,
      areas: null
    }
    console.log('App Constructed')
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/data/london_boroughs.json')
    .then( response => response.json() )
    .then( data => {
      console.log('Loaded boroughs!');
      var areas = data.features.map(f => parseFloat(f.properties.latest_average_price));
      this.setState({data: data, areas: areas})
    })
    .catch(error => console.error('Failed to load data:\n', error))
  }

  updateBoroughName = ( boroughName ) => {
    this.setState({
      selectedBoroughName: boroughName
    })
  }

  updateBoroughSize = ( boroughSize ) => {
    this.setState({
      selectedBoroughSize: boroughSize
    })
  }

 render(){
   if(this.state.data){
    var gradient = new ColorGradient(this.state.areas)
    var controlPanel =
      <ControlPanel
        boroughName={this.state.selectedBoroughName}
        boroughSize={this.state.selectedBoroughSize}
        gradient={gradient}
      />

   }
  return (
    <div>
      {controlPanel}
      <Mapper
        gradient={gradient}
        data={this.state.data}
        updateBoroughName={this.updateBoroughName}
        updateBoroughSize={this.updateBoroughSize}
      />

    </div>
   )
 }
}
export default App;
