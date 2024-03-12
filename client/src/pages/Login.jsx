import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const submitHandler=(e)=>{
    e.preventDefault();
    localStorage.setItem("username",loginData.username)
    axios.post("http://localhost:8000/login",loginData)
    .then((response)=>{
    localStorage.setItem("token",response.data.token)  
    toast.success(response.data.message)
    setTimeout(()=>{
      navigate("/home")
    },5000) 
   
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
      console.log(err.response.data)})
  }
  return (
    <div>
      <div>
        <form className="form-container" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="username"
            className="registerFileds"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="password"
            className="registerFileds"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
          <p>
            {" "}
            Are you new User?<Link to="/">Register </Link>here
          </p>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
