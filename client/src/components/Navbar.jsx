import React from "react";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.clear();
    toast.success("You successfully logout!!!")
    setTimeout(()=>{
      navigate("/");

    },5000)


    console.log("logout");
  };
  return (
    <div className="container">
      <nav>
        <ul className="list-container">
          <li>
            <img src="./DealsDray.jpg" alt="logo" id="logo" />
          </li>
          <div className="child-lists">
            <li id="employeelist">
              <Link to="/home">Home </Link>
            </li>
            <li id="employeelist">
              <Link to="/employees">Employee List </Link>
            </li>

            <li id="username">{username}</li>
            <li onClick={logout} id="logout">
              Logout
            </li>
          </div>
        </ul>
      </nav>
      <ToastContainer/>
    </div>
  );
};

export default Navbar;
