import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Backdrop, CircularProgress } from "@mui/material";
import { User } from "../types/User";
import { FoodItem } from "../types/FoodItem";
import { useEffect, useState } from "react";
import { get } from "../api/Calls";

export default function Home({ user }: { user: User }) {

    const [items, setItems] = useState<FoodItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getVisibleItems().then((items: FoodItem[]) => {
            setItems(items);
        });
        getUsers().then((users: User[]) => {
            setUsers(users);
        });
    }, []);

    async function getVisibleItems() {
        return (await get<FoodItem[]>('/food_item/visible').then((data: any) => {
            const foodItems: FoodItem[] = data.values.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    expiration_date: new Date(item.expiration_date),
                    category: item.category,
                    visible: item.visible,
                    user_id: item.user_id
                }
            });
            const foodItemsNotOwnedByUser = foodItems.filter((item: FoodItem) => {
                return item.user_id !== user.id;
            });
            return foodItemsNotOwnedByUser;
        })
        );
    }

    async function getUsers() {
        return (await get<User[]>('/user').then((data: any) => {
            const users: User[] = data.values.map((user: any) => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    food_items: []
                }
            });
            return users;
        })
        );
    }

    const claimItem = (item: FoodItem) => {
        fetch('http://localhost:9000/api/food_item/claim/' + item.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user.id })
        }).then((response) => {
            if (response.status === 200) {
                user.food_items.push(item);
                setItems(items.filter((obj) => {
                    return obj.id !== item.id;
                }));
            }
            return null;
        })
    }

    if (items === undefined || users === undefined || users.length === 0) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <Container maxWidth="lg" sx={
            {
                display: "flex",
                height: "100vh",
                flexDirection: "column"
            }
        }>
            <h1>Hello back, {user.username}!</h1>

            <div>
                <h2>Explore</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Quantity&nbsp;(g)</TableCell>
                                <TableCell align="right">Owner</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            item.category
                                        }
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">
                                        {
                                            users.filter((obj) => {
                                                return obj.id === item.user_id;
                                            })[0].username
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" onClick={
                                            () => {
                                                claimItem(item);
                                            }
                                        }>
                                            Claim
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    items.length === 0 &&
                    <h3>No items to claim</h3>
                }
            </div>
        </Container>
    )
}