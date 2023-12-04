const data = {
    soundList: [
        {
            src: 'alors.mp3',
            answer: 'alors'
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
        },
        {
            src: 'arbre.mp3',
            answer: 'arbre'
        },
        {
            src: 'aujourd-hui.mp3',
            answer: 'aujourd’hui'
        },
        {
            src: 'autour.mp3',
            answer: 'autour'
        },
        {
            src: 'avoir.mp3',
            answer: 'avoir'
        },
        {
            src: 'belle.mp3',
            answer: 'belle'
        },
        {
            src: 'blanc.mp3',
            answer: 'blanc'
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
        },
        {
            src: 'bonjour.mp3',
            answer: 'bonjour'
        },
        {
            src: 'de-la-confiture.mp3',
            answer: 'de la confiture'
        },
        {
            src: 'derriere.mp3',
            answer: 'derrière',
            rejected: [
                {
                    answer: 'apres',
                    details: 'Il y a un accent grave dans le mot «&nbsp;derri<b>è</b>res&nbsp;».'
                }
            ],
        },
        {
            src: 'des-lunettes.mp3',
            answer: 'des lunettes'
        },
        {
            src: 'dessous.mp3',
            answer: 'dessous'
        },
        {
            src: 'du-chocolat.mp3',
            answer: 'du chocolat'
        },
        {
            src: 'du-lait.mp3',
            answer: 'du lait'
        },
        {
            src: 'du-sucre.mp3',
            answer: 'du sucre'
        },
        {
            src: 'fruit.mp3',
            answer: 'fruit'
        },
        {
            src: 'hier.mp3',
            answer: 'hier'
        },
        {
            src: 'je-suis.mp3',
            answer: 'je suis'
        },
        {
            src: 'joyeux.mp3',
            answer: 'joyeux'
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
        },
        {
            src: 'la-couleur.mp3',
            answer: 'la couleur'
        },
        {
            src: 'la-cour.mp3',
            answer: 'la cour'
        },
        {
            src: 'la-musique.mp3',
            answer: 'la musique'
        },
        {
            src: 'la-nature.mp3',
            answer: 'la nature'
        },
        {
            src: 'la-reine.mp3',
            answer: 'la reine'
        },
        {
            src: 'la-route.mp3',
            answer: 'la route'
        },
        {
            src: 'la-rue.mp3',
            answer: 'la rue'
        },
        {
            src: 'le-bois.mp3',
            answer: 'le bois'
        },
        {
            src: 'le-repas.mp3',
            answer: 'le repas'
        },
        {
            src: 'le-roi.mp3',
            answer: 'le roi'
        },
        {
            src: 'le-soir.mp3',
            answer: 'le soir'
        },
        {
            src: 'loin.mp3',
            answer: 'loin'
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
        },
        {
            src: 'ma-soeur.mp3',
            accepted: [
                {
                    answer: 'ma soeur',
                    details: '«&nbsp;ma s<b>œ</b>ur&nbsp;» s’écrit avec un «&nbsp;e dans l’o&nbsp;».'
                }
            ],
            answer: 'ma sœur',
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
        },
        {
            src: 'noir.mp3',
            answer: 'noir',
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
            answer: 'pour'
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
            answer: 'rond'
        },
        {
            src: 'rouge.mp3',
            answer: 'rouge'
        },
        {
            src: 'sous.mp3',
            answer: 'sous'
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
        },
        {
            src: 'surtout.mp3',
            answer: 'surtout'
        },
        {
            src: 'toujours.mp3',
            answer: 'toujours'
        },
        {
            src: 'un-animal.mp3',
            answer: 'un animal'
        },
        {
            src: 'un-arbre.mp3',
            answer: 'un arbre'
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
        },
        {
            src: 'un-fruit.mp3',
            answer: 'un fruit'
        },
        {
            src: 'un-livre.mp3',
            answer: 'un livre'
        },
        {
            src: 'un-nuage.mp3',
            answer: 'un nuage'
        },
        {
            src: 'un-oiseau.mp3',
            answer: 'un oiseau'
        },
        {
            src: 'un-poisson.mp3',
            answer: 'un poisson'
        },
        {
            src: 'un-pull.mp3',
            answer: 'un pull'
        },
        {
            src: 'un-voyage.mp3',
            answer: 'un voyage'
        },
        {
            src: 'une-balle.mp3',
            answer: 'une balle'
        },
        {
            src: 'une-couleur.mp3',
            answer: 'une couleur'
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
        },
        {
            src: 'une-plume.mp3',
            answer: 'une plume'
        },
        {
            src: 'une-rue.mp3',
            answer: 'une souris'
        },
        {
            src: 'une-souris.mp3',
            answer: 'une souris'
        },
        {
            src: 'une-ville.mp3',
            answer: 'une ville'
        },
        {
            src: 'une-voiture.mp3',
            answer: 'une voiture'
        },
        {
            src: 'voici.mp3',
            answer: 'voici'
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
        },
    ]
};