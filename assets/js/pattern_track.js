class PatternTrack {
    id = null;
    audio_clip = null;
    audio_source = null;
    name = null;

    constructor(id, audio_clip = null, name = null, track = null) {
        this.id = id;

        if (track !== null) {
            this.audio_clip = track.audio_clip;
            this.name = track.name;
        } else {
            this.audio_clip = audio_clip;
            if (name !== null) {
                this.name = name;
            } else {
                this.name = 'Track ' + this.id;
            }
        }

        this.initialize();
    }

    initialize() {
        if (this.audio_clip !== null) {
            this.audio_source = document.createElement('audio');
            this.audio_source.src = this.audio_clip;
            this.audio_source.setAttribute('preload', 'auto');
            this.audio_source.classList.add('clip');
            document.body.appendChild(this.audio_source);
        }
    }

    play() {
        if (this.audio_source !== null) {
            if (!this.audio_source.currentTime > 0 || this.audio_source.paused) {
                this.audio_source.play();
            } else {
                this.audio_source.currentTime = 0;
                this.audio_source.play();
            }
        } else {
            console.log("No audio clip on " + this.name)
        }
    }

    set_name(name) { this.name = name; }
    set_audio_clip(audio_clip) { this.audio_clip = audio_clip; }
}