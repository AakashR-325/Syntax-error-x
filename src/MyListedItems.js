export default MyListedItems =  (marketPlace , nft , account , loading , setLoading , listedItems , setListedItems) => {

  const loadListedItems = async () => {
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    for(let i=1 ; i<=itemCount ; i++){
      const item = await marketPlace.items(i);
      if(item.seller.toLowerCase() == account && item.sold === false){
        const uri = await nft.tokenUri(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        let Item = {
          price : item.price,
          itemId : item.itemId,
          name : metadata.name,
          description : metadata.description,
          file : metadata.file,
          image:metadata.image,
        }

        listedItems.push(item);
      }
    }
    
    setLoading(false);
    setListedItems(listedItems);
  }
}