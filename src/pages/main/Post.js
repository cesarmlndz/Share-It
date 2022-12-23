import React, { useEffect, useState } from 'react'
import "../../css/Post.css"
import { addDoc, getDocs, collection, query, where, deleteDoc, doc} from 'firebase/firestore'
import { db, auth } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import likePic from "../../icons/likePic.svg"
import thumbsDown from "../../icons/thumbs-down.svg"

export default function Post(props) {
  const { post } = props

  const [user] = useAuthState(auth) 

  const [likes, setLikes] = useState([])

  const likesRef = collection(db, "likes")
  const likesDoc = query(likesRef, where("postId", "==", post.id))

  const hasUserLiked = likes.find((like) => like.userId === user?.uid)

  useEffect(() => { 
    getLikes()
  }, [])

  const getLikes = async () => {
      const data = await getDocs(likesDoc)
      setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})))
  }

  const addLike = async () => {
    try {
    const newDoc = await addDoc(likesRef, {
      userId: user?.uid,
      postId: post?.id
    })

    setLikes((prev) => [...prev, {userId: user?.uid, likeId: newDoc.id}])

    }
    catch(err) {
        console.log(err)
    }
  }

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, 
        where("postId", "==", post.id, 
        where("userId", "==", user?.uid)))
      
      const likeToDeleteData = await getDocs(likeToDeleteQuery)
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id)

      await deleteDoc(likeToDelete)

      setLikes((prev) => prev?.filter((like) => like.likeId !== likeToDeleteData.docs[0].id))
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
                <img className='post-pic' src={post.photoURL}/>
                <p className='post-username'>By {post.username}</p>
                <p className='post-date'>{post.date}</p>
            </div>
            <div className='like-section'>
                <img onClick={hasUserLiked ? removeLike : addLike} src={hasUserLiked ? thumbsDown : likePic} className='post-like'></img>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>
        </div>
    </div>
  ) 
}
