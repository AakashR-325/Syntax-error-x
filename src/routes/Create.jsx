import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, CssBaseline, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Dropzone from 'react-dropzone';
import { uploadFileToIPFS, uploadJSONToIPFS } from '../pinata.js';
import NFTFactoryABI from '../contract-details/NFTFactoryABI.json'
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { providerAdded } from '../features/user/userSlice.js';

const marketplaceAddress = "0xd3B9396e2Bd54e180440B113f2569e72541b5A60"
const factoryAddress = "0x35BFa15f4a26e863EB051274E9a81DaE84E12ECB"

const capitalize = (word) => {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
}


// async function uploadMetaDataToIPFS(){

// }


// const fileToDataUri = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//         resolve(event.target.result)
//     };
//     reader.readAsDataURL(file);
// })



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

const UploadField = ({ message, handleValueChange, isMultiple }) => {
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
            <Dropzone onDrop={
                acceptedFiles => {
                    //bad code
                    // if (acceptedFiles.length === 1) {
                    //     handleValueChange(acceptedFiles[0])
                    // }
                    // else if (acceptedFiles.length > 1) {
                    //     handleValueChange(acceptedFiles)
                    // }
                    handleValueChange(acceptedFiles[0])
                }}
                accept={{
                    'image/*': ['.png', '.jpg', '.webp']
                }
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
    const userState = useSelector(state => state.user)
    const account = userState.address
    const factoryContract = userState.factory
    const marketplaceContract = userState.marketplace
    const provider = userState.provider
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [coverUri, setCoverUri] = useState()
    const [folderUri, setFolderUri] = useState()

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
        // if (!coverFile) {
        //     setCoverUri('');
        //     return;
        // }
        // fileToDataUri(coverFile).then(dataUri => {
        //     console.log(dataUri)
        //     setCoverUri(dataUri)
        // })
        setCoverUri(coverFile)
    }
    const handleFolderChange = (assetFile) => {
        // if (!folderFileUris) {
        //     setFolderUri([]);
        //     return;
        // }
        // folderFileUris.forEach(fileUri => {
        //     fileToDataUri(fileUri).then(dataUri => {
        //         let newUriList = [...folderUri, dataUri]
        //         setFolderUri(newUriList)
        //     })
        // })
        setFolderUri(assetFile)

    }

    const handleMint = () => {

    }

    const onUpload = async (folderURI) => {

        const response = await uploadFileToIPFS(folderURI)
        if (response.success === true) {
            console.log("File uploaded to pinata successfully, " + response.pinataURL)
        }
        else {
            console.log("File not uploaded")
            return;
        }
        const jsonBody = {
            title: title,
            description: description,
            price: price,
            coverUri: coverUri,
            fileUri: response.pinataURL
        }
        const JSONResponse = await uploadJSONToIPFS(jsonBody);
        if (JSONResponse.success === true) {
            console.log("File metadata uploaded successfully, " + JSONResponse.pinataURL)
            const tokenUri = JSONResponse.pinataURL;
            console.log(factoryContract)
            const signer = await provider.getSigner();
            try{
                const transaction = await factoryContract.connect(signer).mintNFT(tokenUri)
                await transaction.wait();
                console.log(transaction)
                const newNFTContract = new ethers.Contract(factoryAddress, NFTFactoryABI, provider)
                const tokenID = await newNFTContract.tokenId()
                console.log(tokenID)
                const approvalResponse = await factoryContract.connect(signer).setApprovalForAll(marketplaceAddress , true)
                await approvalResponse.wait()
                // let listingPrice = ethers.parseEther(price)
                // console.log(listingPrice)
                let addr = await newNFTContract.getAddress()
                console.log(addr)
                const marketTransaction = await marketplaceContract.connect(signer).makeNFTItem(addr, tokenID, price)
                await marketTransaction.wait()
                alert("NFT Minted!")
                // console.log(marketTransaction)
            } catch(error) {
                console.log(error)
            }

        }
        else {
            console.log("An error occured while uploading json to ipfs")
            return;
        }



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
                            Mint your assets as an NFT.
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
                            <UploadField message="Upload the cover art preview for your assets" handleValueChange={handleCoverChange} isMultiple={false} />
                            <UploadField message="Upload your assets stored in a folder. Upload a single folder only" handleValueChange={handleFolderChange} isMultiple={false} />
                        </Box>
                        <Fade>
                            <Button variant='contained' onClick={() => onUpload(folderUri)}>Mint</Button>
                        </Fade>
                        <Typography variant='p' sx={{ marginTop: '1rem' }}>*Refresh the page to reupload your assets :)</Typography>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}

export default CreateScreen
