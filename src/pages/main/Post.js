import React, { useEffect, useState } from 'react'
import "../../css/Post.css"
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { db, auth } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import likePic from "../../icons/likePic.svg"

export default function Post(props) {
  const { post } = props

  const [user] = useAuthState(auth)

  const [likeAmount, setLikeAmount] = useState(null)

  const likesRef = collection(db, "likes")
  const likesDoc = query(likesRef, where("postId", "==", post.id))

  useEffect(() => {
    getLikes()
  }, [])

  const getLikes = async () => {
      const data = await getDocs(likesDoc)
      setLikeAmount(data.docs.length)
  }

  const addLike = async () => {
    try {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post?.id
    })

    setLikeAmount((prevState) => prevState + 1)
    }
    catch(err) {
        console.log(err)
    }
  }

  return (
    <div className='post-container'>
        <p className='post-title'>{post.title}</p>
        <p className='post-description'>{post.description}</p>
        <div className='bottom-half'>
            <div className='post-footer'>
                <img className='post-pic' src={user?.photoURL}/>
                <p className='post-username'>By {post.username}</p>
            </div>
            <div className='like-section'>
                <img onClick={addLike} src={likePic} className='post-like'></img>
                {likeAmount && <p>Likes: {likeAmount}</p>}
            </div>
        </div>
    </div>
  )
}
