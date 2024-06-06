import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../features/user/userSlice'

const Header = () => {
    const user = useSelector(getCurrentUser)

  return (
    <div className='w-full max-w-6xl mx-auto p-5 flex flex-row shadow-md mt-4 rounded-lg items-center justify-between'>
        <Link to='/' className='text-2xl font-bold'>LiteBlog</Link>
        <nav className='flex gap-4'>
            {user === null ? (
                <>
                    <Link to='/login' className='font-semibold'>Login</Link>
                    <Link to='/register' className='font-semibold'>Register</Link>
                </>
            ):(
                <>
                    <Link to='/createpost' className='font-semibold'>Create Post</Link>
                    <Link to='/profile' className='font-semibold'>Profile</Link>
                </>
            )}
            
        </nav>
    </div>
  )
}

export default Header