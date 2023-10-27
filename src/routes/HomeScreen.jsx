import React from 'react'
import { AppBar, List, ListItem, ListItemButton, ListItemText, Avatar, Typography, Toolbar, Button, CssBaseline, Container } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'

const pages = [
    {
        name: 'Marketplace',
        path: '/home/marketplace',

    },
    {
        name: 'Dashboard',
        path: '/home/dashboard',
    },
    {
        name: 'Create',
        path: '/home/create',
    }]

const pageMenus = pages.map(page => {
    console.log(page)
    return (
        <ListItem key={page.name}>
            <ListItemButton component={Link} to={page.path}>
                <ListItemText>{page.name}</ListItemText>
            </ListItemButton>
        </ListItem>
    )
})

const HomeScreen = () => {
    return (
        <div style={{ height: '100%' }}>
            <CssBaseline />
            <AppBar position='static' sx={{
                backgroundColor: '#262626'
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography>LOGO HERE</Typography>
                    <Container>
                        <List sx={{
                            display: 'flex',
                            width: '50%',
                        }}>
                            {pageMenus}
                        </List>
                    </ Container>
                    <Avatar>UN</Avatar>
                </Toolbar>
            </AppBar>
            <Outlet />
        </ div>
    )
}

export default HomeScreen
