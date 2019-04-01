<?php

/* Ce fichier php, doit communiquer avec JS, 
donc il n'a pas vocation à afficher quoi que ce soit
à l'utilisateur */

try {

    $db = new PDO(
        'mysql:host=localhost;dbname=newsletter',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

} catch(Exception $erreur) {
    echo 'Echec de connexion : ' . $erreur->getMessage();
    exit; // Arrêt du script en cas d'erreur de connexion à la BDD.
}

/*
    Pour communiquer  avec la page html /JS; PHP doit retourner 
    une réponse au format JSON par exemple
*/

#On déclare que notre fichier va renvoyer du JSON
#Pas obligatoire............
header('Content-Type: application/json');

if ( !empty( $_POST )){

    #Récuperation des données POST
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];

    #Vérification des données soumises par l'utilisateur
    $errors = [];

    #Vérification du mail
    if( !empty( $email ) ){

        #Si mon email n'est pas vide, alors je vérifie qu'il est
        #au bon format, qu'il est valide
        if( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ){
            
            # Si l'émail saisi par l'utilisateur n'est pas au bon
            #format, alors je dois retourner une erreur
            $errors['isEmailEmpty'] = true;

        }else {
            # Mon email est valide, je vérifie dans la BDD s'il n'est pas déjà présent

            # Je compte dans ma base le nombre d'email coorespondant à l'émail saisi 
            # par l'utilisateur dans le formulaire
            $query = $db->prepare(' 
                    SELECT COUNT(id) 
                        FROM contact 
                            WHERE email_contact = :email');

            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();

            $isEmailInDb = $query->fetchColumn();

            if( $isEmailInDb ){

                # Dans cette condition, $isEmailInDb retourne 1, 
                #soit true. Autrement dit, cet email existe déjà dans la base
            
                $errors['isEmailInDb'] = true;
            }else {
                /* Sinon, l'adresse email de mon utilisateur n'est pas deja
                presente dans la BDD. Je peux procéder à l'insertion*/

                $query = $db->prepare('
                                INSERT INTO contact (prenom_contact, nom_contact, email_contact)
                                VALUES (:prenom, :nom, :email)
                ');

                $query->bindValue(':prenom', $prenom, PDO::PARAM_STR);
                $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                $query->bindValue(':email', $email, PDO::PARAM_STR);
                $query->execute();
            }
        }
    }else {

        #Sinon, l'email est vide, je dois retourner une erreur
        $errors['isEmailEmpty'] = true;
    } // Fin du !empty($email)

    #Une fois que le traitement est terminé, on va faire un retour à l'application
    if( empty($errors )){
        # Tout s'est bien passé, je retourne une réponse à newsletter.js
        echo json_encode(['success' => true]);
    }else{

        #Sinon, il y a eu dees erreurs, je retourne mon tableau d'erreurs
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
    }
}else{// Fin du !empty($_POST)
    
    #Ici, aucune donnée n'a été soumise vis POST
    # $_POST est vide...  
}
