// Ann clark pickleball tennis center 404-587-7887
// Annie will be able
// Friday nights 7-10, 6:30 check-in
// Wed is intermed starts april 4
// tucker parks and rec website.. indoor and outdoor

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Link } from "react-router-dom";
// --webmodal stuff
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// --end

import NFT from "../abis/NFT.json";
import NFTMarket from "../abis/NFTMarket.json";

import { nftaddress, nftmarketaddress } from "../config";

function GetExplore() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  // const [sold, setSold] = useState([]);//for dashboard
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    try {
      console.log("in loadnfts up top--");
      // const provider = new ethers.providers.JsonRpcProvider(); //("HTTP://127.0.0.1:7545"); //localhost on 7545
      // const rpcEndpoint =  "https://polygon-mumbai.infura.io/v3/7316f55bb4114cdcad0ae0ae2b1bb1d4"; //mumbai
      const rpcEndpoint = "https://rpc-mumbai.matic.today"; //mumbai
      const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint); //mumbai

      const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);
      console.log('marketaddress--',nftmarketaddress, provider)
      const data = await marketContract.fetchMarketItems();
      console.log('pre-bal--')
      const bal = await marketContract.pushedtoMumbai();
      console.log("in Mumbai--, data--bal--",bal.toString());
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await marketContract.tokenURI(i.tokenId);
          console.log("marketContract--", tokenUri);
          const meta = await axios.get(tokenUri);
          let buynowprice = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
          let auctionprice = ethers.utils.formatUnits(i.highestBindingBid.toString(), "ether");
          let item = {
            tokenId: i.tokenId,
            buynowprice,
            auctionprice,
            creator: i.creator,
            seller: i.seller,
            currentowner: i.currentowner,
            creatorRoyalty: i.creatorRoyalty,
            startDate: i.startDate,
            inauction: i.inauction,
            highestbidder: i.highestbidder,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          console.log("item in explore--", item);
          return item;
        })
      );
      setNfts(items);
      // console.log("itemz--", items);
      setLoadingState("loaded");
    } catch (error) {
      console.log(error);
    }
  }

  
  async function getmybids(ite) {
  
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    // getcurritems()
    console.log("pre bal--");
    const indiv = await contract.getmybids();
    console.log("sendmoeny --", indiv);
  }
  async function testfx(ite) {
  
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    // getcurritems()
    console.log("pre bal--");

    const indiv = await contract.fetchIndividualItem(ite);
    console.log("indiv --", indiv);
    
    const bindval = await contract.gethighestBindingBid(ite);
    console.log("bindval--", bindval.toString());
    const royalval = await contract.getRoyaltyAmount(ite);
    console.log("royalval bal--", royalval.toString());
    
    const sellerval = await contract.getsellervalue(ite);
    console.log("sellerval bal--", sellerval.toString());
    const enableval = await contract.getMarketEnablement();
    console.log("enableval bal--", enableval.toString());
    const creatorval = await contract.getcreatorvalue(ite);
    console.log("creatorval--", creatorval.toString());
    
    getmarketstuff();
    const marketwallet = await contract.getMarketWallet();
    console.log("marketwallet--", marketwallet.toString(), 'marketaddress--',nftmarketaddress);
    // const withdrew = await contract.withdraw();
    // console.log("withdrawal bal--", withdrawbal.toString());
  }

  async function getmarketstuff(){
    
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    // getcurritems()
    const withdrawbal = await contract.getWithdrawBalance();
    console.log("withdrawal bal--", withdrawbal.toString());
    const fullwithdrawbal = await contract.getFullMarketBalance();
    console.log("full withdrawal bal--", fullwithdrawbal.toString());
  }

  async function buyNft(nft) {
    alert("remove");
  }

  async function getcurritems() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    console.log("curritems0 done--");
    const lk = await contract.getitemcount();
    const unsold = await contract.getunsoldcount();
    console.log("in curritems--", lk.toString(), "in unsoitems--", unsold.toString());
    getmarketstuff()
  }

  return (
    <section className="allnfts">
      <button className="buy_button" style={{ height: "45px" }} onClick={() => getcurritems()}>
        get curr items
      </button>
      <div className="cards">
        {nfts.map((nft, i) => (
          <div key={i} className="cardz">
            <Link to={`/itemdetail/${nft.tokenId}`}>
              <div className="card" style={{ marginBottom: "5px", color: "violet" }}>
                <img className="nftimg" src={nft.image} />
                <p>Name - {nft.name}</p>
                <p>description - {nft.description}</p>
                <p>Buy Now Price - {nft.buynowprice} Matic</p>
                <p>Auction Price - {nft.auctionprice} Matic</p>
              </div>
            </Link>
            <div>
              <button className="buy_button" onClick={() => buyNft(nft)}>
                Buy
              </button>
              <button className="buy_button" onClick={() => testfx(nft.tokenId)}>
                Test Fxs
              </button>

              <button className="buy_button" onClick={() => getmybids()}>
                Test send money
              </button>
            </div>
            <p style={{ marginTop: "5px", color: "violet" }}>Seller - {nft.creator} </p>
            <p style={{ color: "violet" }}>Owner - {nft.owner}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetExplore;
