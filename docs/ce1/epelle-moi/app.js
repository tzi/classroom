(function () {
    /* State */
    const navigation = navigationManager();
    const sound = soundManager();
    let currentSound;

    /* DOM Elements */
    const form = document.forms.orthographe;
    const input = form.mot;
    const againButton = form.again;
    const playButton = document.querySelector('button[name="play"]');
    const nextButton = document.querySelector('button[name="next"]');
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

    /* PAGE START */

    navigation.onPageLoad('start', function () {
        navigation.setNextPage('word');
    });

    playButton.addEventListener('click', function () {
        navigation.open('word');
    });

    /* PAGE WORD */

    navigation.onPageLoad('word', function () {
        currentSound = arrayUtils.getRandomItem(data.soundList);
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
        navigation.setNextPage('word');
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

    /* Let’s go */
    navigation.open('start');
})();