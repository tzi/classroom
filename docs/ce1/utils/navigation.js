const navigationManager = function() {
    /* State */
    let currentPageName = null;
    let nextPageName = null;
    const callbackMapList = {};

    /* DOM Elements */
    const pageList = Array.from(document.querySelectorAll('.navigation__page'));
    const pageMap = pageList.reduce(function(acc, page) {
        acc[page.getAttribute('data-page')] = page;

        return acc;
    }, {});

    /* Events */
    document.body.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && nextPageName) {
            event.preventDefault();
            open(nextPageName);

            return false;
        }
    });

    function open(pageName) {
        Array.from(document.querySelectorAll('.navigation__page--active'))
            .forEach(function(page) {
                page.classList.remove('navigation__page--active');
            });

        pageMap[pageName].classList.add('navigation__page--active');
        currentPageName = pageName;
        removeNextPage();

        (callbackMapList[pageName] || []).forEach(function(callback) {
            callback();
        });
    }

    function onPageLoad(pageName, callback) {
        callbackMapList[pageName] = callbackMapList[pageName] || [];
        callbackMapList[pageName].push(callback);
    }

    function setNextPage(pageName) {
        nextPageName = pageName;
    }

    function removeNextPage() {
        nextPageName = null;
    }

    return {
        open,
        onPageLoad,
        setNextPage,
        removeNextPage,
    }
};