// Déclarations des constances//
const express = require('express'); ///Importer express.
const app = express(); // Création d'une application express.
const path = require('path'); // Récupèrer l'élément de node.js permettant d'accéder au chemin de notre systeme de fichiers
const helmet = require('helmet'); // Récupèrer Helmet (sécuriser les applis Express en définissant divers en-têtes HTTP)
const multer = require('multer'); //Charger multer en utilisant la méthode require().

const fileStorageEngine = multer.diskStorage({  // stockage fichier sur disk avec la methode diskStorage()
    destination: (req, file, cb) =>{
        cb(null, "./images");
    },
    filename:(req, file, cb) => {
        cb(null, Date.now()+ '--'+ file.originalname);
    },
})
const upload = multer({storage: fileStorageEngine});
app.post("/single", upload.single ("image"), (req, res) => { 
   
    res.send("Téléchargement succès")
})

app.post("/multiple", upload.array("images", 3), (req, res) => {
 
  res.send("Tous les fichiers ont été téléchargés avec succès");
});


//Charger des routes
const userRoutes = require('./routes/users'); //Récupèrer route user.
const postRoutes = require ('./routes/posts'); // Récupèrer route post.
const commentRoutes = require('./routes/comments'); // Recupérer route comment.

//Contrôle d'accès *CROSS ORIGIN RESOURCE SHARING 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//droit d'accéder à notre api = tout le monde grâce à ce symbole 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autoriser les headers//
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autoriser  certaines méthodes GET POST PUT DELETE PATH OPTIONS
  next();
});

//HELMET protége notre application de certaines vulnaribilités.
app.use(helmet());

app.use(express.json());

// CHEMIN D'ACCES DES ENDPOINTS 
app.use('/images', express.static(path.join(__dirname, 'images'))); // cette requête sert le dossier statique et  l'adresse est déterminée par la méthode path.join (avec __dirname = nom du dossier dans lequel on va se trouver, auquel on va ajouter "images"
app.use('/', userRoutes); //CHEMIN ROUTE UTILISATEUR
app.use('/', commentRoutes); // CHEMIN ROUTE COMMENT
app.use('/', postRoutes); // CHEMIN ROUTE POST


// Exporter l'application express.
module.exports = app;  // export de l'application express (pour le serveur node.js).