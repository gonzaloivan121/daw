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
        this.audio_source = document.createElement('audio');
        this.audio_source.src = this.audio_clip;
        this.audio_source.setAttribute('preload', 'auto');
        this.audio_source.classList.add('clip');
        document.body.appendChild(this.audio_source);
    }

    set_name(name) { this.name = name; }
    set_audio_clip(audio_clip) { this.audio_clip = audio_clip; }
}