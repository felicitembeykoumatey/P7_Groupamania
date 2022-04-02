const bcrypt = require("bcrypt"); // Récupérer bycrypt

const jwt = require("jsonwebtoken"); // Récupérer de JWT
const xss = require("xss");
const db = require("../models/database");
const User = db.users;
// Importation pour utilisation des variables d'environnements.
//require("dotenv").config(); //Cacher les mots de passe des utilisateurs.


//Requête signup (s'inscrire)//

exports.signup = (req, res) => {
  
  //Mot de passe haché et email masqué
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        grade: req.body.grade,
        email: req.body.email,
        password: hash,
        sex: req.body.sex,
        isAdmin: 0,
      };

      // Création d'utlisateur

      User.create(user)
        .then((res) =>
          res.status(201).json({ message: " Bravo compte crée  !" })
        )
        .catch((error) =>
          res.status(400).json({
            message: "Mauvaise requête",
            error: error.message,
          })
        );
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Requête login (se connecter)
exports.login = (req, res) => {
  // Récupération et validation email et password
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  User.findOne({ where: { email: loginEmail } })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Utilisateur non trouvé !", error: error.message });
      }
      //mot de passe haché et email masqué
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = {
          email: xss(req.body.email),
          password: hash,
        };
      });

      bcrypt.compare(loginPassword, user.password).then((valid) => {
        if (!valid) {
          // Si le mot de passe n'est pas le bon
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
      });

      res.status(200).json({
        userId: user.id,

        token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });

      console.log(" user.id", user.id);
    })

    .catch((error) => res.status(500).json({ error: error.message }));
};
