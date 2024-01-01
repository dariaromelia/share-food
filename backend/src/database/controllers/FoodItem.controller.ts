import { FoodItem, FoodItemCreation, FoodItemTable } from './../models/FoodItem';


export async function createFoodItem(item: FoodItemCreation) {
    return FoodItemTable.create(item);
}

export async function getAllFoodItems(id: number) {
    return await FoodItemTable.findAll({
        where: {
            user_id: id,
        },
    });
}

export async function getFoodItemById(id: number) {
    return await FoodItemTable.findByPk(id);
}

export async function getAllVisibleFoodItem() {
    return await FoodItemTable.findAll({
        where: {
            visible: true,
        },
    });
}

export async function updateFoodItem(id: number, item: FoodItemCreation) {
    const foodItem = await FoodItemTable.findByPk(id);
    const itemContent = {
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        expiration_date: item.expiration_date,
        visible: item.visible,
    }    
    if (foodItem !== null) {
        const updatedFoodItem = await foodItem.update(itemContent);
        return updatedFoodItem;
    }
    return null;
}

export async function deleteFoodItem(id: number) {
    const foodItem = await FoodItemTable.findByPk(id);
    if (foodItem !== null) {
        await foodItem.destroy();
        return foodItem;
    }
    return null;
}