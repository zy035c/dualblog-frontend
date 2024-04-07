import { simpleFetch, simplePost } from "./api";

const getAllUser = async () => {
  const parsedData = await simpleFetch("/blog/get_all", "getAllUser");
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

  // const parsedData = await simplePost(
  //   "/user/check_login",
  //   "checkLogin",
  //   fromData
  // );
  const parsedData = null;
  return { status: "success", data: parsedData };
};

const userLogin = async (fromData) => {
  /* TODO: Implement this function */
  const parsedData = await simplePost("/user/login", "login", fromData);
  console.log("login result", parsedData);

  if (parsedData.code !== 200) {
    console.error("login failed");
    return { status: "failed" };
  } else {
    console.log("login success");
    return {
      status: "success",
      token: parsedData.token,
    };
  }
};

const userLogout = async (fromData) => {
  /* write an api to logout user */

  // const parsedData = await simplePost("/user/logout", "logout", fromData);
  return { status: "success", data: null };
};

export { getAllUser, createNewUser, checkLogin, userLogin, userLogout };
