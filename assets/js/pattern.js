class Pattern {
    tracks = [];

    constructor(bars = 4, pulses = 4) {
        this.bars = bars;
        this.pulses = pulses;
        this.initialize();
    }

    initialize() {
        this.tracks.push(new PatternTrack(1, './assets/audio/kick.wav', 'Kick'));
        this.tracks.push(new PatternTrack(2, './assets/audio/snare.wav', 'Snare'));
        this.tracks.push(new PatternTrack(3, './assets/audio/clap.wav', 'Clap'));
        this.tracks.push(new PatternTrack(4, './assets/audio/hat.wav', 'Hat'));
    }

    play() {

    }

    stop() {

    }

    set_bars(bars) { this.bars = bars; }
    set_pulses(pulses) { this.pulses = pulses; }

    add_track() {
        var track = new PatternTrack(this.get_last_track_id() + 1);
        this.tracks.push(track);
        return track;
    }

    remove_track(id) {
        var track_found = false;

        for (var i = 0; i < this.tracks.length; i++) {
            const track = this.tracks[i];
            if (track.id === id) {
                this.tracks.splice(i, 1);
                track_found = true;
            }
        }

        return track_found;
    }

    duplicate_track(id) {
        var track_found = false;

        for (var i = 0; i < this.tracks.length; i++) {
            const track = this.tracks[i];
            if (track.id === id) {
                track_found = true;
                this.tracks.push(track.duplicate(this.get_last_track_id() + 1));
            }
        }

        return track_found;
    }

    get_track(id) {
        for (var i = 0; i < this.tracks.length; i++) {
            const track = this.tracks[i];
            if (track.id === id) {
                return track;
            }
        }

        return false;
    }

    get_last_track_id() {
        var last_track = this.tracks[this.tracks.length - 1];

        if (last_track !== undefined) {
            return last_track.id;
        } else {
            return 0;
        }
    }
}