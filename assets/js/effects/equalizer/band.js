class BandType {
    static HighPass = {
        name: 'highpass',
        min_frequency: 0,
        max_frequency: 125,
        default_frequency: 50,
        default_gain: 0,
        default_q: 1
    };
    static LowShelf = {
        name: 'lowshelf',
        min_frequency: 0,
        max_frequency: null,
        default_frequency: 200,
        default_gain: 0,
        default_q: 1
    };
    static Notch = {
        name: 'notch',
        min_frequency: 0,
        max_frequency: null,
        default_frequency: 500,
        default_gain: 0,
        default_q: 5
    };
    static Bell = {
        name: 'peaking',
        min_frequency: 0,
        max_frequency: null,
        default_frequency: 4000,
        default_gain: 0,
        default_q: 1
    };
    static HighShelf = {
        name: 'highshelf',
        min_frequency: 0,
        max_frequency: 125,
        default_frequency: 50,
        default_gain: 0,
        default_q: 1
    };
    static LowPass = {
        name: 'lowpass',
        min_frequency: 0,
        max_frequency: 125,
        default_frequency: 50,
        default_gain: 0,
        default_q: 1
    };
}

class Band {
    constructor(
        type = BandType.Bell,
        frequency = BandType.Bell.default_frequency,
        gain = BandType.Bell.default_gain,
        q = BandType.Bell.default_q
    ) {
        this.type = type;
        this.frequency = frequency;
        this.gain = gain;
        this.q = q;

        console.log(this.type)

        this.initialize();
    }

    initialize() {
        this.filter = audioCtx.createBiquadFilter();
        this.filter.type = this.type.name;
        this.filter.frequency.value = this.frequency;
        this.filter.gain.value = this.gain;
        this.filter.Q.value = this.q;
    }

    set_type(type) {
        this.type = type;
    }

    set_gain(gain) {
        this.gain = gain;
    }

    set_frequency(frequency) {
        if (frequency >= this.type.min_frequency && frequency < this.type.max_frequency) {
            this.frequency = frequency;
            this.filter.frequency.value = this.frequency;
        }
    }

    set_q(q) {
        this.q = q;
    }
}