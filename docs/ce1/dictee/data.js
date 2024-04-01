const data = (function() {
    const category = {
        ALL: { id: 'ALL', label: 'Toutes les phrases' },
    };

    return {
        category,
        soundList: [
            {
                src: 'dictee1.mp3',
                answer: 'Devant la classe, il y a un petit parc avec des grands arbres.',
                categoryList: [ category.ALL ],
            },
            {
                src: 'dictee2.mp3',
                answer: 'Aujourd’hui, c’est une très belle journée.',
                categoryList: [ category.ALL ],
            },
            {
                src: 'dictee3.mp3',
                answer: 'Dans la cuisine, mon père prépare des fraises.',
                categoryList: [ category.ALL ],
            },
            {
                src: 'dictee4.mp3',
                answer: 'Un garçon regarde par la fenêtre.',
                categoryList: [ category.ALL ],
            },
            {
                src: 'dictee5.mp3',
                answer: 'Des oiseaux volent dans le ciel gris.',
                categoryList: [ category.ALL ],
            },
        ]
    };
})();