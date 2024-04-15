import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";

import { LoginRequired } from "src/blog/user/login";
import "./user_dropdown.css";
import { userLogout } from "src/apis/api_user";

import { MenuItem } from "./user_dropdown_item";
import { UserDropdownToggle } from "./user_dropdown_toggle";
import { useDimensions } from "src/utils/use_dimensions";
import { useNavigate } from "react-router-dom";
import { toast } from "src/components/ui/use-toast";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ItemList = ({ toggleOpen }) => {
  const nav = useNavigate();

  const settingsHandler = () => {
    console.log("settings clicked");
    nav("/settings");
    toggleOpen();
  };

  const logoutHandler = async () => {
    const result = await userLogout({
      token: localStorage.getItem("dualblog-user-token"),
    });
    if (result.status === "success") {
      localStorage.removeItem("dualblog-user-token");

      toast({
        title: "您已登出",
        description: "长路漫漫，惟剑作伴。",
        duration: 2000,
      });
      console.log("[user_dropdown]logging out success");
      nav("/");
      toggleOpen();
    }
  };

  return (
    <motion.ul variants={variants} className="">
      <MenuItem i={0} handler={settingsHandler}>
        关于
      </MenuItem>
      <MenuItem i={1}>归档</MenuItem>
      <MenuItem i={2}>主页</MenuItem>
      <MenuItem i={3}>私信</MenuItem>
      <MenuItem i={4} handler={logoutHandler}>
        登出
      </MenuItem>
    </motion.ul>
  );
};

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
    <div>
      <div className="absolute h-full right-0 top-0 flex">
        <motion.nav
          className="motion-nav"
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
            <ItemList toggleOpen={toggleOpen} />
          </div>
          <UserDropdownToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </div>
      {isOpen && <LoginRequired failCallback={() => toggleOpen()} />}
    </div>
  );
};

export default UserDropdown;
