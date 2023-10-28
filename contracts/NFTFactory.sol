// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTFactory is ERC721URIStorage{

uint256 public tokenId;
constructor() ERC721("NFTFactory", "NFT"){}


function mintNFT(string memory _tokenURI, bytes memory _metaData) public returns (uint256){
    tokenId++;
    _safeMint(msg.sender, tokenId, _metaData);
    _setTokenURI(tokenId, _tokenURI);
    return tokenId;
    }
}