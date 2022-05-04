import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";
import { ToastContainer } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  // const toastOptions = {
  //   position: "top-right",
  //   autoClose: 3000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
    // if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    //   navigate("/");
    // }
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      alert("Email and Password is required.");
      return false;
    } else if (password === "") {
      alert("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        alert(data.msg);
        // toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          // process.env.REACT_APP_LOCALHOST_KEY,
          "chat-app-user",
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Ghup Shup</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ffd4dc;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #ffadbc;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #a180ff;
    border-radius: 0.4rem;
    color: #4f4f4f;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #a180ff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #7747ff;
    }
  }
  span {
    color: #ffadbc;
    text-align: center;
    a {
      color: #a180ff;
      &:hover {
        color: #7747ff;
      }
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
