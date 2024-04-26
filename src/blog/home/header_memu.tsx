import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menubar,
    MenubarMenu,
} from "src/components/ui/menubar"
import { motion } from "framer-motion";
import { Button } from "src/components/ui/button";
import { ReaderIcon } from "@radix-ui/react-icons";
import UserDropdown from "src/blog/user/user_dropdown";


import "./header_menu.css";

const DbLogo = () => {

    const [shaking, setShaking] = React.useState(false);
    const nav = useNavigate();

    const onClick = () => {
        console.log("yes");
        setShaking(true);
        setTimeout(() => {
            setShaking(false);
        }, 200);
        nav("/");
    }

    const variants = {
        shaking: { rotate: [-2.2, 2.2, -2.2], transition: { duration: 0.16, repeat: Infinity, ease: "linear" } },
        // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
        stop: { rotate: 0 }
    };


    return (
        <motion.div className='fixed inset-x-8 inset-y-3 overflow-hidden z-30 h-fit w-fit cursor-pointer select-none' whileHover={{ scale: 1.03 }} variants={variants} onClick={onClick} animate={shaking ? 'shaking' : 'stop'}>
            <img
                src="/index/db_logo/logo-green.png"
                alt="logo"
                className='flex overflow-hidden w-[230px] h-[110px] object-center object-cover select-none' />
        </motion.div>
    );
}


const HeaderOptions = () => {
    const nav = useNavigate();
    const OptionSpan = ({ text, path }) => {
        const onClick = () => {
            nav(path);
        }
        return (
            <MenubarMenu>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='text-md header-menu-option-text flex-grow text-center lg:px-8 md:text-sm lg:text-lg' onClick={onClick}>
                    {text}
                </motion.div>
            </MenubarMenu>
        );
    };

    return (
        <Menubar className='flex rounded-[50px] border-white bg-gray-300 opacity-85 h-[48px] md:w-72 lg:w-fit px-8 border-[3px] items-center justify-center flex-row'>
            <OptionSpan text={"关于"} path={"/about"} />
            <OptionSpan text={"注册"} path={"signup"} />
            <OptionSpan text={"写博"} path={"write_post"} />
            <OptionSpan text={"搜索"} path={""} />
        </Menubar>
    );
}

const TimelineOption = () => {
    const nav = useNavigate();
    return (
        <Button
            variant='outline'
            className="flex align h-[48px] rounded-[50px] w-auto opacity-85 border-[3px] bg-gumi-green md:text-sm lg:text-lg"
            onClick={() => nav("/posts")}
        >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='header-menu-option-text pl-3'>
                时间线
            </motion.div>
            <ReaderIcon className='mx-2' />
        </Button>
    );
}

const MainPageOption = () => {
    const nav = useNavigate();
    return (
        <Button
            variant='outline'
            className="flex align h-[48px] rounded-[50px] w-[100px] opacity-85 border-[3px] bg-gumi-orange md:text-sm lg:text-lg"
            onClick={() => nav("/")}
        >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='header-menu-option-text text-center align-text-top'>
                主页
            </motion.div>
            {/* <ReaderIcon className='mx-2' /> */}
        </Button>
    );
}


export function HeaderMenu() {
    return (
        <>
            <DbLogo />
            <div className="fixed inset-1 inset-y-3 z-20 h-fit flex flex-row-reverse items-start justify-start p-4">
                <UserDropdown />
                <div className='lg:mr-12 md:mr-5'>
                    <TimelineOption />
                </div>
                <div className='lg:mr-10 md:mr-4'>
                    <MainPageOption />
                </div>
                <div className='lg:mr-12 md:mr-5'>
                    <HeaderOptions />
                </div>

            </div>
        </>
    );

};