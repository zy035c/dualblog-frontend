import { motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";

export function Overlay({ isVisible }) {
  const opacity = useMotionValue(0)
  const pointerEvents = useTransform(
    opacity,
    latest => latest < 0.5 ? "none" : "auto"
  )
  
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      style={{ opacity, pointerEvents }}
    />
  )
}