let questions = [
    {   question: "Qu'est-ce que le sushi ?",
        choix: ['<img src="media/0/Asushi.png">', '<img src="media/0/Bspag.png">'],
        reponseCorrecte: 0,
    },
    {   question: "Qu'est-ce que le ceviche ?",
        choix: ['<img src="media/1/Aceviche.png">', '<img src="media/1/Bsalade.png">'],
        reponseCorrecte: 0,
    },
    {   question: " Qu'est-ce que la poutine ?",
        choix: ['<img src="media/2/Apoutine.png">', '<img src="media/2/Bsoupe.png">'],
        reponseCorrecte: 0,
    },
    {   question: "Qu'est-ce que la bouillabaisse ?",
        choix: ['<img src="media/3/Abouilla.png">', '<img src="media/3/Bviande.png">'],
        reponseCorrecte: 0,
    },
    {   question: "Qu'est-ce que le hamburger ?",
        choix: ['<img src="media/4/Aburger.png">', '<img src="media/4/Bsandwich.png">'],
        reponseCorrecte: 0,
    },
    {   question: "Quelle pâte est utilisée pour préparer un croissant ?",
        choix: ['<img src="media/5/Apatebris.png">', '<img src="media/5/Bpatefeuille.png">'],
        reponseCorrecte: 1,
    },
];


let audio = {
    musiqueFond: new Audio('media/musique-quizzine.mp3'), //Son de fond du quiz
    sonCorrect: new Audio ('media/reponseCorrecte.mp3'),
    sonFaux: new Audio ('media/reponseFausse.wav'),
    sonAttente: new Audio ('media/buzz-roll.mp3')
};

let numeroQuestion = localStorage.getItem('sauvegarde');


let largeurX = 100;

let bonneReponse = 0; // Nombre de bonnes reponses

// Partie Intro du Quiz
let intro = document.querySelector(".intro");
let titreIntro = document.querySelector(".sectionIntro"); // Le titre
let footer = document.querySelector("footer"); // La partie ou l'utilisateur peut cliquer pour commencer le jeu
// Partie Quiz
let quiz = document.querySelector(".quizzine");
let section = document.querySelector("section"); // Section ou se deroule le quiz
let questionPosee = document.querySelector(".questions"); // Les questions du quiz
let lesChoix = document.querySelector(".choix"); // Les differents choix
let leMinuteur = document.querySelector(".barre-de-temps"); // Le minuteur
//Partie fin du Quiz
let finQuiz = document.querySelector(".finQuiz");
let recommencerBouton = document.querySelector(".recommencer"); // Bouton qui permet de recommencer le quiz
// Le curseur du quiz
let curseur = document.querySelector(".curseur");
//Le root qui contient tous les valeurs qui se répète
let root = document.querySelector(":root");
// L'assiette qui peut à la fois indiquer la bonne ou la mauvaise reponse, et montrer le score
let assiette = document.querySelector(".assiette");
// Classe unique de la réponse non choisie
let reponseNonChoisieClass;



// Appelle gerer
gererCurseur();
//Si le media permet une souris, ça active la souris personnalisé, sinon, elle est désactivé
function gererCurseur() {
    curseur = document.querySelector(".curseur");
    if (window.matchMedia("( hover: hover )").matches) {
    document.querySelector("html").style.cursor = "none";
    document.addEventListener("mousemove", animerCurseur);
    } else {
    document.querySelector("html").style.cursor = "auto";
    curseur.style.display = "none";
    }
}
// Appelle animer Curseur quand l'utilisateur bouge sa souris
document.addEventListener("mousemove", animerCurseur);
//Change la propriété de root, afin de changer dynamiquement l'emplacement de la souris dans l'écran
function animerCurseur(event) {
    root.style.setProperty("--mouse-x", event.clientX + "px");
    root.style.setProperty("--mouse-y", event.clientY + "px");
}
// Quand l'animation du titre finit, l'utilisateur peut cliquer pour commencer le quiz
titreIntro.addEventListener("animationend", permettreDebutDuQuiz);
function permettreDebutDuQuiz(event) {
    if (event.animationName == "bounce-continue") {
        window.addEventListener("click", commencerQuizzine);
        footer.innerHTML = "<h1>Clique ici pour commencer le Quizzine :D</h1>";
    }
}
// Si l'utilisateur clique sur le footer donc là ou y'a le message de commencer, le quiz commence
function commencerQuizzine(event) {
    if (event.target.closest("footer")) {
        debutQuizzine();
    }
}
// Désactive la partie Intro pour activer celle de Quiz, commence la musique de fond, et active l'assiette
// enfin, affiche les questions et commence le minuteur
function debutQuizzine() {
    window.removeEventListener("click", debutQuizzine);
    intro.style.display = "none";
    quiz.style.display = "flex";
    assiette.style.display = "initial";
    audio.musiqueFond.volume -= 0.8;
    audio.musiqueFond.play();   
    commencerQuestion();
    minuteur();
}
// Affiche les questions 
function commencerQuestion() {
    // Si le numeroQuestion est null ou equivaut a 6, remet le numeroQuestion a 0,
    // sinon il équivaut à la valeur de la clé sauvegarde en nombre
    if (numeroQuestion == null ) {
        numeroQuestion = 0;
    } 
    else if (numeroQuestion == 6){
        recommencerLeQuiz();
    }
    else {
        numeroQuestion = Number(localStorage.getItem('sauvegarde'));
    }
    //Si les choix ont la class pasDeClic, ça l'enlève, sinon, ça fait rien
    if (lesChoix.classList.contains('pasDeClic')) {
        lesChoix.classList.remove('pasDeClic');
    }
    // Enlève toutes les classes changeant la couleur de l'Assiette, et la question
    questionPosee.classList.remove("question-correcte");
    questionPosee.classList.remove("question-fausse");
    assiette.classList.remove("assietteRouge");
    assiette.classList.remove("assietteVerte");
    // Change le background du quiz selon le numero de la question
    quiz.style.backgroundImage = `url(media/${numeroQuestion}/fond.gif)`;
    // Nomme une variable question actuelle, et lui donne la valeur de la question ayant l'ordre de numeroQuestion du tableau questions
    let questionActuelle = questions[numeroQuestion];
    // Met le texte de la question du tableau, dans la question dans l'HTML
    questionPosee.innerText = questionActuelle.question;
    // Vide lesChoix, pour les remplacer par d'autre
    lesChoix.innerHTML = "";
    //Change la couleur de fond et de texte selon le numéro de la question à laquelle l'utilisateur est rendu
    if (numeroQuestion === 0) {root.style.setProperty("--couleur-texte", "rgb(139,70,42)"); root.style.setProperty("--couleur-fond", "rgb(230,232,173)")}
    if (numeroQuestion === 1) {root.style.setProperty("--couleur-texte", "rgb(52,134,102)"); root.style.setProperty("--couleur-fond", "rgb(169,174,229)")}
    if (numeroQuestion === 2) {root.style.setProperty("--couleur-texte", "white"); root.style.setProperty("--couleur-fond", "rgb(91,122,223)")}
    if (numeroQuestion === 3) {root.style.setProperty("--couleur-texte", "rgb(254,223,183)"); root.style.setProperty("--couleur-fond", "rgb(178,126,243)")}
    if (numeroQuestion === 4) {root.style.setProperty("--couleur-texte", "rgb(245,243,90)"); root.style.setProperty("--couleur-fond", "rgb(90,123,245)")}
    if (numeroQuestion === 5) {root.style.setProperty("--couleur-texte", "rgb(136,141,244)"); root.style.setProperty("--couleur-fond", "rgb(227,157,245)")}
    // Crée 2 choix, vu que le length des choix dans le tableau est de 2, chaque choix est un div dans lequel on met l'image
    // du choix en question selon quel question on vise dans le tableau, on lui donne un index et on lui ajoute une classe unChoix,
    // donne la classe premierChoix, si c'est le premier i, sinon donne le deuxième, le choix est lancé de l'html, est un eventlistener
    // est rajouté, afin de verifier la réponse une fois cliquée
    let leChoix;
    for (let i = 0; i < questionActuelle.choix.length; i++) {
        leChoix = document.createElement("div");
        leChoix.innerHTML = questionActuelle.choix[i];

        leChoix.indexChoix = i;
        leChoix.classList.add("unChoix");
        if (i === 0) {
            leChoix.classList.add("premierChoix");
        } else if (i === 1) {
            leChoix.classList.add("deuxiemeChoix");
        }
        lesChoix.append(leChoix);
        leChoix.addEventListener("mousedown", verificationReponse);
    }
    //Positionne le titre et les choix hors du viewport, puis appelle les fonctions qui les animent
    positionXtitre = 100;
    requestAnimationFrame(animerTitre);
    positionYchoix = 100;
    requestAnimationFrame(animerChoix);
    
    
}

function verificationReponse(event) {

    // Enregistre la réponse choisie, augmente son scaling et enlève la possiblité de clic , joue le son d'attente de réponse
    let reponseChoisie = event.target.indexChoix;
    event.target.style.scale = "1.2";
    lesChoix.classList.add("pasDeClic");
    audio.sonAttente.play();
    // Si la réponse choisie est le premier choix, donne le deuxième, et vice versa
    if (reponseChoisie === 0) {
        reponseNonChoisieClass =".deuxiemeChoix";
    } else {
        reponseNonChoisieClass = ".premierChoix";
    }
    // Anime la réponse non choisie
    requestAnimationFrame(animerReponseNonChoisie);

    setTimeout(() => {
            //Après 2 secondes, vérifie si c'Est la bonne réponse ou pas, en comparant l'index de la réponse choisie
            // avec celui de la bonne réponse dans le tableau, si c'est bon, plusieurs classes sont ajoutés qui donneront une couleur
            // verte à l'assiette, le titre et la bulle, sinon ca sera en rouge, le bon son est joué, et si c'est bon
            // le nombre de bonne réponse est augmenté de 1
            if (reponseChoisie === questions[numeroQuestion].reponseCorrecte) {
                bonneReponse++;
                questionPosee.classList.add("question-correcte");
                assiette.classList.add("assietteVerte");
                event.target.classList.add("choixCorrect");
                audio.sonCorrect.play();
            } else {
                questionPosee.classList.add("question-fausse");
                assiette.classList.add("assietteRouge");
                event.target.classList.add("choixFaux");
                audio.sonFaux.play();
            }
    }, 2000);
    
    setTimeout(() => {
        // Après 3 secondes, stock un item sauvegarde, qui a comme valeur, la valeur de l'item valeur en nombre, + 1
        localStorage.setItem('sauvegarde', Number(localStorage.getItem('sauvegarde')) + 1)
        // Donne a numeroQuestion, la valeur en chiffre de sauvegarde
        numeroQuestion = Number(localStorage.getItem('sauvegarde'));
        // Dépendamment ou l'utilisateur est rendu, la prochaine question sera chargé, ou la fin du quiz
        if (numeroQuestion < questions.length) {
            commencerQuestion();
        } else {
            finDuQuizz();
        }
        
}, 3000);
}
// Anime le titre en baissant sa position en X de 0.5 jusqu'à 0, puis s'arrête
function animerTitre() {
    positionXtitre -= 0.5;
    questionPosee.style.transform = `translateX(${positionXtitre}vw)`;
    if (positionXtitre > 0) {
        requestAnimationFrame(animerTitre);
    }
}
// Anime les choix en baissant sa position en Y de 0.5 jusqu'à 0, puis s'arrête
function animerChoix() {
    positionYchoix -= 0.5;
    lesChoix.style.transform = `translateY(${positionYchoix}vw)`;
    if (positionYchoix > 0) {
        requestAnimationFrame(animerChoix);
    }
}
// À chaque iteration de l'animation du minuteur, appelle la fonction minuteur
leMinuteur.addEventListener("animationiteration", minuteur);
//Quand tous les iterations sont fini, la fin du quiz est appelés
leMinuteur.addEventListener("animationend", finDuQuizz);
// Baisse la largeur du minuteur de 0.1 à chaque fois que cette fonction est appelé, change ensuite le root de la fonction en question
function minuteur() {
    largeurX-=0.1;
    root.style.setProperty("--largeur", largeurX + "vw");
    verifiercouleur();
}
// Change la couleur de la barre selon la largeur de celle ci, allant du vert au rouge
function verifiercouleur() {
    if (largeurX <= 45 && largeurX > 20) {
        root.style.setProperty("--couleur-barre", "yellow");
    }
    else if (largeurX <= 20) {
        root.style.setProperty("--couleur-barre", "red");
    } else {
        root.style.setProperty("--couleur-barre", "rgb(107, 218, 107)");
    }
}
// Désactive la partie quiz pour laisser place à la partie de fin de Quiz, enlève toutes les classes de assiettes, et ajoute 
// la classe qui contient l'animation de la réponse dans l'assiette
function finDuQuizz() {
    localStorage.setItem('sauvegarde', 6);
    quiz.style.display = "none";
    finQuiz.style.display = "flex";
    assiette.className = '' ;
    assiette.classList.add("assietteReponse")
    // Quand l'animation fini appelle afficherScore
    assiette.addEventListener("animationend", afficherScore)
}
// Met le nombre de bonnes reponse sur le nombre de reponse total dans le root, met l'opacité du bouton à 1
// et met un eventlistener qui permet de recommencer le quiz une fois le bouton cliqué
function afficherScore() {
    root.style.setProperty('--scores', "'" + bonneReponse + " / 6'")
    recommencerBouton.style.opacity = "1";
    recommencerBouton.addEventListener("click", recommencerLeQuiz);
}
function recommencerLeQuiz() {
    // Enlève l'item sauvegarde et le donne comme valeur à numeroQuesiton
    localStorage.removeItem('sauvegarde');
    numeroQuestion = localStorage.getItem('sauvegarde');
    //Met le nombre de bonneReponse a 0, et la largeut du minuteur a 100
    bonneReponse = 0;
    largeurX = 100;
    // Enlève le score
    root.style.setProperty('--scores', "" );
    //Met l'opacité du bouton à 0
    recommencerBouton.style.opacity = "0";
    // Enlève la classe d'assietteReponse et met celle d'assiette normal à l'assiette
    assiette.classList.remove("assietteReponse");
    assiette.classList.add("assiette");
    // Enlève la partie fin du quiz pour mettre la partie Quiz
    quiz.style.display = "flex";
    finQuiz.style.display = "none";
    // Appelle commencerQuestion pour recommencer le Quiz
    commencerQuestion();
}
// Donne une classe qui réduit le scale à 0 pour la réponse non choisie
function animerReponseNonChoisie() {
    let reponseNonChoisie = document.querySelector(`${reponseNonChoisieClass}`);
    reponseNonChoisie.classList.add("nonChoisi");
}



