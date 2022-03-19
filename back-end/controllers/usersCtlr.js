const bcrypt = require('bcrypt'); // Récupérer bycrypt
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken'); // Récupérer de JWT
const xss = require('xss');
//const User= require ('../models/user');// on a besoin de notre modèle
const db = require('../models/database');
const User = db.users

const schemaPassValid = new passwordValidator();
//const maskData = require('maskdata');
schemaPassValid
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

//Requête signup (s'inscrire)//
exports.signup = (req, res, next) => {
  if (!schemaPassValid.validate(req.body.password)) {
    res.status(401).json({message:"Sécurité du mot de passe faible. Il doit contenir au moins 8 caractères, des majuscules et deux chiffres"})
  }
  //mot de passe haché et email masqué
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
         firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        function: req.body.function,
        email: xss(req.body.email),
        password: hash,
        sex: xss(req.body.sex),
        isAdmin:xss(req.body.isAdmin)
      };
      // Création d'utlisateur
  
      User.create(user)
        .then(data =>  res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error =>
          res.status(400).json({
            message: "Mauvaise requête", error : error.message}));
    })
    .catch(error => res.status(500).json({ message :'impossible de créer votre compte', error : error.message }));
};

//Requête login (se connecter)

exports.login = (req, res) => {
  
  const loginEmail = xss(req.body.email)
  const loginPassword = req.body.password
  
  User.findAll({where:{email: loginEmail}})
    if (!schemaPassValid.validate(req.body.password)) {
    res.status(401).json({message:"Sécurité du mot de passe faible. Il doit contenir au moins 8 caractères, des majuscules et deux chiffres"})
  }
  //mot de passe haché et email masqué
  bcrypt.hash(req.body.password, 10)
   .then(hash => {
  const user = {
    email: xss(req.body.email),
    password: hash,
  };
  if (!user) {
    return res.status(401).json({ message: 'Utilisateur non trouvé !', error : error.message  });
  }
  bcrypt.compare(loginPassword, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      
      res.status(200).json({
        userId: user.id,
        token: jwt.sign({ userId: user.id }, process.env.KEY_TOKEN, {
          expiresIn: "24h",
        }),
      });
    })
   })
    .catch((error) => res.status(500).json({ error: error.message }));
};
    

