import './Control.css';
import { Component } from 'react';
import Plot from './Plot';


class InteractionPrompt extends Component {
    render(){
        var content;
        if(this.props.hoveredBorough && !this.props.selectedBoroughs.includes(this.props.hoveredBorough)){
            content = <div >Click now to add <span className="borough-add">{this.props.hoveredBorough}</span>.</div>
        } else if (this.props.hoveredBorough && this.props.selectedBoroughs.includes(this.props.hoveredBorough)){
            content = <div>Click now to remove <span
                    style={{backgroundColor: this.props.boroughColours[this.props.hoveredBorough]}}
                >{this.props.hoveredBorough}</span>.</div>
        } else if (this.props.selectedBoroughs.length > 0) {
            content = <div className="clear-borough-prompt" onClick={this.props.clearBoroughList}>Click here to clear the plot.</div>
        } else {
            content = <div>Click on a borough to add its plot.</div>
        }
        return(
            <div className="interaction-prompt">
                {content}
            </div>
        )
    }
}

class PlottedBoroughList extends Component {
    render(){
        var selectedBoroughs = this.props.selectedBoroughs.map(
            (borough, index) => {
                return (
                    <span
                        key={index}
                        style={{backgroundColor: this.props.boroughColours[borough]}}
                    >
                        {borough}
                    </span>
                )
            }
        )
        return (
            <div className="selected-boroughs-list">
                {selectedBoroughs}
            </div>
        )
    }
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
                <h1>Average House Sale Prices in London</h1>
                <div className="subtitle-container">
                    <h2><a href="https://data.london.gov.uk/dataset/uk-house-price-index">Data Source</a></h2>
                    <h2><a href="https://github.com/sheeshee/where-in-london">View on GitHub</a></h2>
                </div>
                <Plot
                    data={this.state.data}
                    hoveredBorough={this.props.hoveredBorough}
                    selectedBoroughs={this.props.selectedBoroughs}
                    boroughColours={this.props.boroughColours}
                />
                <PlottedBoroughList
                        selectedBoroughs={this.props.selectedBoroughs}
                        boroughColours={this.props.boroughColours}
                    />
                <InteractionPrompt
                    selectedBoroughs={this.props.selectedBoroughs}
                    hoveredBorough={this.props.hoveredBorough}
                    boroughColours={this.props.boroughColours}
                    clearBoroughList={this.props.clearBoroughList}
                />
            </div>
        )
    }
}

export default ControlPanel;
