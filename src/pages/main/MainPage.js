import React, { useEffect, useState } from 'react'
import "../../css/MainPage.css"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import Post from './Post'

export default function MainPage() {
  const [postsList, setPostsList] = useState([])

  const postsRef = collection(db, "posts")

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const data = await getDocs(postsRef)
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})).reverse())
  }

  return (
    <div className='main-page-container'>
        {postsList &&
          postsList.map((post) => <Post post={post}/>)
        }
    </div>
  )
}

