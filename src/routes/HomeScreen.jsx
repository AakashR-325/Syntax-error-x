import React from 'react'
import { ethers } from 'ethers'
import { AppBar, List, ListItem, ListItemButton, ListItemText, Avatar, Typography, Box, Toolbar, Button, CssBaseline, Container } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { userAdded } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const addressDisplay = (address) => `${address.slice(0, 8)}...${address.slice(34, 42)}`


const pages = [
    {
        name: 'Marketplace',
        path: '/home/marketplace/listings',

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



const CustomAvatar = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = ethers.getAddress(accounts[0]);
        dispatch(
            userAdded({
                address: account
            })
        )
    };
    let component = userState.address === '' ? <Button variant='contained' onClick={connectHandler}>Connect Wallet</Button> : (
        <div style={{display : 'flex', alignItems : 'center'}}>
            <Avatar src='/MetaMask_Fox.png'>
            </Avatar>
            <Typography>{addressDisplay(userState.address)}</Typography>
        </div>
    )

    return (
        <div>
            {component}
        </div>
    )
}

const HomeScreen = () => {
    return (
        <div style={{ height: '100%' }}>
            <CssBaseline />
            <AppBar position='static' sx={{
                backgroundColor: '#262626',
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '30%'
                    }}>
                        <Button sx={{ color: 'white' }} component={Link} to='/home/'>DA APP</Button>
                        <Container sx={{
                        }}>
                            <List sx={{
                                display: 'flex',
                                // width: '50%',
                            }}>
                                {pageMenus}
                            </List>
                        </ Container>
                    </Box>
                    <CustomAvatar />
                </Toolbar>
            </AppBar>
            <Outlet />
        </ div>
    )
}

export default HomeScreen
