import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { User } from "../types/User";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { categories } from "../constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodItem } from "../types/FoodItem";

function AddItemDialog({
    user,
    setItems,
}: {
    user: User
    setItems: (items: FoodItem[]) => void
}) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [expiration, setExpiration] = useState<Dayjs | null>(dayjs());
    const [category, setCategory] = useState<string>('fruits');

    const addFoodItem = async () => {
        const foodItem = {
            name: name,
            quantity: quantity,
            expiration_date: expiration?.toDate(),
            category: category
        }
        await fetch('http://localhost:9000/api/user/' + user.id + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })
            .then(res => res.json())
            .then(data => {
                const foodItem: FoodItem = {
                    id: data.values.id,
                    name: data.values.name,
                    quantity: data.values.quantity,
                    expiration_date: new Date(data.values.expiration_date),
                    category: data.values.category,
                    visible: data.values.visible,
                    user_id: user.id
                }
                user.food_items.push(foodItem);
                setItems([...user.food_items]);
            })
    }


    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>Add Item</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: "column",
                    width: "400px"
                }}>
                    <DialogContentText sx={{ mb: 3 }}>
                        Add an item to your fridge.
                    </DialogContentText>
                    <Box sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: "row",
                    }}>
                        <TextField id="outlined-basic" label="Item Name" variant="outlined" autoFocus fullWidth onChange={(e) => {
                            setName(e.target.value);
                        }} />
                        <TextField id="outlined-basic" label="Quantity" variant="outlined" onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                        }} />
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Expiration Date" value={expiration} onChange={(date) => {
                            setExpiration(date);
                        }} />
                    </LocalizationProvider>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="select">Category</InputLabel>
                        <Select
                            labelId="select"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value as string);
                            }}>
                            {
                                categories.map((category, idx) => {
                                    return <MenuItem key={idx} value={category.value}>{category.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                        setOpen(false)
                        addFoodItem();
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function MyFridge({ user }: { user: User }) {

    const [items, setItems] = useState<FoodItem[]>(user.food_items || []);
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        setItems(user.food_items);
    }, [user.food_items]);

    const updateFoodItem = async (item: FoodItem) => {

        const itemJson = {
            name: item.name,
            quantity: item.quantity,
            expiration_date: item.expiration_date,
            category: item.category,
            visible: item.visible,
            user_id: user.id
        }

        await fetch('http://localhost:9000/api/food_item/' + item.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemJson)
        })
            .then(res => res.json())
    }

    const deleteFoodItem = async (item: FoodItem) => {
        await fetch('http://localhost:9000/api/food_item/' + item.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
    }

    return (
        <Container maxWidth="lg" sx={
            {
                display: "flex",
                // alignItems: "center",
                height: "100vh",
                flexDirection: "column"
            }
        }>
            <h1>My Fridge</h1>
            <AddItemDialog user={user} setItems={setItems} />
            <FormControl variant="standard" sx={{ my:3, minWidth: 120 }}>
                <InputLabel id="select">Filter</InputLabel>
                <Select
                    labelId="select"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value as string);
                        const filteredItems = user.food_items.filter((item) => {
                            if (e.target.value === '') {
                                return true;
                            }
                            return item.category === e.target.value;
                        })
                        setItems(filteredItems);
                    }}>
                    {
                        [{ value: '', name: 'None' }, ...categories].map((category, idx) => {
                            return <MenuItem key={idx} value={category.value}>{category.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Expiration Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
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
                                <TableCell align="right">{item.expiration_date.toUTCString()}</TableCell>
                                <TableCell align="right" sx={{
                                    display: "flex",
                                    gap: 3,
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}>
                                    <Button variant="contained" onClick={
                                        () => {
                                            item.visible = !item.visible;
                                            updateFoodItem(item);
                                            setItems([...items]);
                                        }
                                    }>
                                        {
                                            item.visible ? <Visibility /> : <VisibilityOff />
                                        }
                                    </Button>
                                    <Button variant="contained" onClick={
                                        () => {
                                            deleteFoodItem(item);
                                            setItems([...items.filter((item2) => item2.id !== item.id)]);
                                            user.food_items = user.food_items.filter((item2) => item2.id !== item.id);                                   
                                        }
                                    }>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}