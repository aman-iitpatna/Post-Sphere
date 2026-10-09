import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const url = import.meta.env.VITE_URL;

import edit from '../Assect/edit.png'
import like from '../Assect/like.png'
import page from '../Assect/page.png'
import defaultUserAvatar from "../Assect/userAvatar.png";



function User() {

  const [userName, setUsername] = React.useState("")
  const [fullName, setFullname] = React.useState("")
  const [avatar, setAvatar] = useState("");
  const [totalpost, setTotalpost] = useState(10);

  const uid = localStorage.getItem('uid');

  if (uid == undefined){
    window.location.assign('/login');
  }

  async function userData() {
    try {
      const data = await fetch(`${url}/user/userdata/${uid}`)
      const jsonData = await data.json();
      
      setUsername(jsonData.username)
      setFullname(jsonData.fullname || "");
      setAvatar(jsonData.avatar || defaultUserAvatar);
      setTotalpost(jsonData.posts);
      
    } catch (error) {
      console.log("Failed to fetch userdata");
    }
  }

  useEffect(() => {
    userData(); 
  }, [])

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-stone-100 px-5 py-12 sm:px-8">
      <section className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-xl shadow-stone-300/40">
        <div className="bg-stone-900 px-6 py-8 text-stone-100 sm:px-10">
          <div className="flex items-center gap-5">
            <img
              src={avatar || defaultUserAvatar}
              alt="Channel avatar"
              className="h-24 w-24 shrink-0 rounded-full border-4 border-amber-400 object-cover shadow-lg"
            />
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Profile</p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{fullName}</h1>
              <span className="mt-1 text-stone-400">@{userName}</span>
              <span className='mt-1 text-stone-400 ml-2.5'> {totalpost} Posts</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-6 sm:p-8">
          <Link>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 px-5 py-4 text-left font-bold text-stone-800 transition hover:border-amber-400 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 my-3"
            >
              <img src={edit} alt="" className="h-8 w-8 rounded-md object-cover" />
              <span>Edit Profile</span>
              <span className="ml-auto text-xl text-stone-400" aria-hidden="true">&#8594;</span>
            </button>
          </Link>

          <Link to={`/page/${userName}`}>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 px-5 py-4 text-left font-bold text-stone-800 transition hover:border-amber-400 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 my-3"
            >
              <img src={page} alt="" className="h-8 w-8 rounded-md object-cover" />
              <span>Your Page</span>
              <span className="ml-auto text-xl text-stone-400" aria-hidden="true">&#8594;</span>
            </button>
          </Link>

          <Link>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 px-5 py-4 text-left font-bold text-stone-800 transition hover:border-amber-400 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 my-3"
            >
              <img src={like} alt="" className="h-8 w-8 rounded-md object-cover" />
              <span>Liked Post</span>
              <span className="ml-auto text-xl text-stone-400" aria-hidden="true">&#8594;</span>
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default User