import { simpleGet, simplePost } from "./api";

const getAllUser = async () => {
  const parsedData = await simpleGet("/blog/get_all", "getAllUser");
  return parsedData;
};

/* write an api to post a blog with title and content */
const createNewUser = async (fromData) => {
  const parsedData = await simplePost("/user/create", "addUser", fromData);
  return parsedData;
};

const checkLogin = async (fromData) => {
  /* write an api to check if user is logged in */
  /* TODO: Implement this function */

  const parsedData = await simpleGet(
    "/user/verify",
    "checkLogin",
    fromData
  );

  if (parsedData.code !== "200") {
    console.error("[checkLogin] verify failed");
    return { status: "failed" };
  }

  return { status: "success", data: parsedData };
};

const userLogin = async (fromData) => {

  if (fromData.email === "test.f@fail") {
    console.error("[userLogin] login failed");
    return { status: "failed" };
  }

  const parsedData = await simplePost("/user/login", "login", fromData);
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

const userLogout = async (fromData) => {
  /* write an api to logout user */

  // const parsedData = await simplePost("/user/logout", "logout", fromData);
  // clear local storage
  localStorage.removeItem("dualblog-user-token");
  return { status: "success", data: null };
};

export { getAllUser, createNewUser, checkLogin, userLogin, userLogout };
