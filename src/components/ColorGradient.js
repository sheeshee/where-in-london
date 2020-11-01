import Rainbow from 'rainbowvis.js'

const colorLow = "green"
const colorHigh = "red"

class ColorGradient {
    constructor(array){
        // get min and max of data
        this.maxValue = Math.max(...array);
        this.minValue = Math.min(...array);
        this.gradient = new Rainbow();
        this.gradient.setSpectrum(colorLow, colorHigh)
    }

    getRank = value => {
        // x100 because default range of Color Gradient is 100.
        let rank = (value - this.minValue)/(this.maxValue - this.minValue) * 100
        return rank
    }

    colorFromValue = value => {
        let rank = this.getRank(value)
        return this.colorFromRank(rank)
    }

    colorFromRank = rank => {
        return "#".concat(this.gradient.colorAt(rank))
    }

}

export default ColorGradient;
