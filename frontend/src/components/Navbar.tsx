import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Popover, Toolbar, Typography } from "@mui/material";
import { routes } from "../routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { User } from "../types/User";
import { FoodItem } from "../types/FoodItem";
import NotificationsIcon from '@mui/icons-material/Notifications';

const pages = routes.filter(r => r.name);

export function getNumberOfDays(foodItem: FoodItem){
    const currentDate = new Date();
    const expirationDate = new Date(foodItem.expiration_date);
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
}

function ExpiredFoodItemNotification({ user }: { user: User }) {

    const expiredFoodItems = user.food_items.filter((foodItem: FoodItem) => {
        return getNumberOfDays(foodItem) < 5;
    });

    return (
        <Box sx={{ p: 2 }}>
            {expiredFoodItems.map((foodItem: FoodItem, index: number) => getNumberOfDays(foodItem) > 0 ? (
                <Box key={index} sx={{
                    p: 2,
                    backgroundColor: '#ffAf00A0',
                    border: '2px solid orange',
                    borderRadius: '5px',
                    mb: 2
                }}>
                    <Typography variant="h6">{foodItem.name}</Typography>
                    <Typography variant="body1">Expires in {getNumberOfDays(foodItem)} days</Typography>
                </Box>
            ) : (
                <Box key={index} sx={{
                    p: 2,
                    backgroundColor: '#ff0000A0',
                    border: '2px solid red',
                    borderRadius: '5px',
                    mb: 2
                }}>
                    <Typography variant="h6">{foodItem.name}</Typography>
                    <Typography variant="body1">Expired</Typography>
                </Box>
            )
            )}
            {
                expiredFoodItems.length === 0 && (
                    <Typography variant="body1">No food items will expire soon</Typography>
                )
            }
        </Box>
    )
}

export default function Navbar({
    user
}: {
    user: User
}) {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const navigate = useNavigate();

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    };

    function handleCloseNavMenu() {
        setAnchorElNav(null);
    };

    function navigation(path: string) {
        handleCloseNavMenu();
        navigate(path);
    }

    return (
        <AppBar sx={{ mb: 10 }} position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => navigation(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => navigation(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                        }}
                    >
                        <NotificationsIcon />
                    </Button>
                    <Popover
                        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => {
                            setAnchorEl(null);
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        < ExpiredFoodItemNotification user={user} />
                    </Popover>
                </Toolbar>
            </Container>
        </AppBar>
    )
}