import mysql from 'mysql2/promise';
import env from 'dotenv';
import { FoodItemTable } from './models/FoodItem';
import sequelize from './dbConfig';
import { UserTable } from './models/User';

env.config();

async function createDatabase() {
    await mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }).then((connection) => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
    }).catch((err) => {
        console.log(err.stack);
    });
}

function createConnection() {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });
}

function createTablesRelations() {
    UserTable.hasMany(FoodItemTable, {
        as: 'food_items',
        foreignKey: 'user_id',
    });

    FoodItemTable.belongsTo(UserTable, {
        foreignKey: 'user_id',
    });
}

export default async function db_init() {
    
    await createDatabase();
    createConnection();
    createTablesRelations();
}