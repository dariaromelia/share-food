import { FoodItem } from "./FoodItem";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    food_items: FoodItem[];
}