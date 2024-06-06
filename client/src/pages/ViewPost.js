import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import { getSinglePost } from '../features/post/postSlice'

const ViewPost = () => {
    const navigate = useNavigate()
    const params = useParams()
    const post = useSelector(state=>getSinglePost(state,params.id))
    // console.log(post)

  return (
    <div className='w-full max-w-6xl mx-auto p-8'>
        <button onClick={()=>navigate('/')} className='flex items-center gap-3'><FaArrowLeft /> Back</button>
        <div className='w-full'>
            <p className='mt-3 text-sm text-gray-600 font-semibold flex justify-between items-center'>
                <span className='font-bold text-gray-900'>{post.author.name}</span>
                <time datetime="">{post.createdAt}</time>
            </p>
            <h3 className="title mt-3 text-gray-900 font-bold text-xl mb-2">{post.title}</h3>
            <div className="w-full">
                <img className='w-full img rounded-lg' src="https://cdn.pixabay.com/photo/2023/09/02/03/15/water-8228076_1280.jpg" alt="" />
            </div>
            <p className="content p-3 mt-4 text-gray-700 text-base">{post.content}</p>

        </div>
    </div>
  )
}

export default ViewPost