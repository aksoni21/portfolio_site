import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../abis/NFT.json";
import Market from "../abis/NFTMarket.json";
import Navigbar from "./Navigbar";
import GetNFTs from "./GetMyNFTs";

function MyNFTs() {
  return (
    <div className="mynfts">
      <Navigbar />
      <div className="bgimg-container">
        <div>
          <GetNFTs/>
        </div>
        
      </div>
    </div>
  );
}

export default MyNFTs;
