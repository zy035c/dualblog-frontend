import React, { useState, useEffect } from "react";
import { getAllBlog } from "src/apis/api_blog";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NewPost from "./new_post";
import { Feed } from "./feed/feed";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        (async () => {
          let resp = await getAllBlog();
          setPosts(resp.data.result);
        })();
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto pt-48">
      <Feed blogs={posts} />
    </div>
  );
};

export default Posts;
