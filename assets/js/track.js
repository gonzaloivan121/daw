class Track {
    id = null;
    volume = 100;
    panning = 0;
    effects = [];
    items = [];

    constructor(id, item = null, track = null) {
        this.id = id;

        if (track !== null) {
            this.volume = track.volume;
            this.panning = track.panning;
            this.effects = track.effects;
            this.items = track.items;
        } else {
            if (item !== null) {
                this.items.push(item);
            }
        }
    }

    get_volume() { return this.volume; }
    get_panning() { return this.panning; }

    set_panning(panning) {
        if (panning < -100 || panning > 100) return this.panning;
        this.panning = panning;
        return this.panning;
    }

    set_volume(volume) {
        if (volume < 0 || volume > 100) return this.volume;
        this.volume = volume;
        return this.volume;
    }

    duplicate(id) {
        return new Track(id, null, this);
    }

    duplicate_item(id) {
        var item_found = false;

        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.id === id) {
                item_found = true;
                this.items.push(item.duplicate(this.get_last_item_id() + 1));
            }
        }

        return item_found;
    }

    add_item(item) {
        this.items.push(item);
    }

    remove_item(id) {
        var item_found = false;

        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.id === id) {
                item_found = true;
                this.items.splice(i, 1);
            }
        }

        return item_found;
    }
}