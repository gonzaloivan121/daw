class Pattern {
    tracks = [];
    bpm = 120;
    is_playing = false;
    current_pulse = 0;

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
        this.tracks.push(new PatternTrack(5, './assets/audio/crash.wav', 'Crash'));
    }

    play() {
        if (!this.is_playing) {
            this.is_playing = true;
            var total_pulses = this.bars * this.pulses;
            var step_bpm = this.bpm * this.pulses / 4;
            var step_delay = Math.round((150 * 100) / step_bpm);
            var current_pulse = this.current_pulse;

            this.interval = setInterval(() => {
                if (current_pulse < total_pulses) {
                    current_pulse++;
                    this.current_pulse = current_pulse;
                } else {
                    current_pulse = 1;
                }

                this.tracks.forEach(track => {
                    var sample = $('.sample[data-track="' + track.id + '"][data-column="' + current_pulse + '"]');
                    if (sample.hasClass("active")) {
                        track.play();
                    }
                    sample.addClass("current-step");
                    setTimeout(() => {
                        sample.removeClass("current-step");
                    }, step_delay);
                });
            }, step_delay);
        }
        
    }

    stop() {
        if (this.is_playing) {
            this.is_playing = false;
            this.current_pulse = 0; 
            clearInterval(this.interval);
        }
    }

    pause() {
        if (this.is_playing) {
            this.is_playing = false;
            clearInterval(this.interval);
        }
    }

    fill_track_every(track_id, beats) {
        for (var column = 1; column <= (this.bars * this.pulses); column += beats) {
            var sample = $('.sample[data-track="' + track_id + '"][data-column="' + column + '"]');

            if (!sample.hasClass("active")) {
                sample.addClass("active");
            }
        }
    }

    clear_track(track_id) {
        for (var column = 1; column <= (this.bars * this.pulses); column++) {
            var sample = $('.sample[data-track="' + track_id + '"][data-column="' + column + '"]');

            if (sample.hasClass("active")) {
                sample.removeClass("active");
            }
        }
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