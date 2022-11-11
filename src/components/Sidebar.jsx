import React, { useState } from "react";
import { useParams, useNavigate} from 'react-router-dom';

import swal from 'sweetalert';

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaUserCog,
  FaInbox,
  FaLongArrowAltRight,
  FaRegShareSquare,
} from "react-icons/fa";
import {RiLogoutBoxFill} from 'react-icons/ri'
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/user",
      name: "User",
      icon: <FaUserAlt />,
    },
    {
      path: "/incoming",
      name: "Incoming Document",
      icon: <FaInbox />,
    },
    {
      path: "/outgoin",
      name: "Outgoing Document",
      icon: <FaLongArrowAltRight />,
    },
    {
      path: "/share",
      name: "Share Documets",
      icon: <FaRegShareSquare />,
    },
    {
      path: "/Usermanagement",
      name: "User Managementt",
      icon: <FaUserCog />,
    }
  ];

  const onLogout = () => {
    localStorage.removeItem("token")
    swal({
      title: "Logged Out",
      text: "Logged out successfully",
      icon: 'success',
      dangerMode: true,
      button: true,
    })
    .then((reload) => {
      navigate("/userLogin")
    });
    navigate()
  }

  return (
    <div className="cont">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            BALEENO
          </h1>
          <div
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div
          onClick={onLogout}
            className="link"
            activeclassname="active"
          >
            <div className="icon"><RiLogoutBoxFill /></div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Logout
            </div>
          </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
