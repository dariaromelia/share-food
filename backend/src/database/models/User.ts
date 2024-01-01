import sequelize from '../dbConfig';
import { FoodItem } from './FoodItem';
import { DataTypes, ModelDefined } from "sequelize";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    foodItems: FoodItem[];
}

export interface UserCreation {
    username: string;
    password: string;
    email: string;
};

export const UserTable : ModelDefined<User, UserCreation> = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
});