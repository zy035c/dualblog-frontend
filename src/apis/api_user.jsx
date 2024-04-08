import { simpleGet, simplePost } from "./api";

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

  const parsedData = await simpleGet("/user/verify", "checkLogin", formData);

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
  console.log("[userLogin] login result", parsedData);

  if (parsedData.code !== "200") {
    console.error("login failed");
    return { status: "failed" };
  } else {
    console.log("[userLogin] login success");
    return {
      status: "success",
      token: parsedData.data.token,
    };
  }

  // console.log("[userLogin] login success");
  // return {
  //   status: "success",
  //   token: "example-token",
  // };
};

const userLogout = async (formData) => {
  /* write an api to logout user */

  // const parsedData = await simplePost("/user/logout", "logout", formData);
  // clear local storage
  localStorage.removeItem("dualblog-user-token");
  return { status: "success", data: null };
};

export { getAllUser, createNewUser, checkLogin, userLogin, userLogout };
