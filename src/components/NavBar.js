import React from 'react'
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
       <div>
        {user && <Link to="/home" className='nav-bar-link'>Home</Link>}
        {!user ? <Link to="/login" className='nav-bar-link'>Login</Link> : <Link to="/createPost" className='nav-bar-link'>Create Post +</Link>}
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