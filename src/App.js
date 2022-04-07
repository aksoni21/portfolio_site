import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import GetExplore from "./components/GetExplore";
import "./App.css";
import Typical from "react-typical";

import Navigbar from "./components/Navigbar";
import MyNFTs from "./components/MyNFTs";
import CreateItem from "./components/CreateItem";
import { Link } from "react-router-dom";
import { FaTwitter, FaTelegram } from "react-icons/fa";
// import Hero from "./components/Hero";

// import NFTslider from "./components/carousel/NFTslider";

import { nftaddress, nftmarketaddress } from "./config";

import NFT from "./abis/NFT.json";
import NFTMarket from "./abis/NFTMarket.json";

// --webmodal stuff
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// --end

const fs = require("fs");
function App() {
  // --webmodal stuff
  async function wallconn() {
    console.log("in walletconnect--");
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "7316f55bb4114cdcad0ae0ae2b1bb1d4", // required
        },
      },
    };
    const web3Modal = new Web3Modal({
      providerOptions, // required
    });
    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
  }
  // --end

  async function connect() {
    try {
      console.log("in connect--1");
      const web3Modal = new Web3Modal();
      console.log("in connect--2");
      const connection = await web3Modal.connect();
      console.log("in connect--3");
      const provider = new ethers.providers.Web3Provider(connection);
      console.log("in connect--4");
    } catch (error) {
      console.log("error--", error);
    }
  }
  async function connectMetaMask() {
    console.log("connecting to metamask");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    console.log("provider--", provider);
    const signer = provider.getSigner();
    alert("You are connected to MetaMask");
  }

  // if (loadingState === "loaded" && !nfts.length)
  //   return (
  //     <div>
  //       <Navigbar />
  //       <div className="App-no-items">
  //         <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="App">
      <Navigbar />
      {/* Hero----<Hero/> */}
      {/* <Carousel slides={SliderImage}/> */}
      {/* <Idiot/> */}
      {/* <NFTslider/> */}

      <div className="homeimg-container">
        <div className="encanto">
          {/* <span className="primary-text"> */}
          <div className="typical">
            <h1 className="typ-header">Encanto NFTs</h1>
            <h2 className="typ">
              <Typical
                loop={Infinity}
                steps={[
                  "Discover, Collect, and Create NFTs",
                  2500,
                  "Let's Demystify Blockchain",
                  2500,
                  "Gotta Catch 'Em All!",
                  2500,
                ]}
              />
            </h2>
          </div>

          {/* </span> */}
          {/* <div className="media851-mainbuttons">
            <Link to="/ExploreAll" className="btn btn-primary">
              Explore Encanto
            </Link>
            <Link
              className="btn btn-primary"
              to="/CreateItem"
              style={{ marginLeft: "5px" }}
            >
              Create a new NFT
            </Link>
          </div> */}
          <div className="icons" style={{ position: "relative" }}>
            <span>Follow Us On:</span>
            <br />
            <a href="https://www.twitter.com/EncantoNft">
              <FaTwitter size="3rem" color="#1DA1F2" />
            </a>{" "}
            <a href="https://t.me/encantonft">
              <FaTelegram size="3rem" color="#0088CC" />
            </a>
          </div>
        </div>
        <Link to="/ExploreAll">
          <div className="mustang-container">
            <img
              className="mustang"
              // src={nfts.map((nft, 1 }
              // src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
              src="https://static.displate.com/857x1200/displate/2021-09-28/b5fd1c0ba7beb37b84c152ad81901a7c_f1df2c07e2a03ce7eca2177cd03e1531.jpg"
              alt=""
            />
            <img
              src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
              alt=""
            />

            <a href="www.ankursoni.com">hola-kanola</a>
            {/* <button style={{opacity:0.25}} onClick={() => wallconn()}>Connect</button>   */}
          </div>
        </Link>
        <div className="media850-mainbuttons">
          <Link to="/ExploreAll" className="btn btn-primary">
            Explore Encanto
          </Link>
          <Link className="btn btn-primary" to="/CreateItem" style={{ marginLeft: "5px" }}>
            Create a new NFT
          </Link>
        </div>
        
      </div>
      
    </div>
  );
}
export default App;
