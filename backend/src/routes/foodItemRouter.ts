import express from 'express';
import { deleteFoodItem, getAllVisibleFoodItem, getFoodItemById, updateFoodItem } from '../database/controllers/FoodItem.controller';
import { FoodItem } from '../database/models/FoodItem';

const router = express.Router();

router.route('/visible').get(async (req, res) => {
    try {
        const values = await getAllVisibleFoodItem();
        return res.status(200).json({ message: 'Found ' + values.length + ' entries', values: values });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get food items : ', error: error });
    }
});

router.route('/:id').patch(async (req, res) => {
    try {
        const body = req.body;
        const foodItem = await updateFoodItem(parseInt(req.params.id), {
            name: body.name,
            expiration_date: body.expiration_date,
            quantity: body.quantity,
            category: body.category,
            visible: body.visible,
            user_id: parseInt(req.params.id),
        });
        return res.status(200).json({ message: 'Food item updated successfully!', values: foodItem });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to update food item : ', error: error });
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const foodItem = await deleteFoodItem(parseInt(req.params.id));
        return res.status(200).json({ message: 'Food item deleted successfully!', values: foodItem });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete food item : ', error: error });
    }
});

router.route('/claim/:id').patch(async (req, res) => {
    try {
        const body = req.body;
        const userId = parseInt(body.user_id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user id!', values: "" });
        }
        const foodItem = await getFoodItemById(parseInt(req.params.id));
        if(foodItem === null) {
            return res.status(404).json({ message: 'Food item not found!', values: "" });
        }
        foodItem.setDataValue('user_id', userId);
        foodItem.setDataValue('visible', false);
        await foodItem.save();
        return res.status(200).json({ message: 'Food item claimed successfully!', values: foodItem });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to claim food item : ', error: error });
    }
});

export default router;