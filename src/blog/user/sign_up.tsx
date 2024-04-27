"use client"

import { useState } from "react";
import { createNewUser } from "src/apis/api_user";
import { toast } from "src/components/ui/use-toast";
import { sign_up_description, random_fail_description } from "src/texts/toast_text";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import * as React from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "src/components/ui/alert-dialog"

const SignUp = () => (<RegisterForm />);

const RegisterForm = () => {

  const [showDialog, setShowDialog] = useState(false);

  const nav = useNavigate();

  const registrationFormSchema = z.object({
    email: z.string().email({ message: "请输入有效的邮箱地址" }).max(48),
    password: z.string().min(6, { message: "密码长度至少为6位" }).max(48),
    confirmPassword: z.string(),
    userName: z.string().max(48),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      console.log("密码不一致。");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "密码不一致",
        path: ["confirmPassword"]
      });
    }
  });

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      phone: "",
      firstName: "",
      lastName: "",
      confirmPassword: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    console.log("Form submit values:", values);
    setShowDialog(true);
  };

  const handleCreateUser = async () => {

    const values = form.getValues();

    const res = await createNewUser(values);

    if (res.status === "success") {
      console.log("User created successfully:", res);
      toast({
        title: "注册成功",
        description: sign_up_description(true),
        duration: 1800,
      });
      nav("/");
    } else if (res.status === "exists") {
      console.error("Failed to create user:", res);
      toast({
        title: "这个邮箱已被注册",
        description: sign_up_description(false),
        duration: 1800,
      });
    } else {
      console.error("Failed to create user:", res);
      toast({
        title: "注册失败",
        description: random_fail_description(),
        duration: 1500,
      });
    }
    setShowDialog(false);
    form.reset();
  };

  return (
    <>
      <Card className="mx-auto max-w-md mt-36">
        <CardHeader>
          <CardTitle className="text-xl">请注册。</CardTitle>
          <CardDescription>
            不过，王者们一定会舍弃王位吧，而无火的余灰们将纷沓而至。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid gap-4">

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="lastName" placeholder="Karl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="lastName" placeholder="Marx" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>电子邮箱</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="proletarian@bishop.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名</FormLabel>
                        <FormControl>
                          <Input {...field} type="userName" placeholder="salvare000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>手机号</FormLabel>
                        <FormControl>
                          <Input {...field} type="phone" placeholder="114514" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
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
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <motion.div
                  whileTap={{ scale: 0.99 }}
                  whileHover={{ scale: 1.01 }} >
                  <Button className="w-full" type="submit">
                    创建账号
                  </Button>
                </motion.div>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account? Sign in
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确定要创建帐号吗?</AlertDialogTitle>
            <AlertDialogDescription>
              将为 {form.getValues("email")} 创建帐号。<br /><br />
              您正在成功！
              好东西就要来了。<i>dblog</i>可让您长时间跟进重要事宜。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateUser}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SignUp;
