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
    
    const navigation = (function() {
        const currentPageName = 'start';
        const callbackMapList = {};
        const pageList = Array.from(document.querySelectorAll('.navigation__page'));
        const pageMap = pageList.reduce(function(acc, page) {
            acc[page.getAttribute('data-page')] = page;
            
            return acc;
        }, {});

        function open(pageName) {
            pageMap[currentPageName].classList.remove('navigation__page--active');
            pageMap[pageName].classList.add('navigation__page--active');

            (callbackMapList[pageName] || []).forEach(function(callback) {
                callback();
            });
        }

        function onPageLoad(pageName, callback) {
            callbackMapList[pageName] = callbackMapList[pageName] || [];
            callbackMapList[pageName].push(callback);
        }
       
        return {
            open,
            onPageLoad,
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
    const againButton = form.again;
    const playButton = document.querySelector('button[name="play"]');

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
    });

    againButton.addEventListener('click', function () {
        sound.replay();
        input.focus();
    });

    playButton.addEventListener('click', function () {
        navigation.open('word');
    });

    navigation.onPageLoad('word', function () {
        currentSound = randomInArray(data.soundList);
        sound.play('./sounds/' + currentSound.src);
        input.focus();
    });
})();