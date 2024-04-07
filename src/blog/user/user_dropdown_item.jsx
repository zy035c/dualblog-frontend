import { motion } from "framer-motion";
import { shadeColor } from "utils/shade_color";

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

export const MenuItem = ({ i, children }) => {
  const style = {
    border: `2px solid ${shadeColor(colors[i], -0.05)}`,
    backgroundColor: shadeColor(colors[i], -0.005),
  };


  const textStyle = {
    border: `2px solid ${shadeColor(colors[i], -0.1)}`,
    backgroundColor: colors[i],
  }

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style} />
      <div className={`text-placeholder text-pigliver-950 text-center font-mono justify-center items-center`} style={textStyle}> {children} </div>
    </motion.li>
  );
};
