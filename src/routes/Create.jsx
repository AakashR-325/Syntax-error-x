import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, CssBaseline, Typography, Paper, TextField, Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const capitalize = (word) => {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
}

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const InputFileUpload = ({ handleValueChange }) => {
    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
        //    onClick={handleValueChange}
        >
            Upload file
            <VisuallyHiddenInput type="file" onChange={(event) => handleValueChange(event.target.files[0] || null)} />
        </Button>
    );
}

const CustomTextField = ({ message, fieldState, id, handleFieldChange }) => {
    return (
        <Box sx={{
            marginTop: '1rem',
            marginBottom: '1rem',
        }}>
            <Typography >
                {message}
            </Typography>
            <TextField
                margin='dense'
                id={id}
                label={`${capitalize(id)}...`}
                value={fieldState}
                fullWidth
                onChange={handleFieldChange}
                variant='outlined'
            />
        </Box>
    )
}

const UploadField = ({ message, handleValueChange }) => {
    return (
        <Box sx={{
            marginTop: '1rem',
            marginBottom: '1rem',
        }}>
            <Typography sx={{
                marginBottom: '0.5rem',
            }}>
                {message}
            </Typography>
            <InputFileUpload handleValueChange={handleValueChange} />
        </Box>
    )
}
const CreateScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverUri, setCoverUri] = useState('')
    const [folderUri, setFolderUri] = useState('')
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleCoverChange = (coverFile) => {
        if (!coverFile) {
            setCoverUri('');
            return;
        }
        fileToDataUri(coverFile).then(dataUri => {
            console.log(dataUri)
            setCoverUri(dataUri)
        })
    }
    const handleFolderChange = (folderFile) => {
        if (!folderFile) {
            setFolderUri('');
            return;
        }
        fileToDataUri(folderFile).then(dataUri => {
            console.log(dataUri)
            setFolderUri(dataUri)
        })

    }
    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <CssBaseline />
            <Grid container sx={{
                height: '100%',
                minHeight: '100vh',
            }}>
                <Grid item sm={0} md={4} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '100vh',
                    padding: '1rem'
                }}>
                    <Typography variant='h3' color='white'>
                        Mint your assets as an NFT and take control or some lame shit like that.
                    </Typography>
                </Grid>
                <Grid item sm={12} md={8} sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Paper sx={{
                        padding: '2rem',
                        height: '90%',
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}>
                        <Box>

                            <CustomTextField field={title} handleFieldChange={handleTitleChange}
                                message="Give your asset pack an eye-catching title" id='title'
                            />
                            <CustomTextField field={description} handleFieldChange={handleDescriptionChange}
                                message="Give your asset pack a description to better inform users." id='description'
                            />
                            <UploadField message="Upload the cover art preview for your assets" handleValueChange={handleCoverChange} />
                            <UploadField message="Upload your assets stored in a folder. Upload a single folder only" handleValueChange={handleFolderChange} />
                        </Box>
                        <Button variant='contained'>Mint these nuts</Button>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}

export default CreateScreen
