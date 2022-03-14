"use strict";
//Importation mySql pour la base de donnée.
//Connexion data base.
const Sequelize = require("sequelize"); //Récupérer sequelize.
//const Post = require ("./post"); // Model post
//const User = require ("./user"); // model user
//const Comment = require("./comment");
// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.
const path = require("path"); // Permettre de charger différents fichiers dans différents dossiers.

 ////Connecter l'API à ma base des données => Création d'un nouvel objet sequelize.
const sequelize = new Sequelize(`${process.env.DB_BDD}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,
 { 
  
    host: "localhost",// Par défaut, l'hôte est 'localhost'.
    dialect: "mysql" // base de données mysql.
});    


sequelize.sync() //ajouter  "sequelize.sync" qui me permet de créer une table.

// Vérification de la connexion à database grâce à la fonction authenticate.
sequelize.authenticate()
  .then(() => console.log('La connexion a été établie avec succès.'))
  .catch(error => console.log({ message :'impossible de se connecter', error : error.message }));// afficher message d'erreur.

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.users = require("./user")(sequelize,Sequelize); //faire comme pour ./post (avec module.exports)
db.users = require("./users")(sequelize,Sequelize);
db.posts = require("./posts")(sequelize,Sequelize);
db.comments = require("./comments")(sequelize,Sequelize);
db.likes = require("./likes")(sequelize,Sequelize); 
db.categories = require("./categories")(sequelize,Sequelize); 

//ASSOCIATION TABLES 

//Table posts et Table users

db.users.hasMany(db.posts, { as: "posts", onDelete: 'CASCADE' });  // un utilisateur a plusieurs posts
// Si on supprime un user, on supprime ses messages //
  db.posts.belongsTo(db.users, { // le post est relié a un utilisateur
    foreignKey: 'idUsers',
    as: 'user',
  });
  

//Tables intermédiaires likes 
// un utilisateur a plusieurs likes
db.users.hasMany(db.likes, { as: "likes", onDelete: 'CASCADE' });// Si on supprime un user, on supprime ses messages //

 db.likes.belongsTo(db.users, { // like a un utilisateur
    foreignKey: 'users_id',
    as: 'user',
    });

//Tables intermédiaires likes
db.posts.hasMany(db.likes, { as: "likes", onDelete: 'CASCADE' });// Si on supprime un user, on supprime ses messages //
//posts a plusieurs likes
 db.likes.belongsTo(db.posts, { // like a un utilisateur
    foreignKey: 'posts_id',
   as: 'post',
   });

//Tables intermédiaires categories
db.categories.hasMany(db.posts, { as: "posts", onDelete: 'CASCADE' });// Si on supprime un user, on supprime ses messages //
// un utilisateur a plusieurs likes
 db.posts.belongsTo(db.categories, { // like a un utilisateur
    foreignKey: 'categories_idcategories',
   as: 'categorie',
   });

//Table comment et user 
db.users.hasMany(db.comments, { as: "comments", onDelete: 'CASCADE' });// Si on supprime un user, on supprime ses messages //
// un utilisateur a plusieurs commentaires
 db.comments.belongsTo(db.users, { //Commentaire a un utilisateur
    foreignKey: 'users_id',
    as: 'user',
    });

// Table comment et posts
db.posts.hasMany(db.comments, { as: "comments", onDelete: 'CASCADE' });// Si on supprime un post, on supprime ses messages //
//un post a plusieurs commentaires
 db.comments.belongsTo(db.posts, { //Commentaire a un post
    foreignKey: 'posts_id',
    as: 'post',
    });


  module.exports = db; // on exporte pour utiliser notre connexion depuis les autres fichiers.