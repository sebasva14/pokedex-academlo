import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Layout = () => {
  const {removeUser} = useContext(UserContext)

  return (
    <div className='log_out_container'>
        <button
        className='log_out'
        onClick={removeUser}>
          log out
        </button>
        <Outlet />
    </div>
  )
}

export default Layout