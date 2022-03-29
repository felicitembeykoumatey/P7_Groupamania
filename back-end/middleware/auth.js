// Pour la sécurité
const jwt = require("jsonwebtoken");// récupérer jwt pour vérifier les tokens

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
require("dotenv").config(); //Cacher les mots de passe des utilisateurs.


  // pour gérer les problèmes, on utilise un bloc try, et catch
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupérer le token dans le header authorization (qui se trouve après "bearer_")
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN); // Décoder le token avec la fonction "verify" de jwt (vérifier le token par rapport à notre clé secrète)
    const userId = decodedToken.userId; //Récupérer  userId qui est dans l'objet decodedToken (constance decodedToken)
    if (req.body.userId && req.body.userId !== userId) { /// si on a un userId dans le body et qu'il est différent de celui du token, on retourne une erreur//
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide!"),
    });
  }
};