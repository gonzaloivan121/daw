class Pattern {
    tracks = [];
    bpm = 120;
    is_playing = false;
    current_pulse = 0;
    saved_pattern = [];

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
        this.tracks.push(new PatternTrack(5, './assets/audio/open-hat.wav', 'Open Hat'));
        this.tracks.push(new PatternTrack(6, './assets/audio/crash.wav', 'Crash'));

        for (var i = 1; i <= this.tracks.length; i++) {
            this.saved_pattern[i] = [];
            for (var j = 1; j <= (this.bars * this.pulses); j++) {
                this.saved_pattern[i][j] = false;
            }
        }
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
                this.save(track_id, column, true);
            }
        }
    }

    clear_track(track_id) {
        for (var column = 1; column <= (this.bars * this.pulses); column++) {
            var sample = $('.sample[data-track="' + track_id + '"][data-column="' + column + '"]');

            if (sample.hasClass("active")) {
                sample.removeClass("active");
                this.save(track_id, column, false);
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
                delete this.saved_pattern[track.id];
            }
        }

        return track_found;
    }

    duplicate_track(id) {
        var duplicated_track = false;

        for (var i = 0; i < this.tracks.length; i++) {
            const track = this.tracks[i];
            if (track.id === id) {
                duplicated_track = track.duplicate(this.get_last_track_id() + 1);
                this.tracks.push(duplicated_track);
                this.saved_pattern[duplicated_track.id] = this.saved_pattern[track.id];
            }
        }

        return duplicated_track;
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

    save(track_id, beat, active) {
        this.saved_pattern[track_id][beat] = active;
    }

    export(name) {
        var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this));
        var download_anchor_node = document.createElement("a");
        download_anchor_node.setAttribute("href", data);
        download_anchor_node.setAttribute("download", name + ".save");
        document.body.appendChild(download_anchor_node);
        download_anchor_node.click();
        download_anchor_node.remove();
    }

    load(import_obj) {
        this.tracks = [];
        this.saved_pattern = [];

        this.bpm = import_obj.bpm;
        this.bars = import_obj.bars;
        this.pulses = import_obj.pulses;
        this.current_pulse = 0;

        for (var i = 0; i < import_obj.tracks.length; i++) {
            this.tracks[i] = new PatternTrack(import_obj.tracks[i].id, null, null, import_obj.tracks[i]);
        }

        for (var i = 0; i < import_obj.saved_pattern.length; i++) {
            if (import_obj.saved_pattern[i] !== null) {
                this.saved_pattern[i] = import_obj.saved_pattern[i];
            }
        }
    }
}