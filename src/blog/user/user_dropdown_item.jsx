import { motion } from "framer-motion";
import { shadeColor } from "src/utils/shade_color";
import { useNavigate } from "react-router-dom";

import { cn } from "src/lib/utils";

const variants = {
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

const colors = ["#F95860", "#AAD898", "#FAAF5C", "#FDF791", "#FFFFFF"];

const MenuItem = ({ i, children, url, toggleOpen, handler }) => {
  const nav = useNavigate();

  const style = {
    border: `2px solid ${shadeColor(colors[i], -0.05)}`,
    backgroundColor: shadeColor(colors[i], -0.005),
  };

  const textStyle = {
    border: `2px solid ${shadeColor(colors[i], -0.1)}`,
    backgroundColor: colors[i],
  };

  const onClick = () => {
    console.log(`${children} clicked`);
    if (handler) {
      handler();
    }
    nav(url);
    window.scrollTo(0, 0);
    toggleOpen();
  };

  return (
    <motion.li
      className="motion-li"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="icon-placeholder" style={style} />
      <div
        className="text-placeholder text-center justify-center items-center"
        style={textStyle}
      >
        <p className={cn(
          "dropdown-option-text", 
          i >= 3 ? "text-gray-900" : "text-white" 
        )}
        >{children}</p>
      </div>
    </motion.li>
  );
};

MenuItem.defaultProps = {
  children: "",
  handler: null,
  url: "/",
  toggleOpen: () => {},
};

export { MenuItem };
