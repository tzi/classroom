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
        let currentPageName = 'start';
        const callbackMapList = {};
        const pageList = Array.from(document.querySelectorAll('.navigation__page'));
        const pageMap = pageList.reduce(function(acc, page) {
            acc[page.getAttribute('data-page')] = page;
            
            return acc;
        }, {});

        function open(pageName) {
            pageMap[currentPageName].classList.remove('navigation__page--active');
            pageMap[pageName].classList.add('navigation__page--active');
            currentPageName = pageName;

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

    function cleanAccent(string) {
        return string
            .trim()
            .toLowerCase()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function cleanProposal(string) {
        return string
            .trim()
            .toLowerCase()
            .replace(/'/g, '’');
    }

    function outputResult(isSuccess, title, details = '') {
        resultTitleElement.innerHTML = title;
        resultTitleElement.classList.toggle('c-result__title--error', !isSuccess);
        resultTitleElement.classList.toggle('c-result__title--success', isSuccess);
        resultDetailsElement.innerHTML = details;

        navigation.open('result');
    }

    let nextPage = 'word';
    const form = document.forms.orthographe;
    const input = form.mot;
    const againButton = form.again;
    const playButton = document.querySelector('button[name="play"]');
    const nextButton = document.querySelector('button[name="next"]');
    const specialCharButtonList = Array.from(document.querySelectorAll('button[name="special-character"]'));
    const resultTitleElement  = document.querySelector('.c-result__title');
    const resultDetailsElement  = document.querySelector('.c-result__details');

    input.focus();
    let currentSound;

    document.body.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && nextPage) {
            event.preventDefault();
            navigation.open(nextPage);
            nextPage = '';

            return false;
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const proposal = cleanProposal(input.value);
        const isPerfectAnswer = proposal === currentSound.answer;
        const isCustomAcceptedAnswer = (currentSound.accepted || []).find(function (accepted) {
            return proposal === accepted.answer;
        });
        const isCustomRejectedAnswer = (currentSound.rejected || []).find(function (rejected) {
            return proposal === rejected.answer;
        });

        if (isPerfectAnswer) {
            return outputResult(true, 'Bravo&nbsp;!', 'La réponse était bien «&nbsp;' + currentSound.answer + '&nbsp;».');
        } else if (isCustomAcceptedAnswer) {
            return outputResult(true, 'Bravo&nbsp;!', isCustomAcceptedAnswer.details);
        } else if (isCustomRejectedAnswer) {
            return outputResult(false, 'Presque&nbsp;!', isCustomRejectedAnswer.details);
        }

        const diff = JsDiff.diffChars(currentSound.answer, proposal);
        let html = '';
        diff.forEach(function (part) {
            if (part.added) {
                return false;
            }
            const tag = part.removed ? 'b' : 'span';
            html += `<${tag}>${part.value}</${tag}>`;
        });
        outputResult(false, 'Dommage&nbsp;!', 'La réponse était «&nbsp;' + html + '&nbsp;».');
    });

    againButton.addEventListener('click', function () {
        sound.replay();
        input.focus();
    });

    playButton.addEventListener('click', function () {
        navigation.open('word');
    });

    nextButton.addEventListener('click', function () {
        navigation.open('word');
    });

    specialCharButtonList.forEach(function (button) {
        button.addEventListener('click', function() {
            const extraChar = button.innerText.trim();
            const caretPosition =  input.selectionStart;
            input.value = input.value.substring(0, caretPosition) + extraChar + input.value.substring(caretPosition);
            input.focus();
            input.setSelectionRange(caretPosition + 1, caretPosition + 1);
        });
    });

    navigation.onPageLoad('start', function () {
        nextPage = 'word';
    });

    navigation.onPageLoad('word', function () {
        currentSound = randomInArray(data.soundList);
        sound.play('./sounds/' + currentSound.src);
        input.value = '';
        input.focus();
    });

    navigation.onPageLoad('result', function () {
        nextPage = 'word';
    });
})();