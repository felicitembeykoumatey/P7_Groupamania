// Constances

const db = require ('../models/sequelize');
const Message = db.message;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');

// création messages

exports.createMessage = (req, res, next)
if (req.body.content == null){
    return res.status(400).send ({
        message: " Votre message ne peut pas être vide"
    });
}
console.log(req.body);

const message = {
    content : req.body.content,
    user_id : req.body.user_id, 
  imageUrl: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
};
db.Message.create(message)
.then () => res.status(201).json({message: succès})
 .catch(error => res.status(500).json({ error }));
}

