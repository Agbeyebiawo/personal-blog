import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../features/user/userSlice'

const PrivateRoute = () => {
    const user = useSelector(getCurrentUser)

  return (
    user !== null ? <Outlet /> : <Navigate to='/login'/>
  )
}

export default PrivateRoute