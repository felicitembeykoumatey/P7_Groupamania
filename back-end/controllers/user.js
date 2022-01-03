const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const db = require("../models/user")
const User = db.user

const schemaPassValid = new passwordValidator();
//Ajout propriétés Schema
schemaPassValid
.is().min(8)
.is().max(50)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

// Validatin par rapport à une chaîne de mot de passe//
console.log(schemaPassValid.validate ('validPASS123'));
//=> true
console.log(schemaPassValid.validate('invalidPASS'));
//=> false

// Requête Signup (inscription)//

exports.signup = (req, res, next) => {
  
    if (!schemaPassValid.validate(req.body.password)) {
    return res.status(401).json({ error: 'Mot de passe faible! Saisisez minimum 8 caractères' })
   }

  // Initialisation du nouveau utilisateur 
  // Mot de passe haché
     bcrypt.hash(req.body.password, 10)
      .then(hash => {
      const user = {
        username: xss(req.body.username),
        sex: xss(req.body.sex),
        email: xss(req.body.email),
        password: hash,
        isAdmin : 0
      };

      // création utilisateur 
 db.User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }));
         })
        .catch(error => res.status(400).json({ message: 'erreur' }));
    })
    .catch(error => res.status(500).json({ message: 'Problème serveur!' }));
};
        
  



// requete login (connexion)
exports.login = (req, res) => {
db.User.findOne ({
email: req.body.email
})
 .then(user => {
 if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {

          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user[0].id,
            sex: user[0].sex,
            image:user[0].image,
            token: jwt.sign(
              { userId: user._id },
              'KEY_TOKEN',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};