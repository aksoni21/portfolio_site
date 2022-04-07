import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
// --webmodal stuff
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// --end

import NFT from "../abis/NFT.json";
import NFTMarket from "../abis/NFTMarket.json";

import { nftmarketaddress } from "../config";

function GetNFTs() {
  const [boughtNfts, setBoughtNfts] = useState([]);
  const [createdNfts, setCreatedNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [formInput, updateFormInput] = useState({
    newprice: "",
    name: "",
    description: "",
  });
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    // console.log("in loadnfts--");
    // const provider = new ethers.providers.JsonRpcProvider(); //("HTTP://127.0.0.1:7545"); //localhost on 7545
    // const rpcEndpoint =  "https://polygon-mumbai.infura.io/v3/7316f55bb4114cdcad0ae0ae2b1bb1d4"; //mumbai
    // const rpcEndpoint = "https://rpc-mumbai.matic.today"; //mumbai
    // const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint); //mumbai
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

    console.log("in getmynfts nftmarketaddress--", nftmarketaddress, "signer--", signer);
    if ((signer.provider.address = "0x924ca5161df8C95539c90FD49F281F5F805fA249")) {
      console.log("Hello Diya");
    } else {
      console.log(signer.provider.address);
    }
    const boughtdata = await marketContract.fetchMyNFTs();

    console.log("boughtdata--", boughtdata);
    const boughtitems = await Promise.all(
      boughtdata.map(async (i) => {
        const tokenUri = await marketContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
        let buynowprice = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
        let auctionprice = ethers.utils.formatUnits(i.highestBindingBid.toString(), "ether");

        let boughtitem = {
          buynowprice,
          tokenId: i.tokenId,
          auctionprice,
          creator: i.creator,
          seller: i.seller,
          currentowner: i.currentowner,
          creatorRoyalty: i.creatorRoyalty,
          startDate: i.startDate,
          inauction: i.inauction,
          highestidder: i.highestBidder,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        // console.log("nft tokenid, uri--",i.tokenid,tokenUri,"--",boughtitem);
        return boughtitem;
      })
    );
    setBoughtNfts(boughtitems);

    const createddata = await marketContract.fetchItemsCreated();
    const createditems = await Promise.all(
      createddata.map(async (i) => {
        const tokenUri = await marketContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let buynowprice = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
        let auctionprice = ethers.utils.formatUnits(i.highestBindingBid.toString(), "ether");

        let createditem = {
          buynowprice,
          tokenId: i.tokenId,
          auctionprice,
          creator: i.creator,
          seller: i.seller,
          currentowner: i.currentowner,
          creatorRoyalty: i.creatorRoyalty,
          startDate: i.startDate,
          inauction: i.inauction,
          highestidder: i.highestBidder,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return createditem;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = createditems.filter((i) => i.sold);
    setSold(soldItems);
    setCreatedNfts(createditems);

    setLoadingState("loaded");
  }
  async function Relist(nft) {
    try {
      const { name, description, newprice } = formInput;

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log("in relist nft--", nft);
      const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      console.log("in relist signer-- ", signer, "nftmarketaddress--", nftmarketaddress);
      const newnowprice = ethers.utils.parseUnits(formInput.newprice, "ether");
      // const price = ethers.utils.parseUnits(nft.buynowprice, "ether");
      /* then list the item for sale on the marketplace */
      let listingPrice = await contract.getListingPrice();
      console.log("in relisting price-- ", newnowprice.toString(), "listingprice--", listingPrice);

      // let nftcontract = new ethers.Contract(nftaddress, NFT.abi, signer);
      console.log("in relisting tokenid-- ", nft.tokenId);

      // let approval = await nftcontract.giveResaleApproval(nft.tokenId);
      // console.log("approval--", approval);
      const transaction = await contract.resellitem(nft.tokenId, newnowprice, newnowprice, {
        value: listingPrice,
      });
      console.log("in relist transaction-- ", transaction);
      await transaction.wait();
      // loadNFTs();
    } catch (error) {
      console.log("error--", error);

      if (error.data["message"].includes("insufficient funds")) {
        alert("you paid yo billz bro?? Cuz you aint got no money in yo bank!!");
      } else {
        console.log("error mess--", error.data["message"]);
      }
    }
  }

  // if (loadingState === "loaded" && !nfts.length)
  //   return <h1 className="py-10 px-20 text-3xl">No NFTs in this section.</h1>;

  return (
    <section className="allnfts">
      <div className="pagetitlesection">
        <h2>My Purchased NFTs</h2>
      </div>
      <div className="cards">
        {boughtNfts.map((nft, i) => (
          <div key={i} className="cardz">
            <div className="card">
              <img className="nftimg" src={nft.image} />
              <p>Name - {nft.name}</p>
              <p>description - {nft.description}</p>
              <p>Price - {nft.buynowprice} Matic</p>
            </div>
            <div>
              <label>
                <b>Name</b>
              </label>
              <br />
              <input
                placeholder="NFT Name"
                className="createitemboxes"
                onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
              />
            </div>

            <div>
              {/* <h6>Description</h6> */}
              <label>
                <b>Description</b>
              </label>
              <br />
              <textarea
                placeholder="NFT Description"
                className="createitemboxes"
                style={{ height: "100px" }}
                onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
              />
            </div>

            <div>
              {/* <h6>Price in Polygon (Matic)</h6> */}
              <label>
                <b>Price in Polygon</b>
              </label>
              <br />
              <input
                placeholder="NFT Price in Matic"
                className="createitemboxes"
                // className="mt-2 border rounded p-4"
                onChange={(e) => updateFormInput({ ...formInput, newprice: e.target.value })}
              />
            </div>
            <div>
              <button className="buy_button" onClick={() => Relist(nft)}>
                List for Sale on Marketplace
              </button>
            </div>
            <p style={{ marginTop: "25px", color: "violet" }}>Seller - {nft.seller} </p>
            <p style={{ color: "violet" }}>Owner - {nft.owner}</p>
          </div>
        ))}
      </div>
      <div>
        {Boolean(sold.length) && (
          <div>
            <div className="pagetitlesection">
              <h2>My Sold NFTs</h2>
            </div>
            <div className="cards">
              {sold.map((nft, i) => (
                <div key={i}>
                  <img src={nft.image} />
                  <div>
                    <p>Price - {nft.buynowprice} Eth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pagetitlesection">
        <h2>NFTs I Created</h2>
      </div>
      <div className="cards">
        {createdNfts.map((nft, i) => (
          <div key={i} className="cardz">
            <div className="card">
              <img className="nftimg" src={nft.image} />
              <p>Price - {nft.buynowprice} Matic</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetNFTs;
