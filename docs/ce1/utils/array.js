const arrayUtils = (function() {
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomItemList(array, length) {
        const shuffled = [...array].sort(() => Math.random());

        return shuffled.slice(0, length);
    }

    return {
        getRandomItem,
        getRandomItemList,
    }
})();