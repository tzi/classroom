(function () {
    const sound = (function() {
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
    })();

    function randomInArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function cleanProposal(string) {
        return string
            .trim()
            .toLowerCase()
            .replace(/'/g, '’');
    }

    const form = document.forms.orthographe;
    const input = form.mot;
    const submitButton = form.submit;
    const againButton = form.again;
    const formLabel = form.querySelector('label');
    input.focus();
    let currentSound;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (currentSound) {
            const proposal = cleanProposal(input.value);
            if (proposal === currentSound.answer) {
                alert('Bravo !');
            } else {
                alert('Dommage ! C’était « ' + currentSound.answer + ' ».');
            }
            input.value = '';
            currentSound = null;
        }
        currentSound = randomInArray(data.soundList);
        sound.play('./sounds/' + currentSound.src);
        submitButton.innerHTML = 'Valider';
        againButton.removeAttribute('hidden');
        formLabel.removeAttribute('hidden');
    });

    againButton.addEventListener('click', function () {
        sound.replay();
        input.focus();
    })
})();