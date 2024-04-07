import React, { useState, useEffect, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 导入 useHistory 来管理页面历史记录

import { LoginRequired, checkLoginStatus } from "blog/user/login";
import "./user_dropdown.css";
import { userLogout } from "apis/api_user";

import { MenuItem } from "./user_dropdown_item";
import { UserDropdownToggle } from "./user_dropdown_toggle";
import { useDimensions } from "utils/use_dimensions";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ItemList = () => (
  <motion.ul variants={variants} className="">
    <MenuItem i={0}>关于</MenuItem>
    <MenuItem i={1}>归档</MenuItem>
    <MenuItem i={2}>主页</MenuItem>
    <MenuItem i={3}>私信</MenuItem>
    <MenuItem i={4}>登出</MenuItem>
  </motion.ul>
);

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 268px 30px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 268px 30px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const UserDropdown = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div className="absolute h-full right-0 top-0 flex">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          className="background bg-pigliver-300 shadow-2xlg border-2 border-pigliver-400 rounded-xl"
          variants={sidebar}
        />
        <div className="z-30">
          <ItemList />
        </div>
        <UserDropdownToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  );
};

const UserDropdownA = () => {
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
      <div>
        <div className="absolute dropdown px-2 right-0 border-solid border-pigliver-400">
          <ul className="p-1 bg-pigliver-500 rounded-md text-center">
            <li className="hover:bg-pigliver-600">我的主页</li>
            <li className="hover:bg-pigliver-600">归档</li>
            <li className="hover:bg-pigliver-600" onClick={handleLogout}>
              登出
            </li>
          </ul>
        </div>
        <LoginRequired statesToBeSet={[setIsAuthenticated]} />
      </div>
    );
  }
);

export default UserDropdown;
