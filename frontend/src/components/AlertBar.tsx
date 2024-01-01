import { Alert, Container } from "@mui/material";
import { FoodItem } from "../types/FoodItem";
import { User } from "../types/User";
import { getNumberOfDays } from "./Navbar";

export default function AlertBar({
    user
}: {
    user: User
}) {

    const expiredFoodItems = user.food_items.filter((foodItem: FoodItem) => {
        return getNumberOfDays(foodItem) < 5;
    });

    return (
        <Container maxWidth="lg">
            {expiredFoodItems.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    You have {expiredFoodItems.length} food items that will expire soon!
                </Alert>
            )}
        </Container>
    )
}