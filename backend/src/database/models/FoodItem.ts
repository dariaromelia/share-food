import { Sequelize, DataTypes, ModelDefined } from "sequelize";
import sequelize from "../dbConfig";

export interface FoodItem {
    id: number;
    name: string;
    quantity: number;
    category: string;
    expiration_date: Date;
    user_id: number;
    visible?: boolean;
}

export interface FoodItemCreation {
    name: string;
    quantity: number;
    category?: string;
    expiration_date: Date;
    visible?: boolean;
    user_id: number;
};

export const FoodItemTable : ModelDefined<FoodItem, FoodItemCreation> = sequelize.define('food_item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});