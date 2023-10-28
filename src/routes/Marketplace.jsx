import React from 'react'
import { Sidebar } from '../components'
import { Slide } from 'react-awesome-reveal'
import { Outlet } from 'react-router'
const Marketplace = () => {
  return (
    <div style={{
        backgroundColor : 'black', 
        height: '100vh',
        display : 'flex',
    }}>
        <Sidebar />
        <Outlet />
    </div>
    
  )
}

export default Marketplace
