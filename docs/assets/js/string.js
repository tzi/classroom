const stringUtils = (function() {
    function removeAccent(string) {
        return string
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function clean(string, isCaseSensitive = false) {
        string = isCaseSensitive ? string : string.toLowerCase();

        return string
            .trim()
            .replace(/'/g, '’');
    }

    return {
        clean,
        removeAccent,
    }
})();

