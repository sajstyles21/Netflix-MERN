import React, { useState } from "react";
import "./Navbar.scss";
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout({}));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
          />
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
            to="/"
          >
            <span>Homepage</span>
          </Link>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
            to="/series"
          >
            <span>Series</span>
          </Link>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
            to="/movies"
          >
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>{user?.username}</span>
          <Notifications className="icon" />
          <img src="https://picsum.photos/200/300?random=1" alt="" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
