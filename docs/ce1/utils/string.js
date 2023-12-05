const stringUtils = (function() {
    function removeAccent(string) {
        return string
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function clean(string) {
        return string
            .trim()
            .toLowerCase()
            .replace(/'/g, '’');
    }

    return {
        clean,
        removeAccent,
    }
})();

