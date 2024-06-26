import { simpleGet, simplePost } from "./api";

const mode = process.env.REACT_APP_MODE;

const getAllUser = async () => {
  const parsedData = await simpleGet("/blog/get_all", "getAllUser");
  return parsedData;
};

/* write an api to post a blog with title and content */
const createNewUser = async (formData) => {
  console.log("[createNewUser] formData", formData);
  if (mode === "dev") {
    console.log("[createNewUser] dev check create success");
    return { status: "success" };
  }
  const parsedData = await simplePost("/user/create", "addUser", formData, {});
  console.log("[createNewUser] create result", parsedData);

  if (parsedData.code === "409") {
    console.error("[createNewUser] user already exists");
    return { status: "exists" };
  } else if (parsedData.code !== "200") {
    console.error("[createNewUser] create failed");
    return { status: "failed" };
  }

  return { status: "success" };
};

const checkLogin = async (headers) => {
  /* write an api to check if user is logged in */
  /* TODO: Implement this function */
  console.log("[checkLogin] mode: ", mode);
  if (mode === "dev") {
    console.log("[checkLogin] dev check login success");
    return { status: "success", data: { token: "example-token" } };
  }

  const parsedData = await simpleGet("/user/verify", "checkLogin", headers);

  if (parsedData.code !== "200") {
    console.error("[checkLogin] verify failed");
    return { status: "failed" };
  }

  return { status: "success", data: parsedData };
};

const userLogin = async (formData) => {
  if (formData.email === "test@fail.com") {
    console.error("[userLogin] login failed");
    return { status: "failed" };
  }

  if (mode === "dev") {
    console.log("[userLogin] dev login success");
    return { status: "success", data: { token: "example-token" } };
  }

  const parsedData = await simplePost("/user/login", "login", formData);
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
};

const userLogout = async (headers) => {
  /* write an api to logout user */

  if (mode === "dev") {
    console.log("[userLogout] dev logout success");
    return { status: "success" };
  }

  const parsedData = await simpleGet("/user/logout", "logout", headers);
  if (parsedData.code !== "200") {
    console.error("[userLogout] logout failed");
    return { status: "failed" };
  }
  return { status: "success" };
};

const deleteAccount = async (headers) => {
  if (mode === "dev") {
    console.log("[deleteAccount] dev delete success");
    return { status: "success" };
  }

  const parsedData = await simpleGet("/user/delete", "delete", headers);
  if (parsedData.code !== "200") {
    console.error("[deleteAccount] delete failed");
    return { status: "failed" };
  }
  return { status: "success" };
};

const getUserInfo = async (headers) => {
  if (mode === "dev") {
    console.log("[getUserInfo] dev get user info success");
    return { status: "success", data: {} };
  }

  const parsedData = await simpleGet("/user", "getUserInfo", headers);

  if (parsedData.code !== "200") {
    console.error("[getUserInfo] get user info failed");
    return { status: "failed" };
  }
  return { status: "success", data: parsedData.data };
}

export {
  getAllUser,
  createNewUser,
  checkLogin,
  userLogin,
  userLogout,
  deleteAccount,
  getUserInfo
};
