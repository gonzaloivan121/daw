class Item {
    id = null;
    audio_clip = null;
    is_midi = false;

    constructor(id, audio_clip = null, item = null) {
        this.id = id;
        if (item !== null) {
            this.audio_clip = item.audio_clip;
            this.is_midi = item.is_midi;
        } else {
            this.audio_clip = audio_clip;
        }
    }

    duplicate(id) {
        return new Item(id, null, this);
    }
}