var playlist = new Playlist();
var pattern = new Pattern(4, 4);

var old_pattern_bars = pattern.bars;
var old_pattern_pulses = pattern.pulses;

const pattern_container = $("#pattern-container");
const pattern_content = $("#pattern-content");

function initialize() {
    generate_initial_tracks();

    pattern_container.draggable({
        handle: ".header"
    });
    pattern_container.resizable({
        minWidth: 600
    });
}

function generate_initial_tracks() {
    pattern.tracks.forEach(track => {
        generate_pattern_track(track);
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
    pattern_content.append(track_element);

    $("#pattern-track-" + track.id + " .sample").click((event) => {
        const sample = $(event.target);

        if (sample.hasClass("active")) {
            sample.removeClass("active");
        } else {
            sample.addClass("active");
        }
    })
}

function remove_pattern_track(id) {
    if (pattern.remove_track(id)) {
        $("#pattern-track-" + id).remove();
    }
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

function pause() {
    pattern.pause();
}

function set_pattern_bars(bars) {
    pattern.set_bars(bars);
    update_bars_pulses();
}

function set_pattern_pulses(pulses) {
    pattern.set_pulses(pulses);
    update_bars_pulses();
}

function update_bars_pulses() {
    pattern.tracks.forEach(track => {
        if (pattern.bars > old_pattern_bars) {
            for (var bar = old_pattern_bars; bar < pattern.bars; bar++) {
                for (var pulse = 1; pulse < pattern.pulses; pulse++) {
                    var innerHTML =
                        "<div class='column sample box-shadow " + (bar % 2 == 0 ? 'pair' : 'odd') + "' data-column='" + i + "' data-bar='" + bar + "' data-pulse='" + pulse + "' data-track='" + track.id + "'>" +
                        "</div>";
                    $(".pattern-track-container").append(innerHTML);
                }
            }
        } else if (pattern.bars < old_pattern_bars) {
            for (var i = pattern.bars; i < old_pattern_bars; i++) {
                $('[data-bar="' + (i + 1) + '"]').remove();
            }
        }

        if (pattern.pulses > old_pattern_pulses) {
            for (var bar = old_pattern_bars; bar < pattern.bars; bar++) {
                for (var pulse = 1; pulse < pattern.pulses; pulse++) {
                    var innerHTML =
                        "<div class='column sample box-shadow " + (bar % 2 == 0 ? 'pair' : 'odd') + "' data-column='" + i + "' data-bar='" + bar + "' data-pulse='" + pulse + "' data-track='" + track.id + "'>" +
                        "</div>";
                    $(".pattern-track-container").append(innerHTML);
                }
            }
        } else if (pattern.pulses < old_pattern_pulses) {
            for (var i = pattern.pulses; i < old_pattern_pulses; i++) {
                $('[data-pulse="' + (i + 1) + '"]').remove();
            }
        }
    });

    old_pattern_bars = pattern.bars;
    old_pattern_pulses = pattern.pulses;
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
