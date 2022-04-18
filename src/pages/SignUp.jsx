import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "50vw",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const { signup } = useAuth();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  const [phone, setPhone] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  async function handleSignUp(e) {
    e.preventDefault();

    if (password !== confirmedPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    await signup(email, password);

    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("secondName", secondName);
    localStorage.setItem("county", county);
    localStorage.setItem("city", city);
    localStorage.setItem("postalCode", postalCode);
    localStorage.setItem("street", street);

    setLoading(false);
    history.push("/");
  }

  const history = useHistory();
  return (
    <Grid>
      <Paper elevation={200} style={paperStyle}>
        <Grid align="center">
          <h2>Creeaza Cont</h2>
        </Grid>
        <TextField
          label="Prenume"
          value={firstName}
          placeholder="Prenume"
          fullWidth
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          label="Nume de Familie"
          value={secondName}
          placeholder="Nume de Familie"
          fullWidth
          required
          onChange={(e) => {
            setSecondName(e.target.value);
          }}
        />

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
          label="Parola"
          value={password}
          placeholder="Parola"
          type="password"
          fullWidth
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          label="Confirma Parola"
          value={confirmedPassword}
          placeholder="Confirma Parola"
          type="password"
          fullWidth
          required
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
          }}
        />
        <TextField
          label="Numar Telefon"
          value={phone}
          placeholder="Numar Telefon"
          type="input"
          fullWidth
          required
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <TextField
          label="Judet"
          value={county}
          placeholder="Judet"
          type="input"
          fullWidth
          required
          onChange={(e) => {
            setCounty(e.target.value);
          }}
        />
        <TextField
          label="Oras"
          value={city}
          placeholder="Oras"
          type="input"
          fullWidth
          required
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <TextField
          label="Strada si numarul"
          value={street}
          placeholder="Strada si numarul"
          type="input"
          fullWidth
          required
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <TextField
          label="Cod Postal"
          value={postalCode}
          placeholder="Cod Postal"
          type="input"
          fullWidth
          required
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={(e) => {
            handleSignUp(e);
          }}
        >
          Creeaza Cont
        </Button>
        <Typography>
          {" "}
          Ai cont? <Link href="/login">Conecteaza-te</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignUp;
