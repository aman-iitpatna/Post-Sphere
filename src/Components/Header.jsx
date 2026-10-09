import React from 'react'
import {  Link, NavLink } from 'react-router-dom'

function Header() {
    const uid = Boolean(localStorage.getItem('uid'))
    const links = [
        { label: 'Home', to: '/' },
        { label: 'Create Post', to: '/createpost' },
        uid ? { label: 'User', to: '/user' } : { label: 'Login', to: '/login' },
    ]

  return (
        <header className="border-b border-amber-950/30 bg-stone-900 text-stone-100 shadow-lg">
            <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-start justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
                <Link
                    to="/"
                    className="ml-2 shrink-0 text-2xl font-black tracking-tight text-amber-500 transition-colors hover:text-amber-500 sm:text-3xl"
                >
                    Post<span className="text-stone-100  hover:text-amber-200">sphere</span>
                </Link>

                <nav aria-label="Main navigation" className="flex w-full justify-end gap-1 sm:ml-auto sm:w-auto sm:items-center sm:gap-3">
                    {links.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
                                    isActive
                                        ? 'bg-amber-400 text-stone-950 shadow-sm'
                                        : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
  )
}

export default Header