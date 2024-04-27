import { LoginRequired } from "src/blog/user/login";
import BlogEditor from "./write_blog/editor";

const NewPostSignIn = () => {

  return (
    <div>
      <LoginRequired />
      <div className="class m-auto flex-row justify-center items-center">
        <BlogWriter />
      </div>
    </div>
  );
};

const BlogWriter = () => (
  <div className="mt-48">
    <BlogEditor />
  </div>
);

export default NewPostSignIn;
