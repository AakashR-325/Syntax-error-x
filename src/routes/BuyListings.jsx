import React from 'react'
import { CssBaseline, Typography, Grid } from '@mui/material'
import {NFTCard} from '../components'

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
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quibusdam, itaque temporibus alias, doloribus aliquid, eveniet cum dolorum at minima cumque corrupti tenetur",
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

const BuyListings = () => {
    const assetPacks = samplePacks.map(pack => {
        return (
            <NFTCard pack={pack} columns={3} />
        )
    })
  return (
    <div style={{
        width : '80%',
        paddingTop : "2rem",
        paddingLeft : "2rem",
        paddingRight : '2rem',
    }}>
        <CssBaseline />
        <Typography textAlign='center' color='white' variant='h3' sx={{
            fontWeight : '300',
            marginBottom : '2rem',
        }}>Buy assets</Typography>
        <Grid container spacing={4} sx={{
            maxHeight : '80vh',
            overflow : 'auto',
        }}>
            {assetPacks}
        </Grid>
    </div>
  )
}

export default BuyListings
