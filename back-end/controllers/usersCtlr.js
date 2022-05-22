const bcrypt = require("bcrypt"); // Récupérer bycrypt
const jwt = require("jsonwebtoken"); // Récupérer de JWT
const { NULL } = require("node-sass");
const db = require("../models/database");
const User = db.users;
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
  // console.log("loginEmail", loginEmail);
  //console.log("loginPassword", loginPassword);
  User.findOne({ where: { email: loginEmail } })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(loginPassword, user.password).then((valid) => {
        if (valid == false) {
          // Si le mot de passe n'est pas le bon
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
  console.log("decodedToken :", decodedToken);
  const userId = decodedToken.userId;
  console.log("userId :", userId);
  User.findOne({
    attributes: ["id", "email", "username", "isAdmin", "sex", "grade"],
    where: { id: userId },
  })

    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};
//Tous les profils

exports.allProfilUser = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "username", "isAdmin", "sex", "grade"],
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

// Afficher un utilisateur
exports.oneProfilUser = (req, res) => {
  //console.log("userId :", userId);
  User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

// Recuperer un utilisateur par son id
exports.profilUserById = (req, res) => {
  User.findOne({
    attributes: ["id", "email", "username", "isAdmin", "sex", "grade"],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};
// Supprimer utilisateur
exports.deleteProfil = (req, res) => {
  console.log("req.params.id", req.params.id);
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Compte supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

//Modification de mot de passe
exports.modifyPassword = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const updatePassword = {
      password: hash,
    };

    //User.update( {username:username, grade:grade, email:email, password:password},{where: { id:id }}).then(function () {
    User.update(updatePassword, { where: { id: req.body.id } }).then(
      function () {
        console.log("j'ai reussi :");
      }
    );
  });
};

//Changer de mot de passe par l'utilisateur courant
exports.editPassword = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  console.log("decodedToken :", decodedToken);
  const userId = decodedToken.userId;
  console.log("userId :", userId);
  const newPassword = req.body.password;
  const oldPassword = req.body.oldPassword;
  //const loginUsername = req.body.username;
  //console.log(loginUsername)
  User.findOne({ where: { id: userId } }).then((user) => {
    if (user == null) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    console.log("newPassword : ", newPassword);
    console.log("user.password : ", user.password);

    bcrypt.compare(oldPassword, user.password).then((valid) => {
      if (valid == false) {
        console.log("j'ai echoué 123");
        // Si le mot de passe n'est pas le bon
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
         bcrypt.hash(newPassword, 10).then((hash) => {
    const updatePassword = {
      password: hash,
    };
        console.log("Je vais faire le changement de mdp");
        User.update(updatePassword, {
          where: { id: userId },
        }).then(function () {
          console.log("j'ai reussi :");
          console.log("User.password");
            return res.status(200).json({ msg: "j'ai reussi" });
          });
        });
      };
    });
  });
};
//Utilisateur Modifie ses données
exports.modifyUser = (req, res) => {
  const updateUserData = {
    username: req.body.username,
    email: req.body.email,
    grade: req.body.grade,
  };

  User.update(updateUserData, { where: { id: req.body.id } }).then(function () {
    //res.status(200).json();
  });
};

//Administrateur Modifie les données d'utilisateur
exports.updateUserRole = (req, res) => {
  console.log("req.body");

  const id = req.body.userId;
  const isAdmin = req.body.isAdmin;

  if (isAdmin == "true") {
    User.update({ isAdmin: "false" }, { where: { id: id } }).then(
      function () {}
    );
  } else {
    User.update({ isAdmin: "true" }, { where: { id: id } }).then(function () {
      // console.log("new isAdmin isAdmin", isAdmin);
      console.log("je suis ici 2");
    });
  }
};
