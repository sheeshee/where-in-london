import './Plot.css';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Component } from 'react';

function asPoundSterling(value){
    var groups = [...value.toString()].reverse().join("").match(/.{1,3}/g);
    var label = [...groups.join(',')].reverse().join("")
    return '£' + label
}
class Plot extends Component {

    render(){
        return (
            <div className="plot">
            { this.props.data ?
                <LineChart width={375} height={200} margin={{left: 40, right: 50, top: 25}}
                    data={this.props.data} >
                    <Line dataKey={this.props.boroughKey} dot={false} />
                    <CartesianGrid />
                    <XAxis
                        dataKey="date"
                        // interval="preserveStartEnd"
                        // tickCount={12}
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
