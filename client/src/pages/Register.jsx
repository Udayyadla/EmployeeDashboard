import { useState } from "react";
import "./register.css"
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      return toast.error("passwords are not matched")
    }

    axios.post("http://localhost:8000/register",formData)
    .then((response)=>{console.log(response.data)
      toast.success(response.data.message)
      setTimeout(()=>{
        navigate("/login")
      },5000)
      
    })
    .catch((err)=>{
      console.log(err.response.data)
      toast.error(err.response.data.message)
    })
  
  };


  return (
    <div>
      <form className="form-container" onSubmit={submitHandler}>
        <input
        className="registerFileds"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input 
        
        className="registerFileds"
          type="password"
          placeholder="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
        
        className="registerFileds"
          type="password"
          placeholder="confirm password"
          value={formData.confirmPassword}
          required
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button type="submit" className="submit-btn">Register</button>
        <p>
          Are you Existing User?
          <Link to="/login"> login </Link>here
        </p>
      </form>
      <ToastContainer
      position="top-right"
      autoClose={5000} />
    </div>
  );
};

export default Register;
