const data = (function() {
    const category = {
        ALL: { id: 'ALL', label: 'Tous les mots' },
        LIAISON : { id: 'LIAISON', label: 'Mots de liaisons' },
        TEMPS : { id: 'TEMPS', label: 'Le temps' },
        ESPACE : { id: 'ESPACE', label: 'L’espace' },
        VERBE : { id: 'VERBE', label: 'Les verbes' },
        ADJECTIF : { id: 'ADJECTIF', label: 'Les adjectifs' },
        COULEUR : { id: 'COULEUR', label: 'Les couleurs' },
        NATURE : { id: 'NATURE', label: 'Dans la nature' },
        MAISON : { id: 'MAISON', label: 'À la maison' },
        VILLE : { id: 'VILLE', label: 'Dans la ville' },
        ECOLE: { id: 'ECOLE', label: 'À l’école' },
    };

    return {
        category,
        soundList: [
            {
                src: 'alors.mp3',
                answer: 'alors',
                categoryList: [ category.ALL.id, category.LIAISON.id ],
            },
            {
                src: 'apres.mp3',
                answer: 'après',
                rejected: [
                    {
                        answer: 'apres',
                        details: 'Il y a un accent grave dans le mot «&nbsp;apr<b>è</b>s&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'arbre.mp3',
                answer: 'arbre',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'aujourd-hui.mp3',
                answer: 'aujourd’hui',
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'autour.mp3',
                answer: 'autour',
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'avoir.mp3',
                answer: 'avoir',
                categoryList: [ category.ALL.id, category.VERBE.id ],
            },
            {
                src: 'belle.mp3',
                answer: 'belle',
                categoryList: [ category.ALL.id, category.ADJECTIF.id ],
            },
            {
                src: 'blanc.mp3',
                answer: 'blanc',
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'bleu.mp3',
                answer: 'bleu',
                accepted: [
                    {
                        answer: 'bleue',
                        details: 'On dit «&nbsp;une voiture <b>bleue</b>&nbsp;», mais du «&nbsp;<b>bleu</b>&nbsp;»'
                    }
                ],
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'bonjour.mp3',
                answer: 'bonjour'
            },
            {
                src: 'de-la-confiture.mp3',
                answer: 'de la confiture',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'derriere.mp3',
                answer: 'derrière',
                rejected: [
                    {
                        answer: 'derriere',
                        details: 'Il y a un accent grave dans le mot «&nbsp;derri<b>è</b>res&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'des-lunettes.mp3',
                answer: 'des lunettes',
                categoryList: [ category.ALL.id, category.MAISON, category.ECOLE.id ],
            },
            {
                src: 'dessous.mp3',
                answer: 'dessous',
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'du-chocolat.mp3',
                answer: 'du chocolat',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'du-lait.mp3',
                answer: 'du lait',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'du-sucre.mp3',
                answer: 'du sucre',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'fruit.mp3',
                answer: 'fruit',
                categoryList: [ category.ALL.id, category.NATURE, category.MAISON.id ],
            },
            {
                src: 'hier.mp3',
                answer: 'hier',
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'je-suis.mp3',
                answer: 'je suis',
                categoryList: [ category.ALL.id, category.VERBE.id ],
            },
            {
                src: 'joyeux.mp3',
                answer: 'joyeux',
                categoryList: [ category.ALL.id, category.ADJECTIF.id ],
            },
            {
                src: 'l-ecole.mp3',
                answer: 'l’école',
                rejected: [
                    {
                        answer: 'apres',
                        details: 'Il y a un accent aigu dans le mot «&nbsp;<b>é</b>cole&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.VILLE, category.ECOLE.id ],
            },
            {
                src: 'la-couleur.mp3',
                answer: 'la couleur',
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'la-cour.mp3',
                answer: 'la cour',
                categoryList: [ category.ALL.id, category.ECOLE.id ],
            },
            {
                src: 'la-musique.mp3',
                answer: 'la musique',
                categoryList: [ category.ALL.id, category.MAISON, category.ECOLE.id ],
            },
            {
                src: 'la-nature.mp3',
                answer: 'la nature',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'la-reine.mp3',
                answer: 'la reine'
            },
            {
                src: 'la-route.mp3',
                answer: 'la route',
                categoryList: [ category.ALL.id, category.VILLE.id ],
            },
            {
                src: 'la-rue.mp3',
                answer: 'la rue',
                categoryList: [ category.ALL.id, category.VILLE.id ],
            },
            {
                src: 'le-bois.mp3',
                answer: 'le bois',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'le-repas.mp3',
                answer: 'le repas',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'le-roi.mp3',
                answer: 'le roi'
            },
            {
                src: 'le-soir.mp3',
                answer: 'le soir',
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'loin.mp3',
                answer: 'loin',
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'ma-lecon.mp3',
                answer: 'ma leçon',
                rejected: [
                    {
                        answer: 'apres',
                        details: 'Il y a une cédille dans le mot «&nbsp;le<b>ç</b>on&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.ECOLE.id ],
            },
            {
                src: 'ma-mere.mp3',
                answer: 'ma mère',
                rejected: [
                    {
                        answer: 'ma mere',
                        details: 'Il y a un accent grave dans le mot «&nbsp;m<b>è</b>re&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'ma-soeur.mp3',
                answer: 'ma sœur',
                accepted: [
                    {
                        answer: 'ma soeur',
                        details: '«&nbsp;ma s<b>œ</b>ur&nbsp;» s’écrit avec un «&nbsp;e dans l’o&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'mon-frere.mp3',
                answer: 'mon frère',
                rejected: [
                    {
                        answer: 'mon frere',
                        details: 'Il y a un accent grave dans le mot «&nbsp;fr<b>è</b>re&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'mon-pere.mp3',
                answer: 'mon père',
                rejected: [
                    {
                        answer: 'mon pere',
                        details: 'Il y a un accent grave dans le mot «&nbsp;p<b>è</b>re&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'noir.mp3',
                answer: 'noir',
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'oui.mp3',
                answer: 'oui'
            },
            {
                src: 'plus.mp3',
                answer: 'plus'
            },
            {
                src: 'pour.mp3',
                answer: 'pour',
                categoryList: [ category.ALL.id, category.LIAISON.id ],
            },
            {
                src: 'pourquoi.mp3',
                answer: 'pourquoi'
            },
            {
                src: 'quoi.mp3',
                answer: 'quoi'
            },
            {
                src: 'rond.mp3',
                answer: 'rond',
                categoryList: [ category.ALL.id, category.ADJECTIF, category.ECOLE.id ],
            },
            {
                src: 'rouge.mp3',
                answer: 'rouge',
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'sous.mp3',
                answer: 'sous',
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'sur.mp3',
                answer: 'sur',
                accepted: [
                    {
                        answer: 'sûr',
                        details: 'Il n’y a pas d’accent quand on dit «&nbsp;il est s<b>u</b>r la table&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.ESPACE.id ],
            },
            {
                src: 'surtout.mp3',
                answer: 'surtout',
                categoryList: [ category.ALL.id, category.LIAISON.id ],
            },
            {
                src: 'toujours.mp3',
                answer: 'toujours',
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'un-animal.mp3',
                answer: 'un animal',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'un-arbre.mp3',
                answer: 'un arbre',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'un-carre.mp3',
                answer: 'un carré',
                rejected: [
                    {
                        answer: 'un carre',
                        details: 'Il y a un accent aigu dans le mot «&nbsp;carr<b>é</b>&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.ECOLE.id ],
            },
            {
                src: 'un-fruit.mp3',
                answer: 'un fruit',
                categoryList: [ category.ALL.id, category.NATURE, category.MAISON.id ],
            },
            {
                src: 'un-livre.mp3',
                answer: 'un livre',
                categoryList: [ category.ALL.id, category.ECOLE.id ],
            },
            {
                src: 'un-nuage.mp3',
                answer: 'un nuage',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'un-oiseau.mp3',
                answer: 'un oiseau',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'un-poisson.mp3',
                answer: 'un poisson',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'un-pull.mp3',
                answer: 'un pull',
                categoryList: [ category.ALL.id, category.MAISON.id ],
            },
            {
                src: 'un-voyage.mp3',
                answer: 'un voyage'
            },
            {
                src: 'une-balle.mp3',
                answer: 'une balle',
                categoryList: [ category.ALL.id, category.ECOLE, category.MAISON],
            },
            {
                src: 'une-couleur.mp3',
                answer: 'une couleur',
                categoryList: [ category.ALL.id, category.COULEUR.id ],
            },
            {
                src: 'une-etoile.mp3',
                answer: 'une étoile',
                rejected: [
                    {
                        answer: 'une etoile',
                        details: 'Il y a un accent aigu dans le mot «&nbsp;<b>é</b>toile&nbsp;».'
                    }
                ],
            },
            {
                src: 'une-journee.mp3',
                answer: 'une journée',
                rejected: [
                    {
                        answer: 'une journee',
                        details: 'Il y a un accent aigu dans le mot «&nbsp;journ<b>é</b>e&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.TEMPS.id ],
            },
            {
                src: 'une-plume.mp3',
                answer: 'une plume',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'une-rue.mp3',
                answer: 'une rue',
                categoryList: [ category.ALL.id, category.VILLE.id ],
            },
            {
                src: 'une-souris.mp3',
                answer: 'une souris',
                categoryList: [ category.ALL.id, category.NATURE.id ],
            },
            {
                src: 'une-ville.mp3',
                answer: 'une ville',
                categoryList: [ category.ALL.id, category.VILLE.id ],
            },
            {
                src: 'une-voiture.mp3',
                answer: 'une voiture',
                categoryList: [ category.ALL.id, category.VILLE.id ],
            },
            {
                src: 'voici.mp3',
                answer: 'voici',
                categoryList: [ category.ALL.id, category.LIAISON.id ],
            },
            {
                src: 'voila.mp3',
                answer: 'voilà',
                rejected: [
                    {
                        answer: 'voila',
                        details: 'Il y a un accent grave dans le mot «&nbsp;voil<b>à</b>&nbsp;».'
                    }
                ],
                categoryList: [ category.ALL.id, category.LIAISON.id ],
            },
        ]
    };
})();