"use client"

import { cn } from "src/utils/utils"
import { buttonVariants } from "src/components/ui/button"
import { Link } from "react-router-dom"
import * as React from 'react';
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion";

import "./sidebar-nav.css";
import { useAnimationControls } from "framer-motion";


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation();
  const { pathname } = location;
  const pathstr = './' + pathname.split('/').pop();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 mt-6",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavItem key={item.href} item={item} pathstr={pathstr} />
      ))}
    </nav>
  )
}

const NavItem = ({ item, pathstr }) => {

  const controls = useAnimationControls();
  const pRef = React.useRef<HTMLParagraphElement>(null);

  const animTime = 0.25;

  const UnderlineIn = async () => {
    await controls.stop();

    await controls.start({
      width: pRef.current.offsetWidth,
      transition: {
        duration: animTime,
        ease: "easeOut",
      }
    })
  }

  const UnderlineOut = async () => {
    await controls.stop();
    await controls.start({
      width: 0,
      transition: {
        duration: animTime,
        ease: "easeOut",
      }
    })
  }

  const variants = {
    select: {
      color: "#dddddd",
      transition: {
        duration: animTime / 2,
        ease: "easeOut",
      }
    },
    unselect: {
      color: "#000000",
      transition: {
        duration: animTime / 2,
        ease: "easeOut",
      }
    }
  }

  return (<motion.div
    className="text-black text-lg h-16 w-fit relative px-4"
    initial={{ y: 20, opacity: 0.4 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      }
    }}
    whileHover={{
      x: 12,
      transition: {
        duration: animTime,
        ease: "easeIn",
      }
    }}
    onMouseEnter={UnderlineIn}
    onMouseLeave={UnderlineOut}
  >
    <Link
      key={item.href}
      to={item.href}
      className="justify-start"
    >
      <motion.p 
        className="text-4xl settings-option" 
        ref={pRef}
        variants={variants}
        animate={pathstr === item.href ? "select" : "unselect"}
      >
        {item.title}
      </motion.p>
      <motion.div
        className="absolute bg-theme-color-1 h-6 z-[-1] translate-y-[-16px]"
        animate={controls}
        initial={{ width: "0em" }}
      >

      </motion.div>
    </Link>
  </motion.div>
  );
}