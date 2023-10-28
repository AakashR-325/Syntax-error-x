import React from 'react'
import { Grid, Typography, Container, Card, CardHeader, CardMedia, CardActions, ThemeProvider, Box, CssBaseline, CardContent } from '@mui/material'
import { Zoom } from 'react-awesome-reveal'
import { NFTCard } from '../components'


const samplePacks = [
    {
        id: 1,
        title: 'Sample title',
        description : "Sample description",
        price : '$400',
        coverURI: 'https://picsum.photos/seed/picsum/200/200',
    },
    {
        id: 2,
        title: "Sample title 2",
        description : "Sample description",
        price : '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 3,
        title: "Sample title 3",
        description : "Sample description",
        price : '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 4,
        title: "Sample title 4",
        description : "Sample description",
        price : '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
    {
        id: 5,
        title: "Sample title 5",
        description : "Sample description",
        price : '$400',
        coverURI: 'https://picsum.photos/seed/random/200/200',
    },
]



const Dashboard = () => {
    const assetPacks = samplePacks.map(pack => {
        return (
            <NFTCard pack={pack} columns={2}/>
        )
    })
    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <CssBaseline />
            <Box sx={{
                backgroundColor: 'black',
                paddingTop: '2rem',
            }}>
                <Typography textAlign="center" variant='h3' color='white' sx={{
                    fontWeight: '300',
                    marginBottom: '2rem',
                }}>Your asset packs</Typography>
            </Box>
            <Grid container spacing={4} sx={{
                backgroundColor: 'black',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                maxHeight : '70vh',
                overflow : 'auto',
            }}>
                {assetPacks}
            </Grid>
        </ div>
    )
}

export default Dashboard
