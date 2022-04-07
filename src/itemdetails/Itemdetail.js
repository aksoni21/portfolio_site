import React, { useState, useEffect } from "react";
import Navigbar from "../components/Navigbar";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
// --webmodal stuff
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// --end
import NFT from "../abis/NFT.json";
import NFTMarket from "../abis/NFTMarket.json";

import { nftaddress, nftmarketaddress } from "../config";

function Itemdetail() {
  console.log("1--");
  const { stokenId } = useParams();
  const [selectedNFT, setSelectedNFT] = useState([]);
  const [creatorNFTs, setCreatorNFTs] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [bidInput, updateBidInput] = useState({ bid: "" });

  console.log("1.5--", selectedNFT);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    const thisData = await marketContract.fetchIndividualItem(stokenId);
    console.log("5--thisData--", thisData);
    console.log('sentTokenId--',stokenId)
    const ThisItems = await Promise.all(
      thisData.map(async (i) => {
        const tokenUri = await marketContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let buynowprice = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
        let auctionprice = ethers.utils.formatUnits(i.highestBindingBid.toString(), "ether");
        let thisItem = {
          tokenId: i.tokenId,
          buynowprice,
            auctionprice,
            creator: i.creator,
            seller: i.seller,
            currentowner: i.currentowner,
            creatorRoyalty: i.creatorRoyalty,
            startDate: i.startDate,
            inauction: i.inauction,
            highestbidder: i.highestBidder,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
        };
        return thisItem;
      })
    );
    setSelectedNFT(ThisItems);
    const thisCreatorData = await marketContract.fetchIndividualCreatorItems(stokenId);
    const CreatorItems = await Promise.all(
      thisCreatorData.map(async (i) => {
        const tokenUri = await marketContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let buynowprice = ethers.utils.formatUnits(i.buynowprice.toString(), "ether");
        let auctionprice = ethers.utils.formatUnits(i.highestBindingBid.toString(), "ether");
        let creatorItem = {
          tokenId: i.tokenId,
          buynowprice,
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

        return creatorItem;
      })
    );
    setCreatorNFTs(CreatorItems);
  }

  function toggleTab(index) {
    setToggleState(index);
  }
  function test1() {
    alert("test fx 1");
  }

  function test2() {
    alert("test fx 2");
  }
  async function finalizeAuction(nft, type) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      const signeraddr = await signer.getAddress();
      const marketenable=await contract.getMarketEnablement();
      const fakeprice = ethers.utils.parseUnits(nft.auctionprice.toString(), "ether");
      console.log("in finalize, saleprice=", fakeprice, "creatorRoyalty--", nft.creatorRoyalty,nft.creatorRoyalty.toString(), 'enablement--',marketenable);
      if (signeraddr !== nft.currentowner && signeraddr !== nft.creator) {
        alert("Only current owner of the NFT can finalize the auction");
      } else if (nft.highestbidder.toString() == signeraddr) {
        await contract.turnOffAuction(nft.tokenId);
        alert("This item auction has been turned off. Users can buy this item without placing a bid");
      } else {
        const price = ethers.utils.parseUnits(nft.auctionprice.toString(), "ether");
        console.log("nft highestbidder--", nft.highestbidder, "--", nft.highestbidder.toString());
        await contract.turnOffAuction(nft.tokenId);
        const transaction = await contract.finalizeAuction(nft.tokenId, {
          value: price,
        });
        await transaction.wait();
        alert('Sale finalized!')
      }
      loadNFTs();
    } catch (error) {
      console.log("error--", error);
    }
  }
  
  async function buyNft(nft, type) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      console.log("in buynft 2, nft --", nft);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log("in buynft--", nftmarketaddress, "--", signer, "--", nft);
      const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      const signeraddr = await signer.getAddress();

      if (signeraddr == nft.currentowner && signeraddr == nft.creator) {
        alert("Current Owner of the NFT cannot buy the NFT");
      } else if (nft.inauction == true) {
        alert("Cannot buy the item because it is in Auction. Place a bid instead");
      } else {
        const price = ethers.utils.parseUnits(nft.buynowprice.toString(), "ether");
        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price,
        });
        await transaction.wait();
      }
      loadNFTs();
    } catch (error) {
      console.log("error--", error);
    }
  }
  

  async function returnMyBid(ite, topbidder) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      const signeraddr = await signer.getAddress();
      console.log("add,bidder--", signeraddr, topbidder, signeraddr != topbidder);
      if (signeraddr != topbidder) {
        const mybid = await contract.getbids(ite);

        if (mybid.toString() !== "0") {
          const bidreturned = await contract.returnBid(ite);
          console.log("bid returned--", bidreturned);
        } else {
          alert("You have not placed any bids on this item");
        }
      } else {
        alert("Highest bidder cannot withdraw their bid");
      }
    } catch (error) {
      console.log(error);
      alert("Cannot perform this action");
    }
  }
  async function getmybid(ite) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

    // const highestbidder = await contract.gethighestBidder(ite);
    // const highestbid = await contract.gethighestBindingBid(ite);
    const mco = await contract.getMarketContractOwner();
    const mybid = await contract.getbids(ite);
    console.log(
      // "in getbids--highestbidder--",
      // highestbidder,
      // "highestbid--",
      // highestbid.toString(),
      "mybid--",
      mybid.toString(),
      "mco--",
      mco
    );
  }
  async function setnewbid(ite, thiscreator, currowner, newbid) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      const signeraddr = await signer.getAddress();

      console.log('signer and creator--',ite);
      if (signeraddr !== currowner && signeraddr !== thiscreator) {
        const fbid = ethers.utils.parseUnits(newbid.toString(), "ether");
        console.log("fbid--", fbid.toString());

        const updatebid = await contract.placeBid(ite, {
          value: fbid,
        });
        console.log("in setbids--signer--", signer, "newbid--", updatebid);
      } else {
        alert("Current Owner of the NFT cannot place a bid on the NFT");
      }
    } catch (error) {
      console.log("error--", error);
    }
  }

  return (
    <div className="detail">
      <Navigbar />
      {selectedNFT.map((nft, i) => (
        <div className="detail-both">
          <div key={i} className="detail-left">
            <div>
              <img className="nftimg" src={nft.image} />
            </div>
          </div>
          <div className="detail-right">
            <section className="detail-header">
              <h1>Selected Name of the ones - {nft.name}</h1>
              <h4>Selected description - {nft.description}</h4>
            </section>
            <div className="tab-container">
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Make an Offer
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Buy Now
                </button>
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Tab 3
                </button>
              </div>

              <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                  In Auction - {nft.inauction}
                  <br />
                  Current Bid - <h2>{nft.auctionprice}</h2>
                  {/* <hr /> */}
                  <label>
                    <b>Place Bid (in Matic)</b>
                  </label>
                  <br />
                  <input
                    placeholder="Bid in Matic"
                    style={{ width: "95%" }}
                    onChange={(e) =>
                      updateBidInput({
                        ...bidInput,
                        bid: e.target.value,
                      })
                    }
                  />
                  <button
                    className="buy_button"
                    onClick={() =>
                      setnewbid(nft.tokenId, nft.creator, nft.currentowner, bidInput.bid)
                    }
                  >
                    Bid
                  </button>
                  <button className="buy_button" onClick={() => getmybid(nft.tokenId)}>
                    Get my Bid
                  </button>
                  <button
                    className="buy_button"
                    onClick={() => returnMyBid(nft.tokenId, nft.highestbidder)}
                  >
                    Return My Bid
                  </button>
                  <button
                    className="buy_button"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Are you sure you want to end this auction and sell to the highest bidder?"
                      );
                      if (confirmBox === true) {
                        finalizeAuction(nft, "auction");
                      }
                    }}
                  >
                    Finalize Auction
                  </button>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                  Buy Now Price - <h2>{nft.buynowprice}</h2>
                  {/* <hr /> */}
                  <button className="buy_button" onClick={() => buyNft(nft, "buynow")}>
                    Buy now
                  </button>
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                  <h2>Content 3</h2>
                  <hr />
                  <p>Lorem ipsum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h2>More from the creator</h2>
      <div className="cards">
        {creatorNFTs.map((nft, i) => (
          <div key={i} className="cardz">
            <div className="card">
              <img className="nftimg" src={nft.image} />
              <p>Name - {nft.name}</p>
              <p>description - {nft.description}</p>
              <p>Price - {nft.buynowprice} Matic</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itemdetail;
