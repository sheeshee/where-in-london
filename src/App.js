import './App.css';

import React, { Component } from 'react'
import ControlPanel from './components/ControlPanel'
import Mapper from './components/Mapper'
import ColorGradient from './components/ColorGradient'

// downloaded data from here:
// https://skgrange.github.io/data.html
import data from './data/london_boroughs.json'

var areas = data.features.map(f => parseFloat(f.properties.area_hectares));



class App extends Component {
  constructor(props){
    super(props);
    this.updateBoroughName = this.updateBoroughName.bind(this)
    this.updateBoroughSize = this.updateBoroughSize.bind(this)
    this.state = {
      selectedBoroughName: "",
      selectedBoroughSize: 0,
    }
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
  var gradient = new ColorGradient(areas)
  return (
    <div>
    <Mapper
      gradient={gradient}
      data={data}
      updateBoroughName={this.updateBoroughName}
      updateBoroughSize={this.updateBoroughSize}
    />
    <ControlPanel
      boroughName={this.state.selectedBoroughName}
      boroughSize={this.state.selectedBoroughSize}
      gradient={gradient}
    />
    </div>
   )
 }
}
export default App;
