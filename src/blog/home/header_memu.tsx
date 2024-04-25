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
import { Button } from "src/components/ui/button";
import { ReaderIcon } from "@radix-ui/react-icons";
import UserDropdown from "src/blog/user/user_dropdown";


import "./header_menu.css";

const DbLogo = () => {
    return (
        <div className='flex w-[180px] h-full mr-4'>
            <img src="/index/db_logo/logo-green.png" alt="logo" className='absolute overflow-hidden w-[250px] h-auto top-[-108px]' />
        </div>

    );
}


const HeaderOptions = () => {

    const nav = useNavigate();


    const signUpHandler = () => {
        nav("/signup");
    };

    const readBlogHandler = () => {
        nav("/posts");
    };

    const OptionSpan = ({ text, onClick }) => (
        <MenubarMenu>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='text-md header-menu-option-text px-8' onClick={onClick}>
                {text}
            </motion.div>
        </MenubarMenu>
    );

    return (
        <Menubar className='flex w-fit rounded-[50px] border-white bg-gray-300 opacity-85 h-[54px] px-8 right-12 border-[3px]'>
            <OptionSpan text={"关于"} onClick={null} />
            <OptionSpan text={"注册"} onClick={null} />
            <OptionSpan text={"写博"} onClick={null} />
            <OptionSpan text={"搜索"} onClick={null} />
        </Menubar>
    );
}

const TimelineOption = () => {

    return (
        <Button
            variant='outline'
            className="flex align h-[54px] rounded-[50px] w-[160px] opacity-85 border-[3px] bg-gumi-green"
        >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='header-menu-option-text pl-2'>
                时间线
            </motion.div>
            <ReaderIcon className='mx-2' />
        </Button>
    );
}


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
            <DbLogo />
            <div className="fixed inset-1 z-10 h-fit flex flex-row-reverse items-start justify-start p-4">
                <UserDropdown />

                <TimelineOption />

                <div className='pr-12'>
                    <HeaderOptions />
                </div>

            </div>
        </>
    );

};