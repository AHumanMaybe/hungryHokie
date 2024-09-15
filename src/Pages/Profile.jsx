import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const secret_token = localStorage.getItem("secret_token");

  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [currWeight, setCurrWeight] = useState(null);
  const [targetWeight, setTargetWeight] = useState(null);
  const [sex, setSex] = useState(null);

  const updateServer = (uri_page, data) => {
    axios.post(
      "http://18.189.31.236:8000" + uri_page,
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleAgeTextbox = async (event) => {
    setAge(event.target.value);
  };

  const handleHeightTextbox = async (event) => {
    setHeight(event.target.value);
  };

  const handleCurrWeightTextbox = async (event) => {
    setCurrWeight(event.target.value);
  };

  const handleTargetWeightTextbox = async (event) => {
    setTargetWeight(event.target.value);
  };

  const handleSexChange = async (event) => {
    setSex(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const calculateCaloricIntake = (age, sex, heightInches, weightLbs, activityFactor = 1.2) => {
    // Convert height to cm and weight to kg
    const heightCm = heightInches * 2.54;
    const weightKg = weightLbs * 0.453592;

    // Mifflin-St Jeor equation for BMR
    let BMR;
    if (sex === "m") {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else if (sex === "f") {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    } else {
      throw new Error("Invalid sex provided");
    }

    // TDEE calculation (BMR * activity factor)
    const TDEE = BMR * activityFactor;

    return TDEE;
  };

  const submitInfo = () => {
    // Save the age, height, and weight to localStorage
    localStorage.setItem("age", age);
    localStorage.setItem("height", height);
    localStorage.setItem("currWeight", currWeight);
    localStorage.setItem("targetWeight", targetWeight);
    localStorage.setItem("sex", sex);
  
    // Update the server with user information
    updateServer("/set_age", { age: age, username: username, secret_token: secret_token });
    updateServer("/set_height", { height: height, username: username, secret_token: secret_token });
    updateServer("/set_weight", { weight: currWeight, username: username, secret_token: secret_token });
    updateServer("/set_target_weight", { target_weight: targetWeight, username: username, secret_token: secret_token });
    updateServer("/set_sex", { sex: sex, username: username, secret_token: secret_token });
  
    // Check if the target weight is greater or less than the current weight
    const caloricIntake = calculateCaloricIntake(age, sex, height, currWeight);
  
    if (parseFloat(targetWeight) > parseFloat(currWeight)) {
      // Gain weight: add ~500 calories/day for 1 lb/week gain
      const caloriesForWeightGain = caloricIntake + 500;
      localStorage.setItem("caloric_intake", caloriesForWeightGain);
      console.log("Caloric intake to gain 1 lb/week:", caloriesForWeightGain);
    } else if (parseFloat(targetWeight) < parseFloat(currWeight)) {
      // Lose weight: subtract ~500 calories/day for 1 lb/week loss
      const caloriesForWeightLoss = caloricIntake - 500;
      localStorage.setItem("caloric_intake", caloriesForWeightLoss);
      console.log("Caloric intake to lose 1 lb/week:", caloriesForWeightLoss);
    }
  };

  const populateFields = (data) => {
    setAge(data["age"]);
    setHeight(data["height"]);
    setCurrWeight(data["weight"]);
    setTargetWeight(data["target_weight"]);
    setSex(data["sex"]);
  };

  const getInfo = () => {
    fetch(`http://18.189.31.236:8000/get_user_properties?username=${localStorage.getItem("username")}&secret_token=${localStorage.getItem("secret_token")}`)
      .then((response) => response.json())
      .then((data) => {
        populateFields(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []); // Fetch log data on component mount

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-bg justify-center items-center space-y-6">
        <div className="font-semibold text-6xl text-txt">Welcome, {username}!</div>

        <div className="flex flex-row justify-center font-semibold w-1/3 text-xl">
          <div className="flex flex-col font-semibold w-1/3 text-xl pr-4">
            <div className="mb-2">Age</div>
            <input className="bg-itb text-txt rounded-xl px-2 py-1" id="age" type="number" value={age} onChange={handleAgeTextbox} />
          </div>
          <div className="flex flex-col font-semibold w-1/3 text-xl pl-4">
            <div className="mb-2">Height (in)</div>
            <input className="bg-itb text-txt rounded-xl px-2 py-1" id="height" type="number" value={height} onChange={handleHeightTextbox} />
          </div>
        </div>

        <div className="flex flex-row justify-center font-semibold w-1/3 text-xl">
          <div className="flex flex-col font-semibold w-1/3 text-xl pr-4">
            <div className="mb-2">Current Weight (lbs)</div>
            <input className="bg-itb text-txt rounded-xl px-2 py-1" id="currWeight" type="number" value={currWeight} onChange={handleCurrWeightTextbox} />
          </div>
          <div className="flex flex-col font-semibold w-1/3 text-xl pl-4">
            <div className="mb-2">Target Weight (lbs)</div>
            <input className="bg-itb text-txt rounded-xl px-2 py-1" id="targetWeight" type="number" value={targetWeight} onChange={handleTargetWeightTextbox} />
          </div>
        </div>

        <div className="flex flex-row justify-center font-semibold w-1/3 text-xl">
          <div className="flex flex-col font-semibold w-1/3 text-xl pr-4">
            <div className="mb-2">Sex</div>
            <select className="bg-itb text-txt rounded-xl px-2 py-1" name="Gender" id="gender" value={sex} onChange={handleSexChange}>
              <option value="m">M</option>
              <option value="f">F</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row">
          {/* Submit Button */}
          <motion.div
            className="flex justify-center items-center text-center bg-prim rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-prim cursor-pointer mr-4"
            initial={{ y: -100, opacity: 0 }} // Start position (above the screen)
            animate={{ y: 0, opacity: 1 }} // Final position (fall into place)
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.0 }} // Customize the falling effect
            whileHover={{ y: -10 }} // Moves the button up on hover
            onClick={submitInfo}
          >
            Submit
          </motion.div>
          {/* Logout Button */}
          <motion.div
            className="flex justify-center items-center text-center bg-sec rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-sec cursor-pointer"
            initial={{ y: -100, opacity: 0 }} // Start position (above the screen)
            animate={{ y: 0, opacity: 1 }} // Final position (fall into place)
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }} // Customize the falling effect
            whileHover={{ y: -10 }} // Moves the button up on hover
            onClick={handleLogout}
          >
            Logout
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Profile;
