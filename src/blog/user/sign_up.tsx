import { useState } from "react";
import { createNewUser } from "src/apis/api_user";
import { toast } from "src/components/ui/use-toast";
import { sign_up_description } from "src/texts/toast_text";
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
import { Label } from "src/components/ui/label";
import * as React from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";

const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   username: "",
  //   phone: "",
  //   captcha: "",
  // });
  // const [errors, setErrors] = useState({});
  // const nav = useNavigate();

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation
  //   const newErrors = {};
  //   if (
  //     !formData.email ||
  //     !formData.password ||
  //     !formData.confirmPassword ||
  //     !formData.username
  //   ) {
  //     newErrors.required = "Please fill out all required fields.";
  //   }
  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.passwordMatch = "Passwords do not match.";
  //   }
  //   if (!validateEmail(formData.email)) {
  //     newErrors.emailFormat = "Please enter a valid email address.";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //   } else {
  //     // Submit form logic here
  //     console.log("Form submitted:", formData);

  //     const res = await createNewUser(formData);
  //     // console.log("res:", res);
  //     if (res.status === "success") {
  //       console.log("User created successfully:", res);
  //       toast({
  //         title: "注册成功",
  //         description: sign_up_description(true),
  //         duration: 1500,
  //       });
  //       nav("/");
  //     } else if (res.status === "exists") {
  //       console.error("Failed to create user:", res);
  //       toast({
  //         title: "这个邮箱已被注册",
  //         description: sign_up_description(false),
  //         duration: 1500,
  //       });
  //     }
  //   }
  // };

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  return (
    <>
      <RegisterForm />
      {/* <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
          {errors.emailFormat && (
            <p className="text-red-500 text-xs mt-1">{errors.emailFormat}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
          {errors.passwordMatch && (
            <p className="text-red-500 text-xs mt-1">{errors.passwordMatch}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        {/* CAPTCHA service goes here */}
      {/* <div className="mb-4">
          <label
            htmlFor="captcha"
            className="block text-sm font-medium text-gray-700"
          >
            CAPTCHA
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={formData.captcha}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        {errors.required && (
          <p className="text-red-500 text-xs mt-2">{errors.required}</p>
        )} 
      </form> */}
    </>
  );
};


function RegisterForm() {


  const registrationFormSchema = z.object({
    email: z.string().email({ message: "请输入有效的邮箱地址" }),
    password: z.string().min(6, { message: "密码长度至少为6位" }),
    confirmPassword: z.string().min(6),
    userName: z.string().optional(),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
    return ctx;
  });

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      phone: "",
    },
  });

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">注册</CardTitle>
        <CardDescription>
          不过，王者们一定会舍弃王位吧，而无火的余灰们将纷沓而至。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            // onSubmit={() => console.log("submitting")}
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
                        <Input {...field} type="userName" placeholder="Capitalist)_femboy" />
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
                        <Input {...field} type="confirmPassword" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <Button className="w-full">
                创建账号
              </Button> */}
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              {/* <Link href="#" className="underline">
            Sign in
          </Link> */}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
