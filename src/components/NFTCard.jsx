import React, { useState } from 'react'
import { Grid, Card, CardContent, CardMedia, CardHeader, Typography, CardActionArea, CssBaseline, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Box } from '@mui/material';
import { Zoom } from 'react-awesome-reveal';

const NFTCard = ({ pack, columns, children }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleBuy = () => {

    }
    const handleCloseCancel = () => setOpen(false)
    return (
        <Grid item key={pack.id} md={columns}>
            <CssBaseline />
            <Zoom>
                <Card sx={{
                    borderRadius: '1.5rem',
                }}>
                    <CardActionArea onClick={handleOpen}>
                        <CardHeader
                            title={pack.title}
                            titleTypographyProps={{ noWrap: true }}
                            subheader={pack.price}
                            subheaderTypographyProps={{ noWrap: true }}
                            sx={{
                                textAlign : 'center',
                                color: 'white',
                                backgroundColor: '#262626',
                                overflow: "hidden",
                                "& .MuiCardHeader-content": {
                                    overflow: "hidden"
                                }
                            }}
                        />
                        <CardContent sx={{
                            backgroundColor: '#262626',
                            textOverflow: 'clip'
                        }}>
                            <Typography variant='body2' textAlign='center' color='white' noWrap={true} sx={{
                            }}>
                                {pack.description}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            height="150"
                            component='img'
                            image={pack.coverURI}
                            sx={{
                                backgroundColor: '#262626',
                                objectFit: 'contain'
                            }}
                        />
                    </CardActionArea>
                </Card>
            </Zoom>
            <CssBaseline />
            <Dialog onClose={handleCloseCancel} open={open} fullWidth PaperProps={{
                sx : {
                    // width : '50%',
                    // height : '50vh',
                    padding : '2rem',
                    backgroundColor : '#262626',
                    borderRadius : '2rem',
                }
            }}>
                <DialogTitle textAlign='center'  sx={{
                color : 'white',
                fontWeight : '500'
            }}>{pack.title}</DialogTitle>
                <div style={{margin : '1rem'}}>
                    <Typography textAlign='center' color='white' sx={{fontWeight : '300'}}>{pack.description}</Typography>
                    <Typography textAlign='center' color='white' sx={{fontWeight : '300'}}>{pack.price}</Typography>
                </div>
                <Box
                component='img'
                alt={pack.title}
                sx={{
                    objectFit : 'contain'
                }}
                src={pack.coverURI}
                 />
                 <DialogActions sx={{display : 'flex', justifyContent : 'center', marginTop : '1rem'}}>
                    <Button variant='contained' onClick={handleBuy}>Buy</Button>
                 </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default NFTCard
