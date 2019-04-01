function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$(function() {
    
    $('#formulaire').submit(function(event) {  // ON peut aussi faire on('submit')
        
        event.preventDefault();
        
        $('#formulaire .is-invalid').removeClass('is-invalid');
        $('#formulaire .alert-danger').remove();
        
        let nom     = $('#formulaire input[name="email"]');
        let prenom  = $('#formulaire input[name="prenom"]');
        let email   = $('#formulaire input[name="nom"]');
        
        // -- Validation du Nom
        if( nom.val().length === 0 ) {
            nom.addClass('is-invalid');
        }
        // -- Validation du Prénom
        if( prenom.val().length === 0 ) {
            prenom.addClass('is-invalid');
        }
        /*// -- Validation du Mail
        if( !validateEmail( email.val() ) ) {
            email.addClass('is-invalid');
        }*/ //On va faire en dans la newsletter.php
    
        if( $(this).find('.is-invalid').length === 0 ) {
            $(this).replaceWith(`
                <div class="alert alert-success" role="alert">
                    Votre inscription a bien ete prise en compte.
                    Veuillez verifier vos mails
                </div>
            `);

            //console.log($(this).serialize()); // serialize va transformer en chaine, les données

            $.ajax({
                    type : $(this).attr('method'), // Le type de ma requête dépend de ma methode d mon formulaire
                    url : $(this).attr('action'), // Le fichier qui s'occcupera du traitement de la requete AJAX
                    data : $(this).serialize(), // On recupère les données et on les serialize pour PHP = permet de formater les données pour les envoyer en php
                    dataType : 'JSON', 
                    timeout : 5000, //Le nombre de secondes où $.ajax attendra une réponse du serveur
                })
                  .done( function(resultat){ //
                   // console.log( resultat.success);

                    if(resultat.success){
                    // Si j'ai un retour positif de mon fichier PHP, j'affiche un message de success
                        $('"formulaire').replaceWith(`
                            <div class="alert alert-success">
                                Merci, votre message a bien été ajouté.<br>
                                <u>A très vite dans notre prochaine newsletter! </u> </div>
                        `);

                    }else{
                        // sinon, il y a un probleme, nous allons vérifier d'où viens le soucis

                        // a. email deja present dans la base
                        if(resultat.errors.isEmailInDb){

                            $('#formulaire').prepend(`
                            <div class="alert alert-danger">
                                Attention, l'email existe déja dans nos contacts
                            </div>       
                        `);

                        email.addClass('is-invalid');
                        (`
                            <div class="invalid-feedback">
                                Cet email existe déja 
                            </div>       
                        `).appendTo( email.parent());

                        $('#formulaire').get(0).reset();

                        }

                        // b. Email est invalid
                        if(resultat.errors.isEmailInvalid){

                        }

                        // c. Email est vide
                        if(resultat.errors.isEmailEmpty){

                        }
                    }

                  }); 

        } else {
            $(this).prepend(`
                <div class="alert alert-danger" role="alert"> 
                    Erreur, veuillez vérifier vos informations.
                </div>
            `);
        }
    });
});