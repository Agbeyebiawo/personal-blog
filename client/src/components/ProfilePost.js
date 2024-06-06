import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaTrash} from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import { deletePost } from '../features/post/postSlice'

const ProfilePost = ({post,name}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id,title,summary,cover,content,createdAt} = post

  return (
    <Link to='/post'>
      <div className='card max-w-sm w-full border rounded-lg shadow-md lg:max-w-full lg:flex gap-3 mb-5'>
          <div className="image">
              <img className='rounded-l-lg' src={cover} alt="" />
          </div>
          <div className="card-left">
            <div className='flex justify-between items-center '>
                <p className="author mt-4 text-sm text-gray-600 font-semibold">{name}</p>
                <div className='flex items-baseline gap-4 mr-3'>
                  <button onClick={()=>navigate(`/editpost/${id}`)}><FaPen /></button>
                  <button onClick={()=>dispatch(deletePost({id:id}))}><FaTrash /></button>
                    
                </div>
            </div>
              <p className='mt-4 text-gray-700 text-base bg-slate-200 rounded-lg p-2'>{summary}</p>
              <h3 className="title mt-8 text-gray-900 font-bold text-xl mb-2">{title}</h3>
              <p className="content mt-4 text-gray-700 text-base">{content}</p>
              <p className="date mt-12 text-sm">
                  <p className='text-gray-600'>{createdAt}</p>
              </p>
          </div>
      </div>
    </Link>
  )
}

export default ProfilePost