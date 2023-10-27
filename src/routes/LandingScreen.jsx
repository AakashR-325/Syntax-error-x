import React from 'react'
import { Button, Grid, CssBaseline, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

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
          <Box marginBottom='2rem'>
            <Typography textAlign='center' variant='h3' color="white" sx={{
              fontWeight: '500',
            }}>Welcome to whatever this app is called.</Typography>
            <Typography textAlign='center' variant='h5' color="white" sx={{
              fontWeight: '100'
            }}>Get the services of whatever the hell we're providing</Typography>
          </Box>
          <Button component={Link} to='/home/dashboard' variant='contained'>Connect your wallet</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default LandingScreen
