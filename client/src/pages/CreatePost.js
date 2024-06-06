import React, {useState} from 'react'
import Editor from '../components/Editor'
import 'react-quill/dist/quill.snow.css';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { getCurrentUser } from '../features/user/userSlice';
import {Navigate} from 'react-router-dom'

const CreatePost = () => {
    const user = useSelector(getCurrentUser)
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent]= useState('')

    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState(false)

    async function createNewPost(e){
      e.preventDefault()
      try{
        const formData = new FormData()
        formData.append('title',title)
        formData.append('summary',summary)
        formData.append('file',files[0])
        formData.append('content',content)
        formData.append('author',user.id)

        const result = await fetch('http://localhost:4000/newpost',{
          method:"POST",
          body:formData,
          credentials: 'include'
        })

        if(result.ok){
          setRedirect(true)
        }
        // const result = await axios.post('http://localhost:4000/newpost',
        //   formData,{
        //     headers:{'Content-Type':'application/json'},
        //     withCredentials: true
        //   }
        // )
        // if(result.data === 'ok'){
        //   setRedirect(true)
        // }
      }catch(err){
        console.log(err)
      }
    }

    if(redirect){
      return(
        <Navigate to='/'/>
      )
    }
  return (
    <div className='w-full max-w-4xl mx-auto mt-10 p-3 border rounded-lg'>
        <h3 className='text-center font-bold text-3xl mb-5'>Create Post</h3>
        <form action="" onSubmit={(e=>createNewPost(e))} className='w-full'>
            <input type="text" onChange={e=>setTitle(e.target.value)} name="title" id="" placeholder='Title' className='p-3 border rounded-lg w-full block mb-3'/>
            <input type="text" onChange={e=>setSummary(e.target.value)} name="summary" id="" placeholder='Summary' className='p-3 border rounded-lg w-full block mb-3'/>
            <input type="file" onChange={e=>setFiles(e.target.files)} name="file" id="" className='p-3 border rounded-lg w-full block mb-3'/>
            <Editor value={content} onChange={setContent}/>
            <button type='submit' className='mt-4 uppercase p-3 dark:bg-slate-700 hover:opacity-80 text-white w-full rounded-lg'>Publish</button>
        </form>
    </div>
  )
}

export default CreatePost