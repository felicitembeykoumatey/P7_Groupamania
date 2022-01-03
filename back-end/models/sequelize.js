require("dotenv").config()
const Sequelize = require ("sequelize");
import UserModel from './models_sequelize';

const mysql = require ('mysql');
sequelize.sync();

const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    dialect: "mysql",
    host: "localhost"
});

