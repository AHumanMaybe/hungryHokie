import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Component } from 'react';
import axios from "axios";

function Login(){
    const navigate = useNavigate()

    const [username, setUser] = useState(null)
    const [password, setPass] = useState(null)

    const handleUserTextbox = async (event) => {
        setUser(event.target.value)
    }

    const handlePassTextbox = async (event) => {
        setPass(event.target.value)
    }

    const handleLogin = () => {
        axios.post(
            "http://18.189.31.236:8000/login",
            {
                username: username,
                password: password
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json" 
                },
            }
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem("username", res.data["username"]);
            localStorage.setItem("isLoggedIn", res.data["isLoggedIn"]);
        });

        //alert('User: ' + username + "\nPass: " + password)
        //navigate("/")
    }

    return(
        <>
            <div className="flex flex-col w-full h-screen bg-bg justify-center items-center space-y-6">
                <div className="font-semibold text-6xl pb-4 bg-gradient-to-r from-prim to-sec text-transparent bg-clip-text" >Login or Register</div>
                
                <label className="flex flex-col font-semibold w-1/3 text-xl">
                    <div className="mb-2">Username</div>
                    <input className="bg-itb text-txt rounded-xl px-2 py-1" id="username" onChange={handleUserTextbox} value={username}/>
                </label>

                <label className="flex flex-col font-semibold w-1/3 text-xl">
                    <div className="mb-2">Password</div>
                    <input className="bg-itb text-txt rounded-xl px-2 py-1 mb-2" type="password" id="password" onChange={handlePassTextbox} value={password}/>
                </label>

                {/* Login Button */}
                <motion.div
                    className="flex justify-center items-center text-center bg-prim rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-prim cursor-pointer"
                    initial={{ y: -100, opacity: 0 }}  // Start position (above the screen)
                    animate={{ y: 0, opacity: 1 }}     // Final position (fall into place)
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.0 }}  // Customize the falling effect
                    whileHover={{ y: -10 }}  // Moves the button up on hover
                    onClick={handleLogin}
                >
                    Login
                </motion.div>

                {/* Register Button */}
                <motion.div
                    className="flex justify-center items-center text-center bg-sec rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-sec cursor-pointer"
                    initial={{ y: -100, opacity: 0 }}  // Start position (above the screen)
                    animate={{ y: 0, opacity: 1 }}     // Final position (fall into place)
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.0 }}  // Customize the falling effect
                    whileHover={{ y: -10 }}  // Moves the button up on hover
                >
                    Register
                </motion.div>
            </div>
        </>
    )
}

export default Login;