import { useState } from "react";
import { postNewBlog } from "apis/api_blog";
import { useNavigate } from "react-router-dom"; // 导入 useHistory 来管理页面历史记录

const NewPostSignIn = ({ isLoggedIn, setIsLoggedIn }) => {
  //   const isLoggedIn = !!localStorage.getItem("dualblog-token");

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(true);
  return (
    <div className="class m-auto flex-row justify-center items-center">
      {isLoginDialogOpen && !isLoggedIn && (
        <LoginPanel setIsLoginDialogOpen={{ setIsLoginDialogOpen }} />
      )}
      <BlogWriter isLoggedIn={{ isLoggedIn }}/>
    </div>
  );
};

const LoginPanel = ({ setIsLoginDialogOpen }) => {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 处理登录逻辑
    console.log("Login logic goes here");
    // put token into local storage

    setIsLoginDialogOpen(false);
  };

  const navigate = useNavigate(); // 获取 history 对象

  return (
    <div className="fixed left-1/2 bg-white px-8 pb-8 rounded-lg shadow-lg flex flex-col w-64">
      {/* 关闭按钮 */}
      <div className="flex flex-row justify-end">
        <button
          className="relative text-xl text-gray-600 hover:text-gray-800 pt-4"
          onClick={() => navigate(-1)} // 点击返回上一页
        >
          &times;
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const BlogWriter = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp = await postNewBlog(title, content);
      console.log(resp);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  return (
    <div
      className={`bg-white p-4 ${
        !isLoggedIn ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-semibold mb-2">
            Content:
          </label>
          <textarea
            id="content"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPostSignIn;
