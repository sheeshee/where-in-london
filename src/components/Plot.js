import './Plot.css';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Component } from 'react';

function asPoundSterling(value){
    var groups = [...value.toString()].reverse().join("").match(/.{1,3}/g);
    var label = [...groups.join(',')].reverse().join("")
    return '£' + label
}


function cleanKey(name){
    return name.replace(' and ', ' & ')
}

class Plot extends Component {

    getHoveredBorough(){
        if(this.props.hoveredBorough){
            return cleanKey(this.props.hoveredBorough)
        } else {
            return null
        }
    }

    render(){
        var boroughLines = this.props.selectedBoroughs.map(
            (borough, index) => {
                return (
                    <Line
                        key={index}
                        dataKey={cleanKey(borough)}
                        dot={false}
                        stroke={this.props.boroughColours[cleanKey(borough)]}
                        isAnimationActive={false}
                    />
                )
            }
        )
        var hoverLine;
        if(!this.props.selectedBoroughs.includes(this.getHoveredBorough)){
            hoverLine = <Line
                key='hover'
                dataKey={this.getHoveredBorough()}
                dot={false}
                stroke={'lightgrey'}
                isAnimationActive={false}
            />
        }
        return (
            <div className="plot">
            { this.props.data ?
                <LineChart width={400} height={200} //margin={{left: 40, right: 50, top: 25}}
                    data={this.props.data} >
                    {hoverLine}
                    {boroughLines}
                    <CartesianGrid />
                    <XAxis
                        dataKey="date"
                    />
                    <YAxis
                        type="number"
                        tickFormatter={asPoundSterling}
                    />
                </LineChart>
            :
                <div>Loading...</div>
            }
            </div>
        )
    }
}

export default Plot;
