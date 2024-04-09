import React, { useState, useEffect } from 'react';
import { getAllBlog } from "src/apis/api_blog";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NewPost from "./new_post";


const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        (async () => {
          let data = await getAllBlog();
          setPosts(data);
        })();
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto">

      <Routes>
        <Route path="/newPost" element={<NewPost />} />
      </Routes>

      <h1 className="text-3xl font-bold text-center my-8">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              {/* <p className="text-gray-600 mb-4">Author: {post.author}</p> */}
              <p className="text-gray-800 line-clamp-3">{post.blogContent}</p>
            </div>
          </div>
        ))}

        { /* New Post Button */ }
        <div className="bg-white rounded-md shadow-md overflow-hidden flex justify-center items-center">
          <Link to="./newPost" className="text-4xl text-gray-600 hover:text-gray-800">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-4-4h8" />
              </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Posts;
