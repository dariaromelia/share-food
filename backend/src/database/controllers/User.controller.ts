import { FoodItemTable } from "../models/FoodItem";
import { UserCreation, UserTable } from "../models/User";

export async function createUser(user: UserCreation) {
    return await UserTable.create(user, {
        include: [{
            model: FoodItemTable,
            as: 'food_items',
        }],
    });
}

export async function getAllUsers() {
    return await UserTable.findAll({
        include: [{
            model: FoodItemTable,
            as: 'food_items',
        }],
    });
}

export async function getUserById(id: number) {
    return await UserTable.findByPk(id, {
        include: [{
            model: FoodItemTable,
            as: 'food_items',
        }],
    });
}

export async function getUserByCredentials(email: string, password: string) {
    return await UserTable.findOne({
        where: {
            email: email,
            password: password,
        },
        include: [{
            model: FoodItemTable,
            as: 'food_items',
        }],
    });
}

export async function updateUser(id: number, user: UserCreation) {
    const userToUpdate = await UserTable.findByPk(id);
    if (userToUpdate !== null) {
        const updatedUser = await userToUpdate.update(user);
        return updatedUser;
    }
    return null;
}

export async function deleteUser(id: number) {
    const user = await UserTable.findByPk(id);
    if (user !== null) {
        await user.destroy();
        return true;
    }
    return false;
}