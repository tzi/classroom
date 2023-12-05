const EpelleMoiGame = function (category, soundLength) {

    /* State */
    const navigation = navigationManager();
    const sound = soundManager();
    let soundList;
    let currentSound;
    let currentStep = 0;

    /* DOM Elements */
    const form = document.forms.orthographe;
    const input = form.mot;
    const stepCounterElement = document.querySelector('.c-step-counter');
    const stepProgressBarElement = document.querySelector('.c-step-progress__bar');
    const againButton = form.again;
    const playButton = document.querySelector('button[name="play"]');
    const nextButton = document.querySelector('button[name="next"]');
    const nextButtonLabel = document.querySelector('button[name="next"] > span');
    const restartButton = document.querySelector('button[name="restart"]');
    const specialCharButtonList = Array.from(document.querySelectorAll('button[name="special-character"]'));
    const resultTitleElement  = document.querySelector('.c-result__title');
    const resultDetailsElement  = document.querySelector('.c-result__details');

    /* UTILS */
    function outputResult(isSuccess, title, details = '') {
        resultTitleElement.innerHTML = title;
        resultTitleElement.classList.toggle('c-result__title--error', !isSuccess);
        resultTitleElement.classList.toggle('c-result__title--success', isSuccess);
        resultDetailsElement.innerHTML = details;

        navigation.open('result');
    }

    function updateStepMarkers() {
        stepCounterElement.innerHTML = `${currentStep} / ${soundList.length}`;
        stepProgressBarElement.style.width = `${(100 * currentStep / soundList.length)}%`
    }

    /* PAGE START */

    navigation.onPageLoad('start', function () {
        navigation.setNextPage('word');
    });

    playButton.addEventListener('click', function () {
        navigation.open('word');
    });

    /* PAGE WORD */

    navigation.onPageLoad('word', function () {
        if (!soundList) {
            soundList = arrayUtils.getRandomItemList(data.soundList, soundLength);
            currentStep = 0;
        }
        currentSound = soundList[currentStep];
        currentStep++;
        updateStepMarkers()

        sound.play('./sounds/' + currentSound.src);
        input.value = '';
        input.focus();
    });

    againButton.addEventListener('click', function () {
        sound.replay();
        input.focus();
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

    /* PAGE RESULT */

    navigation.onPageLoad('result', function () {
        const isNextBilan = currentStep === soundList.length;
        navigation.setNextPage(isNextBilan ? 'bilan' : 'word');
        nextButtonLabel.innerHTML = isNextBilan ? 'Bilan' : 'Suivant';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const proposal = stringUtils.clean(input.value);
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

    /* PAGE BILAN */

    navigation.onPageLoad('bilan', function () {
        soundList = null;
        navigation.setNextPage('word');
    });

    restartButton.addEventListener('click', function () {
        navigation.open('word');
    });

    /* Let’s go */
    navigation.open('start');
};

EpelleMoiGame.category = {
  ALL: 'all'
};