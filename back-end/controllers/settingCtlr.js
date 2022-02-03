const xss = require ('xss');
const jwt = require('jsonwebtoken');
const db = require('../models/setting')
const bcrypt = require('bcrypt');
const Setting = db.users
const Post = db.posts
const fs = require('fs')


const schemaPassValid = new passwordValidator();

schemaPassValid
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

exports.getAllUsers = (req, res, next) => {
  Setting.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};



exports.getOneUserSetting = (req, res, next) => {
  const id = req.Settings.id;
  
  Setting.findByPk(id)
    .then((userSetting) => {
      res.status(200).json(userSetting);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.modifySetting = (req, res, next) =>{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId
  const id = req.Settings.id;
  const SettingObject = JSON.parse(req.body.content);
  
  const Setting = {
    username : xss(SettingObject.username),
    email : xss(SettingObject.email),
    biography : xss(SettingObject.biography)
  };
  
  if (req.file) {
    Setting.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Setting.findByPk(id)
    .then((user) => {
      if (userId === user.id) {
        if (req.file){
          if(user.image){
            const filename = user.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Setting.update(Setting, { where: { id: id }})
                .then(data => {
                  res.status(201).json({ message: 'Utilisateur modifié !', newImage: Setting.image})
                })
                .catch(error => res.status(500).json({ error }));
            });
          }else{
            Setting.update(Setting, { where: { id: id }})
              .then(data => {
                res.status(201).json({ message: 'Utilisateur modifié !', newImage: Setting.image})
              })
              .catch(error => res.status(500).json({ error }));
          }
        }
        
        else{
          Setting.update(Setting, { where: { id: id }})
            .then(data => {
              res.status(201).json({ message: 'Utilisateur modifié !' })
            })
            .catch(error => res.status(500).json({ error }));
        }
      }else{
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
      
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
//MODIFICATION MOT DE PASSE
exports.modifyPassword = (req, res, next) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId
  const id = req.Settings.id;
  const passwords = req.body
  const oldpassword = passwords.oldpassword
  const newpassword = passwords.newpassword
  
  
  Setting.findByPk(id)
    .then(user => {
      
      console.log(userId)
      console.log(user.id)
      
      if (userId === user.id) {
        
        bcrypt.compare(oldpassword, user.password)
          .then(valid => {
            
            
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe d'origine incorrect !" });
            }
            
            if (!schemaPassValid.validate(newpassword)) {
              return res.status(401).json({ error: 'Sécurité du mot de passe faible. Il doit contenir au moins 8 caractère, des majuscules et deux chiffres' })
            }
            
            
            bcrypt.hash(newpassword, 10)
              .then(hash => {
                const password = {
                  password : hash
                };
                
                
                Setting.update(password, { where: { id: id }})
                  .then(data => {
                    res.status(201).json({ message: 'Mot de passe modifié !' })
                  })
                  .catch(error => res.status(500).json({ error }));
                
              })
              .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
        
        
      }else{
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const roleId = decodedToken.roleId
  const userId = decodedToken.userId
  const id = req.Settings.id;
  
  
  if (roleId === 2 || userId == id) {
    
    
    Post.findAll({ where: { userId: id } })
      .then((posts) => {
        
        posts.forEach(post =>{
          
          if (post.image != "") {
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Post.destroy({ where: { id : post.id }})
                .catch(error => res.status(400).json({ error }));
            });
            
            
          }else{
            Post.destroy({ where: { id : post.id }})
              .catch(error => res.status(400).json({ error }));
          }
        })
        
        Setting.findByPk(id)
          .then((user) => {
            
            if (user.image != null) {
              const filename = user.image.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Setting.destroy({ where: { id : id }})
                  .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                  .catch(error => res.status(400).json({ error }));
              });
              
            }else{
              Setting.destroy({ where: { id : id }})
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
          })
          .catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
      })
      .catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    
  }else{
    res.status(401).json({
      error: new Error('requete invalide!')
    });
  }
};