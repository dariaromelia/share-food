import { Alert, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { User } from "../types/User";
import "../styles/Login.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register(
    { setUser }: { setUser: (user: User) => void }
) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = {
            email: email,
            password: password,
            username: username
        }
        const data = await fetch('http://localhost:9000/api/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res => {
                if (res.status !== 200) {
                    setShowAlert(true);
                } else {
                    setShowAlert(false);
                }
                return res;
            })
            .then(res => res.json())

        const user: User = {
            id: data.values.id,
            email: data.values.email,
            username: data.values.username,
            password: data.values.password,
            food_items: []
        }

        setUser(user);
    };

    return (
        <Container maxWidth="lg" sx={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }
        }>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="Login">
                {showAlert &&  <Alert severity="error">Incorrect email or password</Alert>}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
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
                <Button variant="contained" type="submit">Register</Button>
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </Container>
    )
}