import './App.css';

import React, { Component } from 'react'
import ControlPanel from './components/ControlPanel'
import Mapper from './components/Mapper'

class App extends Component {

 render(){
  return (
    <div>
    <Mapper />
    <ControlPanel />
    </div>
   )
 }
}
export default App;
