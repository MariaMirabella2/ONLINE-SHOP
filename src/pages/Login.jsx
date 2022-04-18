import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "80vw",
    margin: "20px auto"
  };
  const btnstyle = { margin: "8px 0" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid align="center">
        <h2>Conectare</h2>
      </Grid>
      <TextField
        label="Email"
        value={email}
        placeholder="Email"
        fullWidth
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        label="Password"
        value={password}
        placeholder="Enter password"
        type="password"
        fullWidth
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={(e) => {
          handleLogin(e);
        }}
      >
        Conecteaza
      </Button>

      <Typography>
        {" "}
        Nu ai cont ?<Link href="/signup">Creeaza acum</Link>
      </Typography>
    </Paper>
  );
};

export default Login;
