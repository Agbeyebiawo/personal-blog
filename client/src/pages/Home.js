import React, {useEffect} from 'react'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts,setPosts } from '../features/post/postSlice'
import axios from 'axios'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        async function fetchPosts(){
            try{
                const result = await axios.get('http://localhost:4000/posts')
                console.log(result.data)
                dispatch(setPosts(result.data))
            }catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    },[dispatch])

    const posts = useSelector(getAllPosts)

  return (
    <div className='w-full max-w-6xl mx-auto p-3 mt-4'>
        {posts.length !== 0 ? posts.map(post=>(
            <>
                <Post post={post}/>   
            </>
        )):(
            <>
                <p className='text-center'>No posts...</p>
            </>
        )}
    </div>
  )
}

export default Home