import express from 'express';
import sequelize from '../database/dbConfig';
import { createUser } from '../database/controllers/User.controller';
import { createFoodItem } from '../database/controllers/FoodItem.controller';

const router = express.Router();

const createFutureDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

router.route('/create').get((req, res) => {
    try {
        sequelize.sync().then(() => {
            console.log('Tables created successfully!');
            res.status(200).json({ message: 'Tables created successfully!' });
        }).catch((error: any) => {
            console.error('Unable to create tables : ', error);
        });
    } catch (error) {
        console.error('Unable to create tables : ', error);
        res.status(500).json({ message: 'Unable to create tables : ', error: error });
    }
});

router.route('/seed').post(async (req, res) => {
    await createUser({
        username: 'Daria',
        password: 'test',
        email: 'daria@test.com',
    });

    await createFoodItem({
        name: 'Lapte',
        quantity: 2,
        category: 'dairy',
        expiration_date: createFutureDate(5),
        user_id: 1,
    });

    await createFoodItem({
        name: 'Paine',
        quantity: 3,
        category: 'baked',
        expiration_date: createFutureDate(3),
        user_id: 1,
    });

    await createFoodItem({
        name: 'Carne',
        quantity: 1,
        category: 'meat',
        expiration_date: createFutureDate(10),
        user_id: 1,
    });

    await createFoodItem({
        name: 'Morcovi',
        quantity: 10,
        category: 'vegetables',
        expiration_date: createFutureDate(30),
        user_id: 1,
    });

    await createFoodItem({
        name: 'Castraveti',
        quantity: 5,
        category: 'vegetables',
        expiration_date: createFutureDate(30),
        user_id: 1,
    });

    await createUser({
        username: 'Romelia',
        password: 'test',
        email: 'romelia@test.com',
    });

    await createFoodItem({
        name: 'Iaurt',
        quantity: 2,
        category: 'dairy',
        expiration_date: createFutureDate(14),
        user_id: 2,
    });

    await createFoodItem({
        name: 'Pizza',
        quantity: 2,
        category: 'meals',
        expiration_date: createFutureDate(7),
        user_id: 2,
    });

    await createFoodItem({
        name: 'Sushi',
        quantity: 1,
        category: 'meals',
        expiration_date: createFutureDate(5),
        user_id: 2,
    });

    return res.status(200).json({ message: 'Tables seeded successfully!' });
});

export default router;