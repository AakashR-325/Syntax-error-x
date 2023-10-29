import React from 'react'
import { Button, Grid, CssBaseline, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'

const LandingScreen = () => {
  return (
    <>
      <CssBaseline />
      <Grid container sx={{
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Grid item xs={12} md={12} sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          height: '50%',
          justifyContent: 'center',
        }}>
          <Fade cascade delay={0.2}>
            <Box marginBottom='2rem'>
              <Typography textAlign='center' variant='h3' color="white" sx={{
                fontWeight: '500',
              }}>Welcome to DeSprite</Typography>
              <Typography textAlign='center' variant='h5' color="white" sx={{
                fontWeight: '100'
              }}>Get the services of the app by connecting your wallet</Typography>
            </Box>
            <Button component={Link} to='/home/' variant='contained'>Get started with Metamask</Button>
          </Fade>
        </Grid>
      </Grid>
    </>
  )
}

export default LandingScreen
