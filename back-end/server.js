const http = require('http'); // récupérer le package http de node.js
const app = require('./app'); // récupérer l'application express


// création du serveur (passage de l'application express au serveur)
const server = http.createServer(app);


// configuration du serveur sur le port (3000).
server.listen(process.env.PORT || 3000); 

//REMARQUE : Pas besoin d'installer et charger le package normalize-port. 
//Je n'ai pas besoin de cette fonction normalizePort car je fournie moi même  le port à la variable d'environnement.
//Le port sera toujours un nombre.Alors que cette fonction exécute parseInt qui convertit essentiellement la valeur en entier, si possible
// Elle vérifie si la valeur n'est pas un nombre et si c'est une valeur de port valide.
