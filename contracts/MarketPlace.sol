// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {
    uint256 public itemCount;
    struct NFTItem {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;
        address payable owner;
    }
    mapping(uint256 => NFTItem) public uintToItem;

    event NFTListed(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller
    );
    event NFTBought(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    function makeNFTItem(
        IERC721 _nft,
        uint256 _tokenId,
        uint256 _price
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;

        _nft.transferFrom(msg.sender, address(this), _price); // Transfers NFT to contract

        uintToItem[itemCount] = NFTItem( // Adds item to mapping
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false,
            payable(msg.sender)
        );

        emit NFTListed(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    function purchaseNFTItem(uint256 _itemId) external payable nonReentrant {
        NFTItem storage item = uintToItem[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item doesnt exist");
        require(
            msg.value >= item.price,
            "ETH sent isn't enough to complete transaction"
        );
        require(!item.sold, "Item already sold");

        item.seller.transfer(item.price); // Sends ETH to seller
        item.owner = payable(msg.sender);
        item.sold = true;

        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit NFTBought(
            item.itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
}
