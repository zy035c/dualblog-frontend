import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { checkLogin, userLogin } from "apis/api_user";
import { useNavigate } from "react-router-dom"; // 导入 useHistory 来管理页面历史记录

const checkLoginStatus = async () => {
  // get dualblog-user-token from local storage
  const token = localStorage.getItem("dualblog-user-token");
  // if token is not null, return true
  if (!token) {
    return false;
  }

  const result = await checkLogin({ token: token });
  return result.status === "success";
};

const LoginRequired = ({ children, statesToBeSet }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loginPanelOpen, setLoginPanelOpen] = useState(true);

  const LoginPanelRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        const isLogin = await checkLoginStatus();
        if (isLogin) {
          setIsAuthenticated(true);
          setLoginPanelOpen(false);
        } else {
          setIsAuthenticated(false);
          setLoginPanelOpen(true);
        }
      }
    })();
  }, [isAuthenticated]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // 处理登录逻辑
    console.log("Login logic goes here");
    // put token into local storage

    const result = await userLogin(e.formData);
    if (result.status === "success") {
      localStorage.setItem(
        "dualblog-user-token",
        result.data["dualblog-user-token"]
      );
      setIsAuthenticated(true);
      setLoginPanelOpen(false);

      statesToBeSet.forEach((setter) => {
        setter(true);
      });
    } else {
      console.error("Login failed");
    }
  };

  const navigate = useNavigate(); // 获取 history 对象

  return (
    <div className="">
        {!isAuthenticated && loginPanelOpen && (
          <div
            className="fixed left-1/2 bg-white px-8 pb-8 rounded-lg shadow-lg flex flex-col w-64 z-50"
            ref={LoginPanelRef}
          >
            {/* 关闭按钮 */}
            <div className="flex flex-row justify-end">
              <button
                className="relative text-xl text-gray-600 hover:text-gray-800 pt-4"
                onClick={() => {
                  setLoginPanelOpen(false);
                  navigate("/");
                }} // 点击返回上一页
              >
                &times;
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        )}
        <motion.div
        ref={LoginPanelRef}
        className="dropdown"
        animate={loginPanelOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>
        <div // if not login, add a darken overlay to the page, and make it unclickable
          className={`fixed inset-0 bg-black opacity-50 z-40 ${
            !loginPanelOpen && "hidden"
          }`}
        ></div>
      <div className="z-20">{children}</div>
    </div>
  );
};

export { LoginRequired, checkLoginStatus };
