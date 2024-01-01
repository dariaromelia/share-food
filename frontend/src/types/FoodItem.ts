export interface FoodItem {
    id: number;
    name: string;
    quantity: number;
    category: string;
    expiration_date: Date;
    user_id: number;
    visible: boolean;
}