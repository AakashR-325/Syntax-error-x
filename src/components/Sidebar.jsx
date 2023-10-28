import React from 'react'
import { Grid, Button, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const pages = [
    {
        name: 'Buy',
        path: '/home/marketplace/buy',
    },
    {
        name: 'Your Listings',
        path: '/home/marketplace/listings',
    }
]

const pagesList = pages.map(page => {
    return (
        <div key={page.name}>
            <ListItem key={page.name}>
                <ListItemButton component={Link} to={page.path}>
                    <ListItemText sx={{ color: 'white' }}>{page.name}</ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider sx={{ backgroundColor: 'white' }} />
        </div>
    )
})

const Sidebar = () => {
    return (
        <div style={{ backgroundColor: 'rgb(12 17 40)', height: '100vh', width: '20%', borderRight: '1px solid white' }}>
            <List>
                {pagesList}
            </List>
        </div>
    )
}

export default Sidebar
