class BandType {
    static HighPass = 0;
    static LowShelf = 1;
    static Notch = 2;
    static Bell = 3;
    static HighShelf = 4;
    static LowPass = 5;
}

class Band {
    constructor(freq, vol, q, type = BandType.Bell) {
        this.frequency = freq;
        this.volume = vol;
        this.q = q;
        this.type = type;

        this.initialize();
    }

    initialize() {
        this.filter = AudioContext.createBiquadFilter();
        this.filter.frequency.value = this.frequency;
        this.filter.gain.value = this.volume;
        this.filter.Q.value = this.q;
    }

    set_volume(vol) { this.volume = vol }
    set_frequency(freq) { this.frequency = freq }
    set_q(q) { this.q = q }
    set_type(type) { this.type = type }
}