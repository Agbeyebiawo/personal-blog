import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePost from '../components/ProfilePost'
import {useSelector, useDispatch} from 'react-redux'
import {getCurrentUser} from '../features/user/userSlice'
import {logout} from '../features/user/userSlice'
import { setPosts } from '../features/post/postSlice'
import { getAllPosts } from '../features/post/postSlice'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()


    useEffect(()=>{
        async function fetchPosts(){
            try{
                const result = await axios.get(`http://localhost:4000/posts/${user.id}`)
                console.log(result)
                dispatch(setPosts(result.data))
            }catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    },[])

    const posts = useSelector(getAllPosts)
    console.log(posts)

  return (
    <div className='w-full max-w-6xl mx-auto p-4 mt-10'>
        <div className='w-full flex justify-between items-center'>
            <button onClick={()=>navigate('/')}>Home</button>
            <button onClick={()=>{
               dispatch(logout())
               navigate('/login')
            }}>Logout</button>
        </div>
        <div className=' w-full mt-3 rounded-lg'>
            <div className='flex justify-between items-center p-3 bg-slate-300'>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
            </div>
            <p className='p-2'>
                {user.bio}
            </p>
        </div>
        

        <h3 className='font-bold mt-3'>Posts</h3>
        <div className='w-full p-3 mt-3'>
            {posts.length !== 0 ? posts.map(post=>(
                <ProfilePost post={post} name={user.name}/>
            )):(
                <>
                    <p className='text-center'>No posts yet</p>
                </>
            )}
        </div>

    </div>
  )
}

export default Profile