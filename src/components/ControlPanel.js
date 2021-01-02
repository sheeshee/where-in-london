import './Control.css';
import { Component } from 'react';
import Plot from './Plot';

function cleanKey(boroughName){
    return boroughName.replace(' and ', ' & ')
}

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
        return(
            <div className="control-box">
                <Plot data={this.state.data} boroughKey={cleanKey(this.props.boroughName)}/>
                <div>
                    {this.props.boroughName ? this.props.boroughName : "Hover over a borough to display its graph." }
                </div>
            </div>
        )
    }
}

export default ControlPanel;
