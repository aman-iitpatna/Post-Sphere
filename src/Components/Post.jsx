import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

import "../Css/Post.css";

import defaultUserAvatar from "../Assect/userAvatar.png";
import { Link } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const uid = localStorage.getItem("uid");
  const userAvatar = post.user.avatar;
  const postImage = post.image;

  const isLiked = post.like.includes(uid) ? true : false;
  const [liked, setLikes] = useState(isLiked);
  const [totalLikes, setTotalLikes] = useState(post.like.length);

  const isAuthor = post.user._id === uid ? true : false;
  
  const setLike = async () => {

    if (!uid) {
      navigate("/login");
      return;
    }
    const action = liked ? "remove" : "add";
    
    try {
      await fetch(`${url}/post/setlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ 
        "userid": uid,
        "postid": post._id,
        "action": action })
      })
      .then((res) => {
        if (res.status == 200) {
          if (action == "add") {
            setLikes(true);
            setTotalLikes(totalLikes + 1);
          } 
          else {
            setLikes(false);
            setTotalLikes(totalLikes - 1);
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="post-card">
      <header className="post-card__header">
        <Link to = {`/page/${post.user.username}`}>
          {userAvatar ? (
            <img className="post-card__avatar" src={userAvatar} alt="" />
          ) : (
            <span>
              <img className="post-card__avatar" src={defaultUserAvatar} alt="" />
            </span>
          )}
        </Link>
        <span className="post-card__username">{post.user.username}</span>
        {isAuthor && (
          <Link to= "/editpost" className="post-card__edit">
            Edit
          </Link>
        )}
      </header>
      <hr />
      <div>
        <div>
          <h1 className="post-card__content">{post.title}</h1>
        </div>
        {postImage && (
          <img className="post-card__image" src={postImage} alt="" />
        )}
      </div>
      <hr />
      <footer className="post-card__footer">
        <button className="post-card__like" 
        type="button" 
        onClick={setLike}>
          <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
          <span>{totalLikes} likes</span>
        </button>
      </footer>
    </article>
  );
}

export default Post;
