import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

function Login() { 
    //Pretty straight forward - just forwarding to the login page
    window.location.href='http://localhost:5000/login'
}

export default Login;