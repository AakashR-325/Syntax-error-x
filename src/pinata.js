import axios from 'axios';
const PINATA_API_KEY = "c47f7ac21a6e511a9921" 
const API_SECRET="84063e0c2124489e3c8de173ee46356e5959d26f5890d5f7b29008c0e34aed1a"

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios                                                                                                           
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: API_SECRET,
                Accept: "text/plain",
                // 'x-pinata-gateway-token' : "f7B0eqAguCYI_Ifm419TM221SUkbzOXrWdM3vES4T3LWQXpTTJ0YUr-JP8M-EeRA",
            }
        })
        .then((response) => {
           return {
               success: true,
               pinataURL: "https://app.pinata.cloud/gateway/amber-broad-jackal-48/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: API_SECRET,
                // 'x-pinata-gateway-token' : "f7B0eqAguCYI_Ifm419TM221SUkbzOXrWdM3vES4T3LWQXpTTJ0YUr-JP8M-EeRA",
                Accept: "text/plain",
            }
        })
        .then(function (response) {
            console.log("Image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://app.pinata.cloud/gateway/amber-broad-jackal-48/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};