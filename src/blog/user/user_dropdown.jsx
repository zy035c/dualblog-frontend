import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 导入 useHistory 来管理页面历史记录

import { LoginRequired, checkLoginStatus } from "blog/user/login";
import "./user_dropdown.css";
import { userLogout } from "apis/api_user";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await checkLoginStatus();
      //   data = data.split/\n/g, '<br>');
      if (res) {
        setIsAuthenticated(true);
      }
    })();
  }, []);
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="hover:cursor-pointer p-2 justify-center items-center">
      <div
        className={`avatar ${isAuthenticated ? "authenticated" : ""}`}
        onClick={toggleDropdown}
      >
        {isAuthenticated ? (
          <span className="flex h-full">🟢</span>
        ) : (
          <span>🟡</span>
        )}
      </div>
      {/* <motion.div
        ref={dropdownRef}
        className="dropdown"
        animate={isDropdownOpen ? "open" : "closed"}
        variants={{
          open: { y: 0, height: "auto" },
          closed: { y: "auto", height: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      > */}
        {isDropdownOpen && (
          <UserAvatarDropdown
            ref={dropdownRef}
            closeDropdown={closeDropdown}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      {/* </motion.div> */}
    </div>
  );
};

const UserAvatarDropdown = React.forwardRef(
  ({ closeDropdown, setIsAuthenticated }, ref) => {
    const navigate = useNavigate(); // 获取 history 对象

    const handleLogout = async () => {
      const result = await userLogout();

      if (result.status === "success") {
        localStorage.removeItem("dualblog-user-token");
        setIsAuthenticated(false);
        navigate("/");
      }
      closeDropdown();
    };
    return (
      <LoginRequired statesToBeSet={[setIsAuthenticated]}>
        <div className="absolute dropdown px-2 right-0 border-solid border-pigliver-400">
          <ul className="p-1 bg-pigliver-500 rounded-md text-center">
            <li className="hover:bg-pigliver-600">我的主页</li>
            <li className="hover:bg-pigliver-600">归档</li>
            <li className="hover:bg-pigliver-600" onClick={handleLogout}>
              登出
            </li>
          </ul>
        </div>
      </LoginRequired>
    );
  }
);

export default UserDropdown;
