import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signInImage from "../assets/signup.jpg";
const initialState = {
  fullName: "",
  password: "",
  phoneNumber: "",
  comfirmPassword: "",
  userName: "",
  avatarURL: "",
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((preSignUp) => !preSignUp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Signup" : "Signin"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="full name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                name="userName"
                placeholder="username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">PhoneNumber</label>
                <input
                  type="phonenumber"
                  name="phonenumber"
                  placeholder="phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">AvaterURL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="AvaterURL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="comfirmPassword">comfirmPassword</label>
                <input
                  type="password"
                  name="comfirmPassword"
                  placeholder="comfirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button> {isSignUp ? "SignUp" : "SignIn"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp ? "Already have an account" : "Dont have an account"}{" "}
              {"   "}
              <span onClick={switchMode}>{isSignUp ? "Signin" : "signUp"}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="signInImage" />
      </div>
    </div>
  );
};

export default Auth;
