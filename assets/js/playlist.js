class Playlist {
    tracks = [];
    bpm = 120;
    pulses = 4;
    bars = 4;
    time = 0;

    constructor(bpm = 120, pulses = 4, bars = 4) {
        this.bpm = bpm;
        this.pulses = pulses;
        this.bars = bars;
    }

    start() {
        this.time = 0;
    }

    play() {

    }

    pause() {

    }

    stop() {

    }

    end() {

    }

    add_track() {
        this.tracks.push(new Track(this.get_last_track_id() + 1));
        return this.tracks;
    }

    remove_track(id) {
        var track_found = false;

        for (var i = 0; i < this.tracks.length; i++) {
            const track = this.tracks[i];
            if (track.id === id) {
                track_found = true;
                this.tracks.splice(i, 1);
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

    get_last_track_id() {
        var last_track = this.tracks[this.tracks.length - 1];

        if (last_track !== undefined) {
            return last_track.id;
        } else {
            return 0;
        }
    }
}