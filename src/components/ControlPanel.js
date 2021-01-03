import './Control.css';
import { Component } from 'react';
import Plot from './Plot';


class ControlPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount(){
        fetch(process.env.PUBLIC_URL + '/data/average-house-prices.json')
            .then( response => response.json() )
            .then( data => {
                this.setState({data: data});
                console.log("Loaded price data!");
            })
            .catch( error => console.error('Could not load data:\n', error))
    }

    render(){
        var selectedBoroughs = this.props.selectedBoroughs.map(
            (borough, index) => {
                return (<span key={index}>{borough}</span>)
            }
        )
        return(
            <div className="control-box">
                <Plot
                    data={this.state.data}
                    hoveredBorough={this.props.hoveredBorough}
                    selectedBoroughs={this.props.selectedBoroughs}
                />
                <div className="selected-boroughs-list">
                    <div className="hovered-borough">
                        {this.props.hoveredBorough ? "Hovered: " + this.props.hoveredBorough : "Hover over a borough to display its graph." }
                    </div>
                    {selectedBoroughs}
                </div>
            </div>
        )
    }
}

export default ControlPanel;
