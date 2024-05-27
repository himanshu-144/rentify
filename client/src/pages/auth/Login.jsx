import React, { useState } from "react";
import "../../styles/Login.scss"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogin } from "../../redux/state";
import axios from "axios"

const Login= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = {
        email : email, 
        password :password,
      }
      const loggedIn = await axios.post('http://localhost:8000/api/v1/auth/login', data, {
        headers:{
          "Content-Type" :"application/json",
        }
      });

      console.log(loggedIn);
      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.data.user,
            token: loggedIn.data.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default Login;