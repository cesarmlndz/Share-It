import React, { useEffect, useState } from 'react'
import "../../css/MainPage.css"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import Post from './Post'

export default function MainPage() {
  const [postsList, setPostsList] = useState(null)

  const postsRef = collection(db, "posts")

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const data = await getDocs(postsRef)
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  return (
    <div className='main-page-container'>
        {postsList?.map((post) => <Post post={post}/>)}
    </div>
  )
}

