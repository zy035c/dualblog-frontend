import { simpleGet, simplePost } from "./api";
import { blog_mock_data, blog_search_mock_data } from "src/texts/blog_mock_data";
import { getUserInfo } from "./api_user";

const mode = process.env.REACT_APP_MODE;

const getAllBlog = async () => {
  if (mode === "dev") {
    console.log("[getAllBlog] dev check get success");
    return {
      status: "success",
      data: {
        result: blog_mock_data
      }
    };
  }
  let parsedData;
  try {
    parsedData = await simpleGet("/blog/all", "getAllBlog");
  } catch (error) {
    console.error("[getAllBlog] error");
    return { status: "failed", data: { msg: "怪罪给后端。", ok: false } };
  }
  return {
    status: "success",
    data: {
      ok: true,
      result: parsedData
    }
  };
};

/* write an api to post a blog with title and content */
const postNewBlog = async (title, blogContent) => {
  // Form blog json data
  let resp;
  try {
    resp = await getUserInfo({
      token: localStorage.getItem("dualblog-user-token"),
    });
  } catch (error) {
    console.error("[postNewBlog] user info error");
    return { status: "failed", data: { msg: "试试看重新登录吧。", ok: false } };
  }

  if (resp.status !== "success") {
    console.error("[postNewBlog] user info failed");
    return { status: "failed", data: { msg: "试试看重新登录吧。", ok: false } };
  }

  const postJson = {
    title: title,
    content: blogContent,
    author: resp.data.username,
    authorUUID: resp.data.id,
    timestamp: new Date().toISOString(),
    tags: [], // TODO: add tags
  };

  console.log("[postNewBlog] postJson", postJson);

  if (mode === "dev") {
    console.log("[postNewBlog] dev check post success");
    return { status: "success", data: { msg: "模拟成功", ok: true } };
  }

  const parsedData = await simplePost(
    "/blog", 
    "postNewBlog", 
    postJson
  );

  if (parsedData.code !== "200") {
    console.error("[postNewBlog] post failed");
    return { status: "failed", data: { msg: "网络异常中～" } };
  }
  if (!parsedData.data.ok) {
    console.error("[postNewBlog] post failed");
    return { status: "failed", data: { msg: parsedData.data.msg } };
  }
  return { status: "success", data: parsedData.data };
};

const searchBlogsForKeyword = async (keyword) => {
  if (mode === "dev") {
    console.log("[searchForKeyword] dev check post success");
    return { 
      status: "success", 
      data: { 
        msg: "模拟成功", 
        ok: true,
        result: blog_search_mock_data
      } 
    };
  }

  const endpoint = `/blog/search?keyword=${keyword}`;
  const parsedData = await simplePost(
    endpoint, 
    "searchForKeyword", 
    null,
    {}
  );

  if (parsedData.code !== "200") {
    console.error("[postNewBlog] post failed");
    return { status: "failed", data: { msg: "网络异常中～" } };
  }

  return { status: "success", data: {
    ok: true,
    result: parsedData.data
  } };

}

export { getAllBlog, postNewBlog, searchBlogsForKeyword };
