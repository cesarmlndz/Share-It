import React from 'react'
import "../../css/CreateForm.css"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import { db , auth} from "../../config/firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import person from "../../icons/person.png"


export default function CreateForm() {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required("A title must be added!"),
    description: yup.string().required("A description must be added!")
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db, "posts")

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    })

    navigate("/home")
  }

  return (
    <div className='create-post-container'>
      <form onSubmit={handleSubmit(onCreatePost)} className="create-post-form">
        <input placeholder='Title...' {...register("title")}></input>
        <p style={{color : "red"}}>{errors.title?.message}</p>
        <textarea placeholder='What do you have to say?' {...register("description")}></textarea>
        <p style={{color : "red"}}>{errors.description?.message}</p>
        <input type='submit' className='submit-post'></input>
      </form>
      <img className='computer-pic' src={person}/>
    </div>
  )
}