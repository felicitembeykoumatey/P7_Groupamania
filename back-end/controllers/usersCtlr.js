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
        grade: req.body.grade,
        email: xss(req.body.email),
        password: hash,
        sex: xss(req.body.sex),
         isAdmin : 0
       // isAdmin:xss(req.body.isAdmin)
      };
      console.log(req.body)
      // Création d'utlisateur
  
      User.create(user)
        .then(data =>  res.status(201).json({ message: ' Bravo compte crée  !' }))
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
    
//Profil d'un utilisateur 
exports.userProfil = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
 // console.log(headerAuth);
  const id = utils.getUserId(headerAuth);

  console.log(id);
  //let userId = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin", "attachementuser"], //les éléments que l'on souhaite afficher
    where: { id: id }, // récupère les infos grâce l'user id précisé dans le token
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};


//Afficher tous ls profils 
exports.allProfiluser = (req, res, next) => {
  models.User.findAll({
    include: [
      //inclu la relation direct avec la table  posts
      {
        model: models.Post,
        attributes: ["id"], //on ne veut afficher que l'id
      },
    ],
  })
    .then((found) => {
      res.status(200).json({ found });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


// Suppression utilisateur



exports.deleteProfile = (req, res) => {
  //récupération de l'id de l'user dans le token
  let headerAuth = req.headers["authorization"];
  let userId = utils.getUserId(headerAuth);
  if (userId != null) {
    //on vérfite si il y a bien un id
    models.User.findOne({
      where: { id: userId }, //on compare l'id reçu à celui dans la base de donnée
    }).then((user) => {
      if (user != null) {
        //si l'utilisateur a était correctement identifié
  models.Post.findAll({
  where : { userId:user.id}
}).then ((postes) => {
  postes.forEach((post) => {
    const postId = post.id;
    models.Comment.destroy({
      where: { postId:postId }
    });
  });
}),

        
        models.Post.destroy({ //supprime les messages posté par la personne connecté
          where: { userId: user.id },
        })
          .then(() => {
            //Suppression de l'utilisateur
            models.User.destroy({
              //on supprime l'utilisateur trouvé dans la BDD
              where: { id: user.id },
            })
              .then(() => res.end()) //arrêt de la response sans fournir de donnée
              .catch((error) => console.log(error));
          })
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(401).json({ error: "Cet user n'existe pas" });
      }
    });
  } else {
    res.status(500).json({
      error: "Impossible de supprimer ce compte",
    });
  }
};
