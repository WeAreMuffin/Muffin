/*
 * send_data.js
 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
function send_data(data, type) {
    switch (type) {
        case "login" :
            console.log("Envoi des donnees cryptees...");
            $.post("valid_connection.php", data, function(ans) {
                console.log("Donnees envoyees.");
                if (ans != "" && ans !== undefined) {
                    $(".form").append('<div><br>Resultat du decryptage serveur:<br>' + ans + '</div>');
                    console.log("End");
                }
                else
                    console.log("Error aucun reponse du serveur");
            });
    }
}
