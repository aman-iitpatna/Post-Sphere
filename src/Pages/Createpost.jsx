import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';

const url = import.meta.env.VITE_URL;

function Createpost() {

  const id = localStorage.getItem('uid');
  const isLoggedIn = localStorage.getItem('uid') != undefined || null;

  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview('')
      return
    }
  
    const previewUrl = URL.createObjectURL(selectedImage)
    setImagePreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [selectedImage])

  function handleImageChange(event){
    const image = event.target.files?.[0]
    if(image){
      setSelectedImage(image);
      
    }
  };

  const uploadPost = async() => {
    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title.trim());

    if (selectedImage) {
      formData.append("postImage", selectedImage);
    }

    try {
      const response = await axios.post(`${url}/post/createpost`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    if(response.status == 404){
      setUploadMessage("Invalid Username")
    }

    if(response.status == 201){
      window.location.assign('/');
    }
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
    
  };


  if(isLoggedIn == true){
    return(
      <>
      <div className='min-h-[calc(100vh-140px)] bg-[#fafafa] px-4 py-10 text-[#8b5d40] sm:px-6 sm:py-14'>
        <div className="mx-auto max-w-2xl">
          <label htmlFor="post-title" className="mb-2 block text-sm font-semibold text-[#533a2a]">Title <span className="text-[#c46d39">*</span></label>
          <input
              id="post-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your post a title"
              required
              className=" min-h-12 w-full rounded-md border border-[#ecd9c7] bg-[#fffdfa] px-3.5 text-sm outline-none transition placeholder:text-[#b7a596] focus:border-[#d58a58] focus:ring-2 focus:ring-[#d58a58]/15"
            />
          <div className="mb-7 mt-1.5 text-right text-[11px] text-[#a99687]">{title.length}/90</div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="sr-only" aria-label="Select an image" />
          <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`group relative flex aspect-4/3 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed text-center transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bd7444] ${imagePreview ? 'border-transparent bg-[#fff7ed]' : 'border-[#e6c8ae] bg-[#fffaf5] hover:border-[#d99a6d] hover:bg-[#fff4e9]'}`}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Selected post preview" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute bottom-4 rounded-full bg-[#39291f]/85 px-4 py-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">Change image</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-[#533a2a]">Select an image</span>
                  <span className="mt-1 text-xs text-[#a18a78]">Browse files on your device</span>
                </>
              )}
          </button>
          <div className="mt-7 border-t border-[#f1e6dc] pt-5">
              {uploadMessage && <p role="status" className="mb-3 text-xs font-medium text-[#a96032]">{uploadMessage}</p>}
              <button
                onClick={uploadPost}
                disabled={!title.trim() || uploading == true}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c8753f] px-5 text-sm font-semibold text-white transition hover:bg-[#a95e30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd7444] disabled:cursor-not-allowed disabled:bg-[#dfc2aa]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V3.75m0 0L7.5 8.25M12 3.75l4.5 4.5M4.5 15v3.75A1.5 1.5 0 0 0 6 20.25h12a1.5 1.5 0 0 0 1.5-1.5V15"/></svg>
                Upload post
              </button>
          </div>
        </div>
      </div>
      </>
      
    )
  }else{
    return(
      <>
      <div className='flex min-h-[calc(150px)] items-center justify-center'>
        <h1 className='text-2xl text-red-500  font-semibold' > <span> <Link to="/login">Login</Link></span> To Create Post </h1>
      </div>
      </>
    )
  }
}

export default Createpost