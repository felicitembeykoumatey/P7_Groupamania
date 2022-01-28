const bcrypt = require('bcrypt'); // Récupérer bycrypt
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken'); // Récupérer de JWT
const xss = require('xss');
const dataBase = require('../database');
const db = require ('../models')
const User = db.user;
const schemaPassValid = new passwordValidator();

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
  bcrypt.hash(req.body.password, 10) // on hash le mot de passe (on exécute 10 fois l'algo pour crypter correctement le mot de passe)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        email: maskData.maskEmail2(req.body.email),
        password: hash,
     
      });
   // user crée
    User.create(user)
        .then(data => {
          res.status(201).json({ message: 'Utilisateur créé !' })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//Requête login (se connecter)
exports.login = (req, res, next) => {
  db.User.findOne({ email: maskData.maskEmail2(req.body.email)})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({  // Si comparaison ok, on renvoit un objet JSON contenant //
            userId: user._id,
            token: jwt.sign( //Un token - Fonction sign de JsonWebToken//
              { userId: user._id },  // 1er argument : données à encoder //
              'RANDOM_TOKEN_SECRET', // 2ème : clé secréte encodage //
              { expiresIn: '24h' }
            )
    
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
