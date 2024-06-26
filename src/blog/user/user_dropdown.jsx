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
import { logout_description } from "src/texts/toast_text";

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

  const logoutHandler = async () => {
    const result = await userLogout({
      token: localStorage.getItem("dualblog-user-token"),
    });
    if (result.status === "success") {
      localStorage.removeItem("dualblog-user-token");

      toast({
        title: "您已登出",
        description: logout_description(),
        duration: 2000,
      });
      console.log("[user_dropdown]logging out success");
    }
  };

  return (
    <motion.ul variants={variants} className="">
      <MenuItem i={0} url="/settings/profile" children="设置" toggleOpen={toggleOpen}/>
      <MenuItem i={1} url="/catalog" children="归档" toggleOpen={toggleOpen}/>
      <MenuItem i={2} url="/home" children="主页" toggleOpen={toggleOpen}/>
      <MenuItem i={3} url="/messages" children="私信" toggleOpen={toggleOpen}/>
      <MenuItem i={4} url="/" children="登出" handler={logoutHandler} toggleOpen={toggleOpen}/>
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
    <>
      <div className="relative flex min-h-16 min-w-16 overflow-visible">
        <motion.nav
          className="motion-nav flex h-screen"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div
            className="background bg-white opacity-90 shadow-2xlg border-2 border-pigliver-400 rounded-xl"
            variants={sidebar}
          />
          <div
            className="z-30"
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <ItemList toggleOpen={toggleOpen} />
          </div>
          <UserDropdownToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </div>
      {isOpen && <LoginRequired failCallback={() => toggleOpen()} />}
    </>
  );
};

export default UserDropdown;
