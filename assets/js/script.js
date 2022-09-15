var playlist = new Playlist();
var pattern = new Pattern(4, 4);

var old_pattern_bars = pattern.bars;
var old_pattern_pulses = pattern.pulses;

const pattern_container = $("#pattern-container");
const pattern_content = $("#pattern-content");
const equalizer_container = $("#equalizer-container");

const audioCtx = new AudioContext();

function initialize() {
    generate_initial_tracks();

    pattern_container.draggable({
        handle: ".header",
        containment: "#main-section",
        start: function(event, ui) {
            pattern_container.css('z-index', parseInt(pattern_container.css('z-index'))+1);
        }
    });
    pattern_container.resizable({
        minWidth: 600
    });

    equalizer_container.draggable({
        handle: ".header",
        containment: "#main-section",
        start: function(event, ui) {
            equalizer_container.css('z-index', parseInt(equalizer_container.css('z-index'))+1);
        }
    });

    check_query();
}

function generate_initial_tracks() {
    pattern.tracks.forEach(track => {
        generate_pattern_track(track);
    });
}

function check_query() {
    if (window.location.search !== "") {
        var arr = window.location.search.slice(1).split("=");
        arr[1] = decodeURI(arr[1]);
        var obj = new Object();
        obj[arr[0]] = arr[1];

        if (arr[0] === "pattern") {
            load_pattern("./assets/patterns/" + obj[arr[0]] + ".save");
        }
    }
}

function generate_pattern_track(track, to_load = null) {
    var track_element = $(document.createElement("div"));
    track_element.addClass("pattern-track");
    track_element.addClass("row");
    track_element.attr("id", "pattern-track-" + track.id);
    track_element.attr("data-id", track.id);

    var innerHTML = "";

    innerHTML += "<button class='button box-shadow' name='" + track.name + "' onclick='edit_pattern_track(" + track.id + ")'><div class='text'>" + track.name + "</div></button>";
    innerHTML += "<div class='pattern-track-container'>";
    
    var i = 1;

    for (var bar = 1; bar <= pattern.bars; bar++) {
        for (var pulse = 1; pulse <= pattern.pulses; pulse++) {
            innerHTML +=
            "<div class='column sample box-shadow " + (bar % 2 == 0 ? 'pair' : 'odd') + " " + (to_load !== null ? (to_load[i] ? 'active' : '') : '') + "' data-column='" + i + "' data-bar='" + bar + "' data-pulse='" + pulse + "' data-track='" + track.id + "'>" +
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
        const beat = sample.data("column");

        if (sample.hasClass("active")) {
            sample.removeClass("active");
            pattern.save(track.id, beat, false);
        } else {
            sample.addClass("active");
            pattern.save(track.id, beat, true);
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

function duplicate_pattern_track(id) {
    var new_track = pattern.duplicate_track(id);

    if (new_track !== false) {
        generate_pattern_track(new_track);
    }
}

function save_pattern(name) {
    pattern.export(name);
}

function load_pattern(file = null) {
    if (file !== null) {
        $.get(file, (response) => {
            try {
                var data = JSON.parse(response);
                load_pattern_json(data);
            } catch (error) {
                load_pattern_json(response);
            }
        });
    }
}

function load_pattern_json(obj) {
    var is_playing = pattern.is_playing;
    if (is_playing) pause();
    $(".pattern-track").remove();
    $(".pattern-clip").remove();
    pattern.load(obj);
    for (var i = 0; i < pattern.tracks.length; i++) {
        if (pattern.tracks[i] !== null) {
            generate_pattern_track(pattern.tracks[i], pattern.saved_pattern[pattern.tracks[i].id]);
        }
    }
    if (is_playing) play();
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

function minimize(id) {
    $('#' + id).slideToggle();
}

function maximize(id) {
    if ($('#' + id).hasClass('maximized')) {
        $('#' + id).removeClass('maximized');
    } else {
        $('#' + id).addClass('maximized');
    }
}

function close_window(id) {
    $('#' + id).slideToggle();
    //$('#' + id).hide();
}

initialize();
