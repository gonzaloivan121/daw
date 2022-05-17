var playlist = new Playlist();
var pattern = new Pattern(4, 4);

const container = $("#container");
const content = $("#content");

function initialize() {
    pattern.tracks.forEach(track => {
        generate_pattern_track(track);
    });

    container.draggable({
        handle: ".header"
    });
    container.resizable({
        minWidth: 500
    });
}

function generate_pattern_track(track) {
    var track_element = $(document.createElement("div"));
    track_element.addClass("pattern-track");
    track_element.addClass("row");
    track_element.attr("id", "pattern-track-" + track.id);
    track_element.attr("data-id", track.id);

    var innerHTML = "";

    innerHTML += "<button class='edit-pattern-track box-shadow' onclick='edit_pattern_track(" + track.id + ")'><div class='pattern-track-name'>" + track.name + "</div></button>";
    innerHTML += "<div class='pattern-track-container'>";
    
    var i = 1;

    for (var bar = 1; bar <= pattern.bars; bar++) {
        for (var pulse = 1; pulse <= pattern.pulses; pulse++) {
            innerHTML +=
            "<div class='column sample box-shadow " + (bar % 2 == 0 ? 'pair' : 'odd') + "' data-column='" + i + "' data-bar='" + bar + "' data-pulse='" + pulse + "' data-track='" + track.id + "'>" +
            "" +
            "</div>";
            i++;
        }
    }

    innerHTML += "</div>";

    track_element.html(innerHTML);
    content.append(track_element);

    $("#" + track_element.attr("id") + " .sample").click((event) => {
        const sample = $(event.target);

        if (sample.hasClass("active")) {
            sample.removeClass("active");
        } else {
            sample.addClass("active");
        }
    })
}

function remove_pattern_track(id) {
    pattern.remove_track(id);
}

function edit_pattern_track(id) {
    var track = pattern.get_track(id);
    if (!track) {
        return;
    } else {
        console.log(track)
    }
}

function play() {
    pattern.play();
}

function stop() {
    pattern.stop();
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
