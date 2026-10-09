import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import '../Css/Page.css'

const url = import.meta.env.VITE_URL;

import Post from "../Components/Post"
import defaultUserAvatar from "../Assect/userAvatar.png";

function Page() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const [userName, setUsername] = useState("username");
  const [fullname, setFullname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [total_post, setTotalPost] = useState(10);

  useEffect(() => {
    
    (async() =>{
      
      try {
      const data = await fetch(`${url}/user/userdata/${id}`);
      console.log("Step 3");
      const jsonData = await data.json();
      
      setUsername(jsonData.username);
      setFullname(jsonData.fullname || "");
      setAvatar(jsonData.avatar ? jsonData.avatar : defaultUserAvatar);
      
      setTotalPost(jsonData.posts);

    
    } catch (error) {
      console.log("Failed to fetch userdata");
    }
    })();

    (async () => {
      try {

        const response = await fetch(`http://localhost:8000/post/user/${id}`);

        if (!response.ok) {
          throw new Error("Could not fetch posts");
        }
        const data = await response.json();
        
        const post = data.posts;
        setPosts(post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    })();
  }, [])
  

  if (!posts || posts.length === 0) {
    return (
      <>
      <div className="Header">
        <div className="box-1">
          <img src={avatar || defaultUserAvatar} alt="img" className="page-user-logo"/>
        </div>
        <div className="box-2">
          <h1 className="username">{userName}</h1>
          <h1 className="total-posts">{total_post} posts</h1>
        </div>
      </div>
      <div className="flex justify-center items-center w-full ">
        <p className="text-gray-500">No posts available.</p>
      </div>
      </>
    )
  }
  else {

    return (
      <>
      <div className="Header">
        <div className="box-1">
          <img src={avatar || defaultUserAvatar} alt="img" className="page-user-logo"/>
        </div>
        <div className="box-2">
          <h1 className="username">{userName}</h1>
          <h1 className="total-posts">{total_post} posts</h1>
        </div>
      </div>
      <div>
        {
          posts.map((post, index) => (
            <Post
              key={post?._id ?? post?.id ?? `post-${index}`}
              post={post}
            />
          ))
        }
      </div>
    </>
    );
  }
}

export default Page;
