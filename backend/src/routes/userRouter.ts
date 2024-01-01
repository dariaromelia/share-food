import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserByCredentials, getUserById, updateUser } from '../database/controllers/User.controller';
import { createFoodItem, getAllFoodItems } from '../database/controllers/FoodItem.controller';
import { Model } from 'sequelize';
import { User, UserCreation } from '../database/models/User';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const values = await getAllUsers();
        return res.status(200).json({ message: 'Found ' + values.length + ' entries', values: values });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get users : ', error: error });
    }
});

router.route('/').post(async (req, res) => {
    try {
        const body = req.body;
        const user = await createUser({
            username: body.username,
            password: body.password,
            email: body.email,
        });

        return res.status(200).json({ message: 'User created successfully!', values: user });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to create user : ', error: error });
    };
});

router.route('/login').post(async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const user = await getUserByCredentials(email, password);
        if (user !== null) {
            return res.status(200).json({ message: 'User logged in successfully!', values: user });
        }
        return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get user : ', error: error });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const user = await getUserById(parseInt(req.params.id));
        return res.status(200).json({ message: 'Get user by id', values: user });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get user : ', error: error });
    }
});

router.route('/:id').patch(async (req, res) => {
    try {
        const body = req.body;
        const user = await updateUser(parseInt(req.params.id), {
            username: body.username,
            password: body.password,
            email: body.email,
        });

        return res.status(200).json({ message: 'User updated successfully!', values: user });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to update user : ', error: error });
    };
});

router.route('/:id').delete(async (req, res) => {
    try {
        const user = await deleteUser(parseInt(req.params.id));
        return res.status(200).json({ message: 'User deleted successfully!', values: user });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete user : ', error: error });
    }
});

router.route('/:id/food_items').get(async (req, res) => {
    try {
        const foodItems = await getAllFoodItems(parseInt(req.params.id));
        return res.status(200).json({ message: 'Get all food items', values: foodItems });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get food items : ', error: error });
    }
});

router.route('/:id').post(async (req, res) => {
    try {
        const body = req.body;
        const timestamp = Date.parse(body.expiration_date);
        console.log(timestamp);
        const date = new Date(timestamp);
        console.log(date);
        const foodItem = await createFoodItem({
            name: body.name,
            expiration_date: date,
            quantity: body.quantity,
            category: body.category,
            user_id: parseInt(req.params.id),
        });

        return res.status(200).json({ message: 'Food item created successfully!', values: foodItem });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to create food item : ', error: error });
    };
});
export default router;
