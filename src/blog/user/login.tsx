"use client"

import * as React from 'react';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { checkLogin, userLogin } from "src/apis/api_user";
import { useNavigate } from "react-router-dom"; // 导入 useHistory 来管理页面历史记录
import { toast } from "src/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { login_description, login_failed_description, logout_description } from 'src/texts/toast_text';

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

const loginFormSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  password: z.string().min(6, { message: "密码长度至少为6位" }),
});

const LoginPanel = ({ setLoginPanelOpen, failCallback, handleLoginSubmit }) => {
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

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <motion.div
      className="bg-pigliver-300 pl-8 pb-8 pr-8 rounded-lg flex flex-col w-64 opacity-0 border-3 border-gumi-red shadow-xl translate-y-[-100px] z-50"
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
            className="flex text-gumi-white hover:text-gumi-yellow w-8 h-8 items-center justify-center right-0 text-center text-3xl translate-y-[-7.8px] translate-x-[0.3px]"
            onClick={() => {
              setLoginPanelOpen(false);
              failCallback();
              navigate("/");
            }} // 点击返回"/"
          >
            &times;
          </button>
        </motion.div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-left text-pretty text-pigliver-700">
        登录
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="tanaka@mail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <motion.button
            type="submit"
            className="bg-pigliver-400 text-pigliver-800 py-2 px-4 rounded-md hover:bg-pigliver-500 w-fit items-end h-10 font-bold text-center cursor-pointer"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
          >
            O.K.
          </motion.button>
        </form>
      </Form>
    </motion.div>
  );
};

const LoginRequired = ({ successCallback, failCallback, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPanelOpen, setLoginPanelOpen] = useState(false);

  useEffect(() => {
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
  }, [isAuthenticated, successCallback]);

  const handleLoginSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    // 处理登录逻辑
    console.log("[handleLoginSubmit] formData", values);
    console.log("[handleLoginSubmit] Login logic goes here");
    // put token into local storage

    const result = await userLogin(values);
    if (result.status === "success") {
      console.log("[handleLoginSubmit] Token: ", result.data.token);
      localStorage.setItem("dualblog-user-token", result.data.token);
      setIsAuthenticated(true);
      setLoginPanelOpen(false);
      successCallback();
      toast({
        title: "登录成功",
        description: login_description(),
        duration: 1500,
      });
    } else {
      console.error("[handleLoginSubmit] Login failed");
      toast({
        title: "登录失败，请检查用户名和密码",
        description: login_failed_description(),
        duration: 1500,
      });
    }
  };

  return (
    loginPanelOpen && (
      <div className="absolute items-center justify-center">
        <motion.div
          animate={loginPanelOpen ? "open" : "closed"}
          className="absolute flex justify-center items-center w-screen h-screen"
        >
          <LoginPanel
            setLoginPanelOpen={setLoginPanelOpen}
            failCallback={failCallback}
            handleLoginSubmit={handleLoginSubmit}
          />

          <div // if not login, add a darken overlay to the page, and make it unclickable
            className={`fixed inset-0 bg-black opacity-50 z-40`}
          ></div>
        </motion.div>
      </div>
    )
  );
};

LoginRequired.defaultProps = {
  successCallback: () => { },
  failCallback: () => { },
  children: null,
};

export { LoginRequired, checkLoginStatus };
