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

 render(){
  var gradient = new ColorGradient(areas)
  return (
    <div>
    <Mapper gradient={gradient} data={data} />
    <ControlPanel gradient={gradient} />
    </div>
   )
 }
}
export default App;
