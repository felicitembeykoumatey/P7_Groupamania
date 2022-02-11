const bcrypt = require('bcrypt'); // Récupérer bycrypt
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken'); // Récupérer de JWT
const xss = require('xss');
//const db = require('../database'); 
const User= require ('../models/user');// on a besoin de notre modèle
 

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
        username: (req.body.username),
        email: xss(req.body.email),
        password: hash,
        sex: xss(req.body.sex),
        roleId : 1
      };
     
      // Création d'utlisateur
  
          User.create(user)
          .then((data ) =>  res.status(201).json({ message: 'Utilisateur créé !' }))

      
        .catch((error) =>
          res.status(400).json({
            message: "l'adresse mail existe déjà", error : error.message 
          })
        );
    })
  
    .catch(error => res.status(500).json({ message :'impossible de créer votre compte', error : error.message }));
  
};

//Requête login (se connecter)
exports.login = (req, res, ) => {

  const loginEmail = xss(req.body.email) 
  const loginPassword = req.body.password
  //db.User.findOne({ email: maskdata.maskEmail2(req.body.email)})
  User.findAll({where:{email: loginEmail}})
    .then(user => {
      if (!user) { 
        return res.status(401).json({ message: 'Utilisateur non trouvé !', error : error.message  });
      }
    
        bcrypt.compare(loginPassword, user[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } res.status(200).json({
            userId: user[0].id,
            roleId: user[0].roleId,
            sex: user[0].sex,
            image:user[0].image,
            token: jwt.sign(
              { userId: user[0].id, roleId: user[0].roleId },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error : error.message  }));
    })
    .catch(error => res.status(500).json({ error : error.message  }));
};