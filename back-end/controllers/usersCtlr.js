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
        .then(res.status(201).json({ message: " Bravo compte crée  !" }))
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
  console.log("loginEmail:", loginEmail);
  console.log("loginPassword:", loginPassword);
  User.findOne({ where: { email: loginEmail } })
    .then((user) => {
      console.log("userdgsfhgjhk:", user);
      if (user == null) {
        return res
          .status(401)
          .json({ message: "Utilisateur non trouvé !", error: error.message });
      }

      bcrypt.compare(loginPassword, user.password).then((valid) => {
        console.log("user.password :", user.password);
        console.log("valid :", valid);
        if (valid == false) {
          // Si le mot de passe n'est pas le bon
          console.log("egrsgreg :");
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
      });

      res.status(200).json({
        userId: user.id,
        isAdmin: user.isAdmin,
        sex: user.sex,

        token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Profil d'un utilisateur connecté!

exports.profilUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;
  User.findOne({
    attributes: ["userId", "email", "username", "isAdmin"],
    where: { id: id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};
