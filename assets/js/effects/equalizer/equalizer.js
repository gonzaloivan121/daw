class Equalizer {
    bands = [];

    constructor() {

    }

    initialize() {
        context.createBiquadFilter();
    }

    add_band(freq) {
        this.bands.push(new Band(freq, 0, 1));
    }
}