import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from '../Components/Post'
const url = import.meta.env.VITE_URL;

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    (async () => {
      try {
        const response = await fetch(`${url}/post/getallposts`)

        if (!response.ok) {
          throw new Error('Could not fetch posts')
        }
        const data = await response.json()

        const post = data.posts;
        setPosts(post);

      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    })()

  }, [])

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full ">
        <p className="text-gray-500">No posts available.</p>
      </div>
    )
  }
  else{
    return (
    <>
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
  )
  }
 
}

export default Home