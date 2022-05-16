var playlist = new Playlist();
var pattern = new Pattern();

const container = document.getElementById('container');

/**
 * Function that executes on start and when the window is resized.
 * 
 * It sets the canvas' width and height, calculates the matrix,
 * draws the canvas coordinate system and the matrix on top of it.
 */
function initialize() {
    pattern.tracks.forEach(track => {
        generate_pattern_track(track);
    });
}

function generate_pattern_track(track) {
    var track_element = document.createElement("div");
    track_element.classList.add("pattern-track");
    track_element.id = "pattern-track-" + track.id;
    track_element.dataset.id = track.id;
    var innerHTML = "";

    for (var x = 0; x < pattern.length; x++) {
        innerHTML +=
            "<div class='column sample' data-column='" + x + "'>" +
                "" +
            "</div>";
    }

    track_element.innerHTML = innerHTML;

    container.appendChild(track_element);
}

function test() {
    playlist.add_track();
}

initialize();
