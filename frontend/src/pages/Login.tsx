import { useState } from "react";
import "../styles/Login.css";
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { User } from "../types/User";
import { FoodItem } from "../types/FoodItem";

export default function Login({ setUser }: { setUser: (user: User) => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    const data = await fetch("http://localhost:9000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.status !== 200) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
        return res;
      })
      .then((res) => res.json());

    if (data.values === undefined) {
      return;
    }

    const foodItems: FoodItem[] = data.values.food_items.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        expiration_date: new Date(item.expiration_date),
        category: item.category,
        visible: item.visible,
      };
    });

    const user: User = {
      id: data.values.id,
      email: data.values.email,
      username: data.values.username,
      password: data.values.password,
      food_items: foodItems,
    };

    setUser(user);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit} className="Login">
        <h1>Login</h1>
        {showAlert && (
          <Alert sx={{ m: 1, width: "25ch" }} severity="error">
            Invalid credentials
          </Alert>
        )}
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </Container>
  );
}
