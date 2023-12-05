const EpelleMoiGame = function (soundLength) {

    /* State */
    const navigation = navigationManager();
    const sound = soundManager();
    let soundList;
    let currentSound;
    let currentStep = 0;
    let currentCategoryId = data.category.ALL;

    /* DOM Elements */
    const formCategory = document.forms.category;
    const formWord = document.forms.word;
    const input = formWord.mot;
    const stepCounterElement = document.querySelector('.c-step-counter');
    const stepProgressBarElement = document.querySelector('.c-step-progress__bar');
    const againButton = formWord.again;
    const playButton = document.querySelector('button[name="play"]');
    const nextButton = document.querySelector('button[name="next"]');
    const nextButtonLabel = document.querySelector('button[name="next"] > span');
    const restartButton = document.querySelector('button[name="restart"]');
    const specialCharButtonList = Array.from(document.querySelectorAll('button[name="special-character"]'));
    const resultTitleElement  = document.querySelector('[data-page="result"] .c-result__title');
    const resultDetailsElement  = document.querySelector('[data-page="result"] .c-result__details');
    const bilanTitleElement  = document.querySelector('[data-page="bilan"] .c-result__title');
    const bilanDetailsElement  = document.querySelector('[data-page="bilan"] .c-result__details');

    /* UTILS */
    function outputResult(isSuccess, title, details = '') {
        currentSound.isSuccess = isSuccess;
        resultTitleElement.innerHTML = title;
        resultTitleElement.classList.toggle('c-result__color-error', !isSuccess);
        resultTitleElement.classList.toggle('c-result__color-success', isSuccess);
        resultDetailsElement.innerHTML = details;

        navigation.open('result');
    }

    function getCategoryLabel(categoryId = currentCategoryId) {
        return data.category[categoryId].label;
    }

    function resetStepMarkers() {
        stepCounterElement.innerHTML = '';
        stepProgressBarElement.style.width = 0;
    }

    function updateStepMarkers() {
        if (!soundList || !currentCategoryId) {
            resetStepMarkers()
        }
        stepCounterElement.innerHTML = `${getCategoryLabel()} ${currentStep} / ${soundList.length}`;
        stepProgressBarElement.style.width = `${(100 * currentStep / soundList.length)}%`
    }

    function getSoundListByCategoryId(categoryId) {
        if (categoryId === data.category.ALL.id) {
            return data.soundList;
        }

        return data.soundList.filter(function(sound) {
            return sound.categoryList && sound.categoryList.includes(categoryId);
        });
    }

    /* PAGE START */

    navigation.onPageLoad('start', function () {
        soundList = null;
        resetStepMarkers()
        formCategory.innerHTML = '';
        Object.keys(data.category)
            .filter(function (categoryId) {
                return getSoundListByCategoryId(categoryId).length >= 5;
            })
            .forEach(function (categoryId) {
                formCategory.innerHTML += `
                    <label class="o-button o-button--tertiary">
                        <input type="radio" name="category" value="${categoryId}" />
                        <span>${getCategoryLabel(categoryId)}</span>
                    </label>
                `;
            })
        navigation.setNextPage('word');
    });

    playButton.addEventListener('click', function () {
        if (formCategory.category.value) {
            currentCategoryId = formCategory.category.value
        }
        navigation.next();
    });

    /* PAGE WORD */

    navigation.onPageLoad('word', function () {
        if (!soundList) {
            soundList = arrayUtils.getRandomItemList(getSoundListByCategoryId(currentCategoryId), soundLength);
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

    nextButton.addEventListener('click', function () {
        navigation.next();
    });

    formWord.addEventListener('submit', function (event) {
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
        bilanTitleElement.innerHTML = getCategoryLabel();
        bilanDetailsElement.innerHTML = `
            <ul class="c-result__details-list">
                ${soundList.map(function (sound) {
                    return `
                        <li class="${sound.isSuccess ? 'c-result__color-success' : 'c-result__color-error'}">
                            ${sound.answer}
                            ${sound.isSuccess ? '👍' : ''}
                        </li>
                    `;
                }).join('')}
            </ul>
        `;
        navigation.setNextPage('start');
    });

    restartButton.addEventListener('click', function () {
        navigation.next();
    });

    /* Let’s go */
    navigation.open('start');
};