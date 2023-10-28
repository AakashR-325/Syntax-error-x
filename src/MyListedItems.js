const pushItem = async (nft, tokenID, itemList) => {
    const uri = await nft.tokenUri(tokenID);
    const response = await fetch(uri);
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
}


export const loadListedItems = async (marketPlace, nft, account, loading, setLoading, setListedItems) => {
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.items(i);
        if (item.seller !== account && !(item.sold)) {
            pushItem(nft, item.tokenId, listedItems)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}
export const loadCreatedItems = async (marketPlace, nft, account, loading, setLoading, setListedItems) => {
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.items(i);
        if (item.seller === account && !(item.sold)) {
            pushItem(nft, item.tokenId, listedItems)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}
export const loadBoughtItems = async (marketPlace, nft, account, loading, setLoading, setListedItems) => {
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await marketPlace.items(i);
        if (item.owner === account && item.sold) {
            pushItem(nft, item.tokenId, listedItems)
        }
    }
    setLoading(false);
    setListedItems(listedItems);
}

