import React,{useState} from 'react'
import Editor from '../components/Editor'
import 'react-quill/dist/quill.snow.css';
import {useParams, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getSinglePost} from '../features/post/postSlice'
import axios from 'axios'

const EditPost = () => {
  const param = useParams()
  const post = useSelector(state=>getSinglePost(state,param.id))
    
  const [content,setContent]= useState(post.content)
  const [title,setTitle] = useState(post.title)
  const [summary,setSummary] = useState(post.summary)
  const [files,setFiles] = useState(post.cover)
  const [redirect,setRedirect] = useState(false)

  async function editPost(e){
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('title',title)
      formData.append('summary',summary)
      formData.append('content',content)
      formData.append('author',post.author)

      const result = await axios.put(`http://localhost:4000/updatepost/${param.id}`,formData)
      if(result.data === 'ok'){
        setRedirect(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  if(redirect){
    return(
      Navigate('/')
    )
  }
  return (
    <div className='w-full max-w-4xl mx-auto mt-10 p-3 border rounded-lg'>
        <h3 className='text-center font-bold text-3xl mb-5'>Update Post</h3>
        <form action="" className='w-full' onSubmit={e=>editPost(e)}>
            <input type="text" onChange={e=>setTitle(e.target.value)} name="title" id="" value={title} placeholder='Title' className='p-3 border rounded-lg w-full block mb-3'/>
            <input type="text" onChange={e=>setSummary(e.target.value)} name="summary" id="" value={summary} placeholder='Summary' className='p-3 border rounded-lg w-full block mb-3'/>
            <input type="file" onChange={e=>setFiles(e.target.files[0])} name="file" id="" className='p-3 border rounded-lg w-full block mb-3'/>
            <Editor value={content} onChange={setContent}/>
            <button type='submit' className='mt-4 uppercase p-3 dark:bg-slate-700 hover:opacity-80 text-white w-full rounded-lg'>Publish</button>
        </form>
    </div>
  )
}

export default EditPost