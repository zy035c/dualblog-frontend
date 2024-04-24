import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "src/components/ui/menubar"
import { motion } from "framer-motion";
import "./header_menu.css";

export function HeaderMenu() {

    const nav = useNavigate();

    const signUpHandler = () => {
        nav("/signup");
    };

    const readBlogHandler = () => {
        nav("/posts");
    };

    return (
        <>
            <div className="fixed inset-1 z-10 h-20 flex flex-row items-start justify-start p-4">
                <div className='flex w-[180px] h-full mr-4'>
                    <img src="/index/dualblog_logo.png" alt="logo" className='absolute overflow-hidden w-[180px] h-auto top-[-108px]' />
                </div>

                <Menubar className='flex w-fit rounded-3xl border-white bg-gray-300 opacity-85 h-[48px] px-8 right-12'>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-2">
                        <MenubarMenu>
                            <MenubarTrigger className='text-md'>关于</MenubarTrigger>

                        </MenubarMenu>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-2">
                        <MenubarMenu>
                            <MenubarTrigger onClick={signUpHandler} className='text-md'>注册</MenubarTrigger>

                        </MenubarMenu>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-2">
                        <MenubarMenu>
                            <MenubarTrigger onClick={readBlogHandler} className='text-md'>时间线</MenubarTrigger>

                        </MenubarMenu>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-2">
                        <MenubarMenu>
                            <MenubarTrigger className='text-md'>写博</MenubarTrigger>

                        </MenubarMenu>
                    </motion.div>
                </Menubar>
            </div>
        </>
    );

};