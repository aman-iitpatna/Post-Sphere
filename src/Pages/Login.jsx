import React from 'react'
import { useNavigate } from 'react-router-dom'

const url = import.meta.env.URL;

function Login() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  if(localStorage.getItem('uid') != undefined){
    window.location.assign('/user');
  }

  const handleLogin = async () => {
    if(username == "" || password == ""){
      setError("Username or password is empty")
      return
    }

    const response = await fetch(`${url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if(response.status == 400){
        setError("Incorrect Username")
      }
      if(response.status == 401){
        setError("Incorrect Password")
      }

      if(response.status == 200)
      {
        localStorage.setItem("uid", data.user);
        // navigate('/');
        window.location.assign('/');
      }

  };

  const handleSignUP = async () => {
    console.log(username, password);
    
    if(username == "" || password == ""){
      setError("Username or password is empty")
      return
    }

    const response = await fetch(`${url}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if(response.status == 300){
        setError("Username already exits")
      }

      if(response.status == 200)
      {
        localStorage.setItem("uid", data.user);
        window.location.assign('/');
      }

  };

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-100 px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-xl shadow-stone-300/40 sm:p-9">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Welcome back</p>
          <h1 className="text-3xl font-black tracking-tight text-stone-900">Login or sign up</h1>
          <p className="mt-2 text-sm text-stone-500">Join the conversation on Postsphere.</p>
        </div>

        <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-semibold text-stone-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              value={username}
              onChange={(event) => {setUsername(event.target.value); setError("")}}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-stone-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              value={password}
              onChange={(event) => {setPassword(event.target.value); setError("")}}
            />
          </div>
          <span className='text-red-500 px-1 text-1xl'>{error}</span>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-4 py-3 font-bold text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
            >
              Login
            </button>
            <button
            onClick={handleSignUP}
              type="button"
              className="rounded-lg border border-amber-500 px-4 py-3 font-bold text-amber-700 transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login