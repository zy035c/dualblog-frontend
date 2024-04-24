import { simpleGet, simplePost } from "./api";
import { blog_mock_data } from "src/texts/blog_mock_data";

const mode = process.env.REACT_APP_MODE;

const getAllBlog = async () => {
  if (mode === "dev") {
    console.log("[getAllBlog] dev check get success");
    return blog_mock_data;
  }

  const parsedData = await simpleGet("/blog/posts", "getAllBlogPosts");
  return parsedData;
};

/* write an api to post a blog with title and content */
const postNewBlog = async (title, blogContent) => {
  const data = { title, blogContent };
  const parsedData = await simplePost("/blog/posts", "postNewBlog", data);
  return parsedData;
};

export { getAllBlog, postNewBlog };
