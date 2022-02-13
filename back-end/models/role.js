// Inclure Sequelize module.
const Sequelize = require('sequelize')
const sequelize = require('../database')

// Déclarations des constances
const Role = sequelize.define('role'), {
    id: {type: sequelize.INTEGER, autoIncrement: true, primarkey: true},
    userName: {type: sequelize.STRING(255), allowNull: false},
},
{
    roles: 'role'  // nom de notre table "roles"
},{
    timestamps: false
}

// création relation entre nos deux tables role et user
);
module.exports.Role = Role;