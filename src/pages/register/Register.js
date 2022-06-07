import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch } from "react-redux";
import { email, register } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");
  const [showEmailField, setShowEmailField] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "email" && validator.isEmail(value)) {
      setIsError(false);
      setError("");
    } else {
      setIsError(true);
      setError("Enter valid Email");
    }

    if (name === "password" && value !== "") {
      setIsError(false);
      setError("");
    }

    setInputData({ ...inputData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(email({ email: inputData.email }))
      .then((res) => {
        if (res.error) {
          console.log(res);
          setIsError(true);
          setError(res.payload.err.response.data);
        } else {
          setShowEmailField(false);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...inputData, username: inputData.email }))
      .then((res) => {
        if (!res.error) {
          setIsError(false);
          navigate("/login");
        } else {
          console.log(res);
          setIsError(true);
          setError(res.payload.err.response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            className="logo"
            alt=""
          />
          <Link
            className="loginButton"
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
              zIndex: "999",
            }}
            to="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more</h1>
        <h2>Watch anywhere. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {showEmailField ? (
          <div className="input">
            <input
              type="email"
              placeholder="email address"
              name="email"
              onChange={(e) => handleInput(e)}
            />
            <button
              className="registerButton"
              onClick={handleClick}
              disabled={isError ? true : false}
            >
              Get Started
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) => handleInput(e)}
              />
              <button
                className="registerButton"
                disabled={isError ? true : false}
              >
                Start
              </button>
            </div>
          </form>
        )}
        <span style={{ color: "white", marginTop: "20px" }}>
          {isError && `${error}`}
        </span>
      </div>
    </div>
  );
};

export default Register;
