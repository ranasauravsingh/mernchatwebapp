import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  // const toastOptions = {
  //   position: "top-right",
  //   autoClose: 3000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // };

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    } else if (password.length < 8) {
      alert("Password should be equal or greater than 8 characters.");
      return false;
    } else if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Ghup Shup</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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
      transition: 0.5s ease-in-out;
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
  }
`;
