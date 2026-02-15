import React, { useContext, useState } from "react";
import logo from "../assets/assets/logo.svg";
import pp from "../assets/assets/profile_pic.png";
import di from "../assets/assets/dropdown_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showmenu, setShowmenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={logo}
        alt="Logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none h-0.5 outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none h-0.5 outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none h-0.5 outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none h-0.5 outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relatve">
            <img className="rounded-full w-8" src={userData.image} alt="" />
            <img className="w-2.5 " src={di} alt="" />
            <div className="absolute top-4 right-0  pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("my-appointments")}
                >
                  My Appointments
                </p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary hidden rounded-full px-8 py-3 text-white md:block "
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-6 md:hidden"
          onClick={() => setShowmenu(true)}
        />
        {/* ----------- Mobile Menu --------------------- */}
        <div
          className={` ${
            showmenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 overflow-hidden z-20 bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="logo" />
            <img
              src={assets.cross_icon}
              className="w-7"
              alt="cross"
              onClick={() => setShowmenu(false)}
            />
          </div>
          <ul className="flex flex-col px-5 mt-5 text-lg font-medium gap-2 items-center">
            <NavLink to="/" onClick={() => setShowmenu(false)}>
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowmenu(false)}>
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink to="/about" onClick={() => setShowmenu(false)}>
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowmenu(false)}>
              <p className="px-4 py-2 rounded inline-block">Contanct</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
