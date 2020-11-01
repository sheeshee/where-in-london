import './Control.css'
import { Component } from 'react'



class ColorBar extends Component {

    render(){
        const items = []
        for (var i = 0; i < 100; i++){
            items.push(<div className="colorbar-segment" style={{backgroundColor: this.props.gradient.colorFromRank(i)}}></div>)
        }
        return(
            <div className="colorbar-container">
                <div className="colorbar-labels">
                    <div className="minimum">{Math.round(this.props.gradient.minValue)}</div>
                    <div className="maximum">{Math.round(this.props.gradient.maxValue)}</div>
                    <div className="unit">hectares</div>
                </div>
                <div >
                    {items}
                </div>
            </div>
        )
    }
}

class ControlPanel extends Component {
    render(){
        return(
            <div className="control">
                {/* <button className="btn btn-primary">Show Map</button> */}
                <ColorBar gradient={this.props.gradient}/>
            </div>
        )
    }
}

export default ControlPanel;
