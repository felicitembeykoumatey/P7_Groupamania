//Imports 
var express = require('express');

//Instantier le serveur

const server= express();

//configure routes

server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h2> Bonjour sur mon serveur</h2>')
});
//listen server

server.listen(8080, function (){
    console.log('serveur en écoute')
})
