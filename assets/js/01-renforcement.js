// -- Déclarer un tableau numérique
const Prenoms = ["Hugo", "David", "Farid", "Justine", "khalid"];

// -- Aperçu dans la console
console.log(Prenoms);

// -- Si je veux connaitre le nombre d'éléments (Prénoms) de mon tableau ?
let nombreElementsDansMonTableau = Prenoms.length;
console.log(nombreElementsDansMonTableau);

// -- pour récupérer une valeur dans le tableau numérique j'utilise son indice (index)
console.log( Prenoms[1]); //David
console.log( Prenoms[3]); // Justine

let i = 2;
console.log( Prenoms[i] ); // Farid

for(let i = 0 ; i < nombreElementsDansMonTableau ; i++ /* let i = nombreElementsDansMonTableau ; i--
    Pour faire une boucle plus rapide on fait en sens inverse, notamment pour les grands tableaux. AUSSI
     le fait d'utiliser 'nombreElementsDansMonTableau' est plus rapide que 'Prenoms.length' car avec ce 
    dernier, à chaque passage de la boucle il faut récompter tous les éléments du tableau */){

    // Tout ce qui est à l'intérieur des accolades, sera dans la boucle

    console.log( 'Ici, i = ' + i );
    console.log( Prenoms[i] );
    console.log( '---' );

} // Fin de la boucle

// -- Voyons maintenant, comment procéder avec des objets

const Contact = {
    // INDICE : VALEUR
    prenom : "Saadatou",
    nom : "ALI",
    tel : "09.XX.XX.XX.XX"
};

// --  Aperçu dans la console
console.log( Contact);

// -- Pour récuperer les valeurs d'un objet, j'utilise le "." suivi de l'indice ou bien
console.log( "Prenom : " + Contact.prenom );
console.log( "nom : " + Contact.nom );
console.log( "tel : " + Contact['tel'] ); // -- Autre possibilité

const Contacts = [
    "Zita",
    "Hugo",
    {
        prenom : "Saadatou",
        nom : "ALI",
        age : 99
    },

    {
        prenom : "Jean-luc",
        nom : "X",
        age : 199
    },

    {
        prenom : "Stevenson",
        nom : "X",
        age : 300
    },

]

// --  Aperçu dans la console
console.log( Contacts );

// -- Comment accéder aux valeurs de mon objet, dans le tableau numérique

// -- 1. D'abord,  je recupère mon objet
console.log( Contacts[2]);

// -- 2. Pour acceder aux valeurs
console.clear();
console.log( " Je m'appelle " + Contacts[4]['prenom'] + " " + " et j'ai " + Contacts[4].age + " " + "ans");

/* -- En résumé, j'accède à la valeur de l'indice "prenom" de 
l'objet situé à l'index 2 de mon tableau numérique "Contacts".*/

// -- Comment parcourir un tableau avec des objets.
// -- Partons du tableau suivant

const Etudiants = [
    {prenom: "Hugo", nom: "LIEGEARD", competence: "Fullstack"},
    {prenom: "David", nom: "GUERRA", competence: "Front"},
    {prenom: "Rachid", nom: "KAMAN", competence: "Back"},
    {prenom: "Zita", nom: "NGUYEN", competence: "Fullstack"},
    {prenom: "Thomas", nom: "CHEYLAS", competence: "Front"},
    {prenom: "Assam", nom: "AHMAD", competence: "Front"},
]

// -- regardons dans la console
console.log( Etudiants );

// -- Si je veux connaitre le nombre d'étudiants
const nombreEtudiants = Etudiants.length;
console.log("Nombre d'étudiants = " + nombreEtudiants);

/* ------------------------------------------------------
    |       ~ ~ ~ ~    💀  EXERCICE 😜     ~ ~ ~ ~          |
    |                                                        |  
    |                                                        |  
    |  Affichez dans la page HTML à l'aide de jQuery la      | 
    |  liste (ul>li) des Etudiants et leur classe.           | 
    |                                                        | 
    |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _  */
console.clear();

// -- Utiliser jquery
 // jQuery(document).ready(function(){.............});
 // $(document).ready(function(){..................});
 // OU

 $(function(){

    // Ici, jQuery est prêt à travailler !
     
    // Création d'une balise <ul></ul>
    const ul = $('<ul>');

    for(let i = 0 ; i < nombreEtudiants ; i++ ){

        // -- Je récupère l'étudiant en cours dans ma boucle
        let Etudiant = Etudiants[i];

        // Aperçu dans la console
        console.log( Etudiant );

        /* On peut faire `` et mettre un seul <li></li> au lieu de plusieurs 
        $('<li>' + Etudiant.prenom + '</li>')
        Aussi, seulement dans``, on peut pour concatener faire "${" au lieu du "+"  
        et ça prend egalement les sauts de ligne sans problème*/

        $(`
            <li>
                <strong> ${Etudiant.prenom} ${Etudiant.nom} </strong>
                : ${Etudiant.competence}
            </li>
        `).appendTo( ul );
    } // Fin de la boucle for

    ul.appendTo( $('body'));

 });
 

    

