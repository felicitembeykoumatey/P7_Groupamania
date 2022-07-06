//Utilisation des dépendances 
const bcrypt = require("bcrypt"); // Récupérer bycrypt
const jwt = require("jsonwebtoken"); // Token
const validator = require("validator"); //validator

// base des données
const db = require("../models/database");
const User = db.users;

// const REGEX controle champs du formulaire inscription

//Email (cf emailregex.com)
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Mot-de-passe (cf regexlib.com)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Au moins une majuscule, un chiffre. Minimum 8 caractères.

//Requête s'inscrire //

exports.signup = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const grade = req.body.grade;
  const email = req.body.email;
  const password = req.body.password;
  const sex = req.body.sex;
  if (
    firstname == "" ||
    lastname == "" ||
    username == "" ||
    grade == "" ||
    email == "" ||
    password == "" ||
    sex == ""
  ) {
    res.status(401).json({
      message: "Vous n'avez pas rempli tous les champs obligatoires.",
    });
  }
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "email invalide" });
  }
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum.)",
    });
  } else if (!validator.isEmail(email)) {
    res.status(401).json({ message: "l'adresse email invalide" });
  } else {
    //Mot de passe haché
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = {
          firstname: firstname,
          lastname: lastname,
          username: username,
          grade: grade,
          email: email,
          password: hash,
          sex: sex,
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
  }
};

//Connexion
exports.login = (req, res) => {
  // Récupération et validation email et password
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  User.findOne({ where: { email: loginEmail } })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(loginPassword, user.password).then((valid) => {
        if (valid == false) {
          // Si le mot de passe n'est pas le bon
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        } else {
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            sex: user.sex,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        }
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Profil d'un utilisateur connecté!
exports.profilUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  User.findOne({
    attributes: [
      "id",
      "email",
      "lastname",
      "firstname",
      "username",
      "isAdmin",
      "sex",
      "grade",
    ],
    where: { id: userId },
  })

    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
};

//Tous les profils
exports.allProfilUser = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "username", "isAdmin", "sex", "grade"],
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Afficher un utilisateur
exports.oneProfilUser = (req, res) => {
  User.findOne({
    attributes: ["id", "email", "username", "lastname", "firstname", "isAdmin"],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Recupérer un utilisateur par son id
exports.profilUserById = (req, res) => {
  User.findOne({
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "grade",
      "sex",
      "email",
      "isAdmin",
    ],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
};

//L'utilisateur change lui même son mot de passe
exports.editPassword = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const newPassword = req.body.password;
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;

  if (!passwordRegex.test(newPassword)) {
    res.status(400).json({
      message:
        "Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum.)",
    });
  } else
    User.findOne({ where: { id: userId, username: username } }).then((user) => {
      if (user) {
        bcrypt.compare(oldPassword, user.password).then((valid) => {
          if (valid == false) {
            // Si le mot de passe n'est pas le bon
            res.status(401).json({ message: "Mot de passe incorrect !" });
          } else {
            bcrypt.hash(newPassword, 10).then((hash) => {
              const updatePassword = {
                password: hash,
              };
              user.update(updatePassword).then(() => {
                res.status(200).json({
                  message: "Votre mot de passe a été modifié avec succès !",
                });
              });
            });
          }
        });
      } else {
        res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
    });
};
//L'utilisateur modifie ses données
exports.modifyUserData = (req, res) => {
  const updateUserData = {
    username: req.body.username,
    email: req.body.email,
    grade: req.body.grade,
  };
  const id = req.body.id;
  User.update(updateUserData, { where: { id: id } }).then(() => {
    res.status(200).json({
      message: "Vos données ont été modifiés avec succès!",
    });
  });
};

//Administrateur modifie les données des utilisateurs
exports.modifyUserDataByAdmin = (req, res) => {
  const updateData = {
    username: req.body.username,
    email: req.body.email,
    grade: req.body.grade,
  };


  User.update(updateData, { where: { id: req.body.id } }).then((user) => {
    res.status(200).json({
      message: "Les informations ont  été modifiés avec succès!",
    })
    .catch((error) => res.status(500).json({ error: error.message }));
  });
};

//Administrateur Modifie les données d'utilisateur
exports.updateUserRole = (req, res) => {
  const id = req.body.userId;
  const isAdmin = req.body.isAdmin;
  if (isAdmin == "true") {
    User.update({ isAdmin: "0" }, { where: { id: id } }).then(function () {
      res.status(201).json(0);
    });
  } else {
    User.update({ isAdmin: "1" }, { where: { id: id } }).then(function () {
      res.status(201).json(1);
    });
  }
};

// l'utilisateur courant  modifie son propre mot de passe!
exports.modifyPassword = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const updatePassword = {
      password: hash,
    };
    if (!passwordRegex.test(req.body.password)) {
      res.status(400).json({
        message:
          "Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum.",
      });
    } else
      User.update(updatePassword, {
        where: { id: req.body.id, username: req.body.username },
      }).then(() => {
        res.status(200).json({
          message: "Votre mot de passe a été modifié avec succès !",
        });
      });
  });
};

// Supprimer le compte
exports.deleteProfil = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Ce compte a bien été supprimé ! " }))
    .catch((error) => res.status(400).json({ error: error.message }));
};
