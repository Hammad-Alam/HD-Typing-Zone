import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.gif";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [expandNavbar, setExpandNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  return (
    <div>
      <nav className="flex justify-between items-center font-semibold px-4 py-2 h-20 text-white bg-[#DC2620] md:px-8 lg:px-16">
        <div className="uppercase flex items-center text-xl md:text-2xl lg:text-3xl">
          <img src={logo} className="w-20"></img>
          <p>HD Typing Zone</p>
        </div>
        <div className="md:hidden z-50">
          {expandNavbar ? (
            <CloseIcon onClick={() => setExpandNavbar(false)} />
          ) : (
            <ReorderIcon onClick={() => setExpandNavbar(true)} />
          )}
        </div>
        <ul
          className={`${
            expandNavbar
              ? "fixed inset-0 flex flex-col items-center justify-center space-y-8 bg-[#DC2620] z-40 text-2xl"
              : "hidden"
          } md:flex md:text-lg md:space-x-8 lg:text-xl lg:space-x-12`}
        >
          <li>
            <Link to="/" onClick={() => setExpandNavbar(false)}>
              Home
            </Link>
          </li>
          <li className="relative">
            <div
              className="cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Typing World
            </div>
            {dropdownOpen && (
              <ul className="absolute bg-white text-black mt-2 space-y-2 rounded shadow-md">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link
                    to="/typing-world/basic"
                    onClick={() => {
                      setDropdownOpen(false);
                      setExpandNavbar(false);
                    }}
                  >
                    Basic
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link
                    to="/typing-world/advanced"
                    onClick={() => {
                      setDropdownOpen(false);
                      setExpandNavbar(false);
                    }}
                  >
                    Advanced
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/typing-tips"
              className="text-white "
              onClick={() => setExpandNavbar(false)}
            >
              Typing Tips
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
