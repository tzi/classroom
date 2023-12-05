const soundManager = function() {
    let audio = null;

    function replay() {
        if (!audio) {
            return null;
        }
        audio.play();
    }

    function play(url) {
        audio = new Audio(url);
        audio.play();
    }

    return {
        play,
        replay,
    }
};