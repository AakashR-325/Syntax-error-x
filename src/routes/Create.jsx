import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, CssBaseline, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Dropzone from 'react-dropzone';

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

// const InputFileUpload = ({ handleValueChange }) => {
//     return (
//         <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
//         //    onClick={handleValueChange}
//         >
//             Upload file
//             <VisuallyHiddenInput type="file" onChange={(event) => handleValueChange(event.target.files[0] || null)} />
//         </Button>
//     );
// }

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

const UploadField = ({ message, handleValueChange, isMultiple}) => {
    const [uploaded, setUploaded] = useState(false)
    let icon = uploaded ? <FileDownloadDoneIcon /> : <DriveFolderUploadIcon />
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
            {/* <InputFileUpload handleValueChange={handleValueChange} /> */}
            <Dropzone onDrop={acceptedFiles => 
                {
                    //bad code
                    if(acceptedFiles.length === 1) {
                        handleValueChange(acceptedFiles[0])
                    }
                    else if(acceptedFiles.length > 1) {
                        handleValueChange(acceptedFiles)
                    }
                }} 
                accept={{
                    'image/*' : ['.png', '.jpg', '.webp']}
                } 
                multiple={isMultiple}
                onDropAccepted={() => setUploaded(true)}
                >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {icon}
                        </div>
                    </section>
                )}
            </Dropzone>
        </Box>
    )
}
const CreateScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [coverUri, setCoverUri] = useState('')
    const [folderUri, setFolderUri] = useState([])

    useEffect(() => {
        console.log(coverUri)
        return () => console.log(coverUri)
    }, [])
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
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
    const handleFolderChange = (folderFileUris) => {
        if (!folderFileUris) {
            setFolderUri([]);
            return;
        }
        folderFileUris.forEach(fileUri => {
            fileToDataUri(fileUri).then(dataUri => {
                let newUriList = [...folderUri, dataUri]
                setFolderUri(newUriList)
            })
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
                    <Fade triggerOnce>
                        <Typography variant='h3' color='white'>
                            Mint your assets as an NFT and take control or some lame shit like that.
                        </Typography>
                    </Fade>
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
                            <CustomTextField field={price} handleFieldChange={handlePriceChange}
                                message="Give your asset pack a price" id='price'
                            />
                            <UploadField message="Upload the cover art preview for your assets" handleValueChange={handleCoverChange} isMultiple={false}/>
                            <UploadField message="Upload your assets stored in a folder. Upload a single folder only" handleValueChange={handleFolderChange} isMultiple={true}/>
                        </Box>
                        <Button variant='contained'>Mint these nuts</Button>
                        <Typography variant='p'>*Refresh the page to reupload your assets :)</Typography>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}

export default CreateScreen
