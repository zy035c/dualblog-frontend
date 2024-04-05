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

export { getAllUser, createNewUser };
