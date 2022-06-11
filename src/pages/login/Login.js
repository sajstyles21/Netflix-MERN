import React, { useEffect, useRef, useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import loader from "../../loadimage.gif";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (validator.isEmail(emailRef.current.value)) {
      setIsError(false);
      setError("");
    } else {
      setIsError(true);
      setError("Enter valid Email");
    }

    return () => {
      setIsError(false);
      setError("");
    };
  }, [emailRef]);

  const handleInputChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(login(inputData))
      .then((res) => {
        if (res.error) {
          setIsError(true);
          setError(res.payload.err.response.data);
        } else {
          setIsLoading(false);
          localStorage.setItem("user", JSON.stringify(res.payload));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            className="logo"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            type="email"
            autoComplete="false"
            name="email"
            ref={emailRef}
            placeholder="email or phone number"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="password"
            autoComplete="false"
            name="password"
            onChange={(e) => handleInputChange(e)}
            placeholder="password"
          />
          <button
            type="submit"
            className="loginButton"
            disabled={isError || isLoading ? true : false}
          >
            {isLoading ? (
              <img
                loading="lazy"
                style={{
                  width: "20px",
                  marginTop: "5px",
                }}
                src={loader}
                alt=""
              />
            ) : (
              "Sign In"
            )}
          </button>
          {isError && `${error}`}
          <span>
            New to Netflix?{" "}
            <b>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                to="/register"
              >
                Sign up now.
              </Link>
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
