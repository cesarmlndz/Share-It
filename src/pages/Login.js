import React from 'react'
import "../css/Login.css"
import { auth, provider } from "../config/firebaseConfig"
import { signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import googleLogo from '../icons/google-logo.png'
import friends from "../icons/friends.png"

export default function Login() {
    const navigate = useNavigate()

    const signInWithGoogle =  async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate("/home")
    }

    return (
        <div className='login-page-container'>
          <div className='login-card' onClick={signInWithGoogle}>
            <div className='google-image'>
              <img src={googleLogo}/>
            </div>
            <div className='sign-up-text'>
              <h1>Sign in with Google</h1>
            </div>
          </div>
          <img src={friends} className='friends'/>
        </div>
      )
}