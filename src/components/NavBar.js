import React, { useState } from 'react'
import "../css/NavBar.css"
import { Link } from 'react-router-dom'
import { auth } from "../config/firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const [user] = useAuthState(auth)

  const navigate = useNavigate()

  const signUserOut = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className='nav-bar-container'>
       <div className='left-side'>
        {user && <Link to="/home" className='home-link'>Home</Link>}
        {!user ? <Link to="/login" className='nav-bar-link'>Login</Link> : <Link to="/createPost" className='nav-bar-link'>Create Post +</Link>}
       </div>
       <button className='nav-opener'>open</button>
       <div className='nav-logo'>
         <h1 className='logo'>Share-It</h1>
       </div>
        <div className='nav-bar-user-info'>
          {user && (
          <>
            <p className='nav-bar-username'>{user?.displayName}</p>
            <img src={user?.photoURL}/>
            <p onClick={signUserOut} className='sign-out'>Sign Out</p>
          </>
          )}
        </div>
    </nav>
  )
}