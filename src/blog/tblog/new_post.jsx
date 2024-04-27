import { LoginRequired } from "src/blog/user/login";
import PlaygroundPage from "./write_blog/editor";

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
  <div className="mt-36">
    <PlaygroundPage />
  </div>
);

export default NewPostSignIn;
