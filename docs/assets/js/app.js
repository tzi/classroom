const EpelleMoiGame = function (options) {
    const {
        stepLength = 5,
        displayErrorCount = false,
        displayAddedParts = false,
        isCaseSensitive = false,
    } = options;

    /* State */
    const navigation = navigationManager();
    const sound = soundManager();
    let soundList;
    let currentSound;
    let currentStep = 0;
    let currentCategoryId = null;

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
        if (!categoryId) {
            return '';
        }

        return categoryId && data.category[categoryId] && data.category[categoryId].label;
    }

    function resetStepMarkers() {
        stepCounterElement.innerHTML = '';
        stepProgressBarElement.style.width = 0;
    }

    function updateStepMarkers() {
        if (!soundList || soundList.length < 2 || !currentCategoryId) {
            return resetStepMarkers();
        }
        stepCounterElement.innerHTML = `${getCategoryLabel()} ${currentStep} / ${soundList.length}`;
        stepProgressBarElement.style.width = `${(100 * currentStep / soundList.length)}%`
    }

    function getSoundListByCategoryId(categoryId) {
        if (!categoryId) {
            return data.soundList.filter(Boolean);
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
                return getSoundListByCategoryId(categoryId).length >= stepLength;
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
        if (formCategory.category && formCategory.category.value) {
            currentCategoryId = formCategory.category.value
        }
        navigation.next();
    });

    /* PAGE WORD */

    navigation.onPageLoad('word', function () {
        if (!soundList) {
            soundList = arrayUtils.getRandomItemList(getSoundListByCategoryId(currentCategoryId), stepLength);
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
        const isSingleWord = soundList.length === 1;
        const isNextBilan = !isSingleWord && (currentStep === soundList.length);
        if (isSingleWord) {
            navigation.setNextPage('start');
            nextButtonLabel.innerHTML = 'Recommencer';
        } else if (isNextBilan) {
            navigation.setNextPage('bilan');
            nextButtonLabel.innerHTML = 'Bilan';
        } else {
            navigation.setNextPage('word');
            nextButtonLabel.innerHTML = 'Suivant';
        }
    });

    nextButton.addEventListener('click', function () {
        navigation.next();
    });

    formWord.addEventListener('submit', function (event) {
        event.preventDefault();
        const proposal = stringUtils.clean(input.value, isCaseSensitive);
        if (!proposal) {
            return false;
        }
        const answer = stringUtils.clean(currentSound.answer, isCaseSensitive);
        const isPerfectAnswer = proposal === answer;
        const isCustomAcceptedAnswer = (currentSound.accepted || []).find(function (accepted) {
            return proposal === stringUtils.clean(accepted.answer, isCaseSensitive);
        });
        const isCustomRejectedAnswer = (currentSound.rejected || []).find(function (rejected) {
            return proposal === stringUtils.clean(rejected.answer, isCaseSensitive);
        });

        if (isPerfectAnswer) {
            return outputResult(true, 'Bravo&nbsp;!', 'La réponse était bien «&nbsp;' + answer + '&nbsp;».');
        } else if (isCustomAcceptedAnswer) {
            return outputResult(true, 'Bravo&nbsp;!', isCustomAcceptedAnswer.details);
        } else if (isCustomRejectedAnswer) {
            return outputResult(false, 'Presque&nbsp;!', isCustomRejectedAnswer.details);
        }

        const diff = JsDiff.diffChars(answer, proposal);
        let errorCount = 0;
        let lastPartHasDiff = false;
        let currentWordHasError = false
        let html = '';
        diff.forEach(function (part) {
            const partHasDiff = (part.added || part.removed);
            if (partHasDiff && !currentWordHasError) {
                errorCount++;
                currentWordHasError = true;
            }
            if (part.added) {
                if (displayAddedParts && !lastPartHasDiff) {
                    html += `<del>${part.value}</del>`;
                }
            } else if (part.removed) {
                html += `<ins>${part.value}</ins>`;
            } else {
                html += `<span>${part.value}</span>`;
            }
            if ((/\s/).test(part.value)) {
                currentWordHasError = false;
            }
            lastPartHasDiff = partHasDiff;
        });
        const title = displayErrorCount ? `${errorCount} erreur${errorCount > 1 ? 's' : ''}` : 'Dommage&nbsp;!';
        outputResult(false, title, 'La réponse était «&nbsp;' + html + '&nbsp;».');
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