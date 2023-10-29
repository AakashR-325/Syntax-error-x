import React, {useEffect} from 'react'
import { ethers } from 'ethers'
import { AppBar, List, ListItem, ListItemButton, ListItemText, Avatar, Typography, Box, Toolbar, Button, CssBaseline, Container } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { factoryAdded, providerAdded, userAdded, marketplaceAdded } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import MarketPlaceABI from '../contract-details/MarketPlaceABI.json'
import NFTFactoryABI from '../contract-details/NFTFactoryABI.json'

const addressDisplay = (address) => `${address.slice(0, 8)}...${address.slice(34, 42)}`


const marketplaceAddress = "0xd3B9396e2Bd54e180440B113f2569e72541b5A60"
const factoryAddress = "0x35BFa15f4a26e863EB051274E9a81DaE84E12ECB"


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
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()
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
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()
    const blockchainData = () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = provider.getSigner()
        dispatch(
            providerAdded({
                provider : provider
            })
        )
        const network = provider.getNetwork()
        const factoryProtocol = new ethers.Contract(factoryAddress, NFTFactoryABI, signer)
        console.log(factoryProtocol)
        dispatch(
            factoryAdded({
                factory : factoryProtocol
            })
        )
        const marketplaceProtocol = new ethers.Contract(marketplaceAddress, MarketPlaceABI, signer)
        dispatch(
            marketplaceAdded({
                marketplace : marketplaceProtocol
            })
        )
    }

    useEffect(() =>{
        blockchainData()
    },[])
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
