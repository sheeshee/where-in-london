import './Plot.css';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Component } from 'react';


class Plot extends Component {

    render(){
        return (
            <div className="plot">
            { this.props.data ?
                <LineChart width={375} height={200} margin={{left: 25, right: 50}}
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
                        // domain={[50000, 1500000]}
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
