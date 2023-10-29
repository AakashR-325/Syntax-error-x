import React, {useState, useEffect} from 'react'
import { NFTCard } from '../components'
import {CssBaseline, Grid, Typography, Button} from '@mui/material'
import { loadCreatedItems, loadListedItems } from '../MyListedItems'
import { useSelector } from 'react-redux'

const samplePacks = [
    {
        id: 1,
        title: 'Sample title',
        description: "Sample description",
        price: '$400',
        coverURI: 'https://picsum.photos/seed/picsum/200/200',
    },
    {
        id: 2,
        title: "Sample title mjreonfoenf",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates beatae cupiditate aut ut, porro cumque, deserunt esse atque quos, saepe iure",
        price: '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 3,
        title: "Sample title ",
        description: "Sample description",
        price: '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 4,
        title: "Sample title ",
        description: "Sample description",
        price: '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 5,
        title: "Sample title ",
        description: "Sample description",
        price: '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },

]

const OwnListings = () => {
    const [loading, setLoading] = useState(true)
    const [listedItems, setListedItems] = useState([])
    const userState = useSelector(state => state.user)
    const factoryContract = userState.factory
    const marketplaceContract = userState.marketplace
    const provider = userState.provider
    const account = userState.address
    const assetPacks = samplePacks.map(pack => {
        return (
            <NFTCard pack={pack} columns={3} />
        )
    })

    useEffect(() => {
        loadCreatedItems(provider, factoryContract, account, loading, setLoading, setListedItems)
    }, [])
    return (
        <div style={{
            width : '80%',
            paddingTop : "2rem",
            paddingLeft : "2rem",
            paddingRight : '2rem',
        }}>
            <CssBaseline />
            <Button onClick={() => console.log(listedItems)}>Print state</Button>
            <Typography textAlign='center' color='white' variant='h3' sx={{
                fontWeight : '300',
                marginBottom : '2rem',
            }}>Assets you've listed</Typography>
            <Grid container spacing={4} sx={{
                maxHeight : '80vh',
                overflow : 'auto',
            }}>
                {assetPacks}
            </Grid>
        </div>
    )
}

export default OwnListings
