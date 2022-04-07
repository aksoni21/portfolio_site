import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
import Navigbar from "./Navigbar";
import ConnectWallet from "./ConnectWallet";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../abis/NFT.json";
import Market from "../abis/NFTMarket.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Resell() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  //   const router = useRouter()

  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    // router.push('/')
  }

  return (
    <div className="createitem">
      <Navigbar />
      <div className="createform">
        <div>
          <h2>Create New NFT</h2>
        </div>
        {/* <form> */}
        <div>
          <label>
            Let's first make sure your wallet is connected. Click either of
            wallet buttons below to connect.
          </label>
          <ConnectWallet clas="createbutton" />
        </div>
        <div>
          <label>Image, Video, Audio or 3D Model</label>
          <span>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </span>
        </div>
        <div>
          <input
            type="file"
            name="Asset"
            className="createbutton"
            onChange={onChange}
          />
          {fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )}
        </div>
        <br />

        <div>
          <label>
            <b>Name</b>
          </label>
          <br />
          <input
            placeholder="NFT Name"
            className="createitemboxes"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
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
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
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
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "150px",
          }}
        >
          <button className="createbutton" onClick={createMarket}>
            Create NFT
          </button>
          {/* <button onClick={createauctionitem}>Create Auct</button>
            <button onClick={getAllitems}>Get All Auction Items</button> */}
        </div>
        {/* </form>{" "} */}
      </div>
    </div>
  );
}
