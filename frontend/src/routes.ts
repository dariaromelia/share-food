import Home from "./pages/Home";
import MyFridge from "./pages/MyFridge";

export const routes = Object.freeze([
    {
        path : "/",
        page: Home,
        name: "Home"
    },
    {
        path: "/fridge",
        page: MyFridge,
        name: "My Fridge"
    },
])