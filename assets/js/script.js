var playlist = new Playlist();
var pattern = new Pattern();

const container = $("#container");

function initialize() {
    pattern.tracks.forEach(track => {
        generate_pattern_track(track);
    });

    container.draggable();
    container.resizable();
}

function generate_pattern_track(track) {
    var track_element = $(document.createElement("div"));
    track_element.addClass("pattern-track");
    track_element.addClass("row");
    track_element.attr("id", "pattern-track-" + track.id);
    track_element.attr("data-id", track.id);

    var innerHTML = "<div class='pattern-track-name'>" + track.name + "</div>";

    innerHTML += "<div class='pattern-track-container'>";
    
    for (var bar = 1; bar <= pattern.bars; bar++) {
        for (var pulse = 1; pulse <= pattern.pulses; pulse++) {
            innerHTML +=
            "<div class='column sample " + (bar % 2 == 0 ? 'pair' : 'odd') + "' data-bar='" + bar + "' data-pulse='" + pulse + "' data-track='" + track.id + "'>" +
            "" +
            "</div>";
        }
    }

    innerHTML += "</div>";

    track_element.html(innerHTML);
    container.append(track_element);

    $("#" + track_element.attr("id") + " .sample").click((event) => {
        const sample = $(event.target);

        var bar = sample.data("bar");
        var pulse = sample.data("pulse");
        var track = sample.data("track");

        console.log("Bar: " + bar)
        console.log("Pulse: " + pulse)
        console.log("Track: " + track)
    })
}

function remove_pattern_track(id) {

}

function rename_pattern_track(id, name) {
    var track = pattern.get_track(id);
    if (!track) {
        return;
    } else {
        track.set_name(name);
        $("#pattern-track-" + track.id + " .pattern-track-name").html(track.name);
    }
}

function add_pattern_track() {
    generate_pattern_track(pattern.add_track());
}

function test() {
    playlist.add_track();
}

initialize();
