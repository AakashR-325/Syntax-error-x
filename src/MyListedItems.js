import { ethers } from "ethers";
import MarketplaceABI from './contract-details/MarketPlaceABI.json'
import NFTFactoryABI from './contract-details/NFTFactoryABI.json'
import axios from "axios";

const marketplaceAddress = "0xd3B9396e2Bd54e180440B113f2569e72541b5A60"
const factoryAddress = "0x35BFa15f4a26e863EB051274E9a81DaE84E12ECB"

const pushItem = async (provider, tokenID, itemList, item) => {
    const nftFactory = new ethers.Contract(factoryAddress, NFTFactoryABI, provider)
    const signer = provider.getSigner()
    try{
        const uri = await nftFactory.tokenURI(tokenID);
        const response = await axios.get(uri, {
            headers : {
                Accept : 'text/plain',
                // 'x-pinata-gateway-token' : "f7B0eqAguCYI_Ifm419TM221SUkbzOXrWdM3vES4T3LWQXpTTJ0YUr-JP8M-EeRA",
            }
        })
        const metadata = await response.json();
        let Item = {
            price: item.price,
            itemId: item.itemId,
            name: metadata.name,
            description: metadata.description,
            file: metadata.file,
            image: metadata.image,
        }
        itemList.push(Item);
    } catch(error) {
        console.log(error)
    }
}


export const loadListedItems = async (provider, nft, account, loading, setLoading, setListedItems) => {
    const marketPlace = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider)
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    console.log(itemCount)
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.uintToItem(i);
        console.log(item)
        if (item.seller !== account && !(item.sold)) {
            console.log(item)
            console.log(item.tokenId)
            pushItem(provider, item.tokenId, listedItems, item)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}
export const loadCreatedItems = async (provider, nft, account, loading, setLoading, setListedItems) => {
    const marketPlace = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider)
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.uintToItem(i);
        if (item.seller === account && !(item.sold)) {
            console.log(item)
            pushItem(provider,item.tokenId, listedItems, item)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}
export const loadBoughtItems = async (provider, nft, account, loading, setLoading, setListedItems) => {
    const marketPlace = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider)
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.uintToItem(i);
        if (item.owner === account && item.sold) {
            pushItem(provider,  item.tokenId, listedItems, item)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}

