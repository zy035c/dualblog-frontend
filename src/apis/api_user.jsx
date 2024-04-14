import { simpleGet, simplePost } from "./api";

const env = process.env.REACT_APP_MODE;

const getAllUser = async () => {
  const parsedData = await simpleGet("/blog/get_all", "getAllUser");
  return parsedData;
};

/* write an api to post a blog with title and content */
const createNewUser = async (formData) => {
  const parsedData = await simplePost("/user/create", "addUser", formData);
  return parsedData;
};

const checkLogin = async (formData) => {
  /* write an api to check if user is logged in */
  /* TODO: Implement this function */
  // print env
  console.log("[checkLogin] env: ", env);
  if (env === "dev") {
    return { status: "success", data: { token: "example-token" }};
  }

  const parsedData = await simpleGet("/user/verify", "checkLogin", formData);

  // const parsedData = { code: "200" };
  if (parsedData.code !== "200") {
    console.error("[checkLogin] verify failed");
    return { status: "failed" };
  }

  return { status: "success", data: parsedData };
};

const userLogin = async (formData) => {
  if (formData.email === "test.f@fail") {
    console.error("[userLogin] login failed");
    return { status: "failed" };
  }

  const parsedData = await simplePost("/user/login", "login", formData);
  // const parsedData = { code: "200", data: { token: "example-token" } };
  console.log("[userLogin] login result", parsedData);

  if (parsedData.code !== "200") {
    console.error("login failed");
    return { status: "failed" };
  }
  console.log("[userLogin] login success");
  return {
    status: "success",
    data: parsedData.data,
  };


  // console.log("[userLogin] login success");
  // return {
  //   status: "success",
  //   token: "example-token",
  // };
};

const userLogout = async (headers) => {
  /* write an api to logout user */

  const parsedData = await simplePost("/user/logout", "logout", null, headers);
  if (parsedData.code !== "200") {
    console.error("[userLogout] logout failed");
    return { status: "failed" };
  }
  return { status: "success" };
};

export { getAllUser, createNewUser, checkLogin, userLogin, userLogout };
