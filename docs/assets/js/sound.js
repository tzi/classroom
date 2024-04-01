const soundManager = function() {
    let audio = null;

    function replay() {
        if (!audio) {
            return null;
        }
        audio.play();
    }

    function play(url) {
        if (audio) {
            stop();
        }
        audio = new Audio(url);
        audio.play();
    }

    function stop() {
        audio.pause();
    }

    return {
        play,
        replay,
        stop,
    }
};