// Pour la sécurité
const jwt = require("jsonwebtoken"); // récupérer jwt pour vérifier les tokens

// pour gérer les problèmes, on utilise un bloc try, et catch
module.exports = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupérer le token dans le header authorization (qui se trouve après "bearer_")
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Décoder le token avec la fonction "verify" de jwt (vérifier le token par rapport à notre clé secrète)
    const userId = decodedToken.userId; //Récupérer  users_id qui est dans l'objet decodedToken (constance decodedToken)
    if (req.body.userId && req.body.userId !== userId) {
      /// si on a un usersId dans le body et qu'il est différent de celui du token, on retourne une erreur//
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
