import React from 'react'
import { Typography, Box, CssBaseline, } from '@mui/material'
import { Zoom } from 'react-awesome-reveal'

const WelcomeScreen = () => {
    return (
        <div style={{
            backgroundColor: 'black',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '4rem'
        }}>
            <CssBaseline />
            <Zoom>

                <Typography variant='h3' color='white'>Welcome to the app.</Typography>
                <Typography variant='h5' color='white' sx={{
                    fontWeight: '100'
                }}>To get started, mint your own NFT or buy one from our marketplace</Typography>
            </Zoom>
        </div>
    )
}

export default WelcomeScreen
