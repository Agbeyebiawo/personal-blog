import React,{useState} from 'react'
import {Navigate} from 'react-router-dom'

import axios from 'axios'

const Register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [redirect,setRedirect] = useState(false)

  async function register(e){
    e.preventDefault()
    try{
      const result = await axios.post('http://localhost:4000/register',
        JSON.stringify({name,email,password}),{
          headers:{'Content-Type':'application/json'}
        }
      )
      if(result.data === 'ok'){
        setRedirect(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  if(redirect){
    return (
      <Navigate to='/login'/>
    )
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-8 border rounded-lg mt-10'>
        <h3 className='text-3xl font-bold text-center mb-10 uppercase'>Join Us</h3>
        <form action="" className='w-full' onSubmit={e=>register(e)}>
            <input type="text" onChange={e=>setName(e.target.value)} placeholder='Name' className='rounded-lg border w-full p-3 block mb-3'/>
            <input type="email" onChange={e=>setEmail(e.target.value)} name="email" id="email" placeholder='Email' className='rounded-lg border w-full p-3 block mb-3'/>
            <input type="password" onChange={e=>setPassword(e.target.value)} name="password" id="password" placeholder='Password' className='rounded-lg border p-3 w-full block mb-3'/>
            <button type="submit" className='w-full p-3 bg-slate-600 text-white uppercase hover:opacity-80 rounded-lg'>Register</button>
        </form>
    </div>
  )
}

export default Register