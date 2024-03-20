import { useState } from 'react';
import { postNewBlog } from "apis/api_blog";

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp = await postNewBlog(title, content);
      console.log(resp);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">Title:</label>
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
          <label htmlFor="content" className="block text-lg font-semibold mb-2">Content:</label>
          <textarea
            id="content"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
