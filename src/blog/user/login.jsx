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

const LoginPanel = ({ setLoginPanelOpen }) => {
  const panelVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // 处理登录逻辑
    console.log("[handleLoginSubmit] Login logic goes here");
    // put token into local storage

    const result = await userLogin(formData);
    console.log("token: ", result.token);
    if (result.status === "success") {
      localStorage.setItem("dualblog-user-token", result.token);
      // setIsAuthenticated(true);
      setLoginPanelOpen(false);
    } else {
      console.error("[handleLoginSubmit] Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // 获取 history 对象

  return (
    <motion.div
      className="fixed left-1/2 bg-pigliver-300 pl-8 pb-8 pr-8 rounded-lg flex flex-col w-64 z-50 opacity-0 border-3 border-gumi-red shadow-xl"
      variants={panelVariants}
    >
      {/* 关闭按钮 */}
      <div className="flex flex-row justify-end right-0 top-0 w-full pt-3 translate-x-5">
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.09 }}
          className="bg-gumi-red rounded-full h-5"
        >
          <button
            className="flex text-gumi-white hover:text-gumi-yellow w-8 h-8 items-center justify-center right-0 text-center text-3xl translate-y-[-7.5px] translate-x-[0.5px]"
            onClick={() => {
              setLoginPanelOpen(false);
              navigate("/");
            }} // 点击返回上一页
          >
            &times;
          </button>
        </motion.div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-left text-pretty text-pigliver-700">
        登录
      </h2>

      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded-md h-8"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full h-8"
          required
        />
        <label className="py-0 text-sm text-pigliver-600">忘记密码？</label>
        <motion.button
          type="submit"
          className="bg-pigliver-400 text-pigliver-800 py-2 px-4 rounded-md hover:bg-pigliver-500 w-fit items-end h-10 font-bold text-center"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.09 }}
        >
          O.K.
        </motion.button>
      </form>
    </motion.div>
  );
};

const LoginRequired = ({ statesToBeSet }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loginPanelOpen, setLoginPanelOpen] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    (async () => {
      if (!isAuthenticated) {
        const isLogin = await checkLoginStatus();
        console.log("[LoginRequired] isLogin: ", isLogin);
        if (isLogin) {
          setIsAuthenticated(true);
          setLoginPanelOpen(false);
        } else {
          setIsAuthenticated(false);
          setLoginPanelOpen(true);
        }
      }
    })();
    // }, 500);
  }, [isAuthenticated]);

  return (
    <motion.div animate={loginPanelOpen ? "open" : "closed"}>
      <LoginPanel setLoginPanelOpen={setLoginPanelOpen} />
      <div // if not login, add a darken overlay to the page, and make it unclickable
        className={`fixed inset-0 bg-black opacity-50 z-40 ${
          !loginPanelOpen && "hidden"
        }`}
      ></div>
    </motion.div>
  );
};

LoginRequired.defaultProps = {
  statesToBeSet: [],
  // children: null,
};

export { LoginRequired, checkLoginStatus };
