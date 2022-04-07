import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
import Navigbar from "./Navigbar";
import ConnectWallet from "./ConnectWallet";
import { useNavigate } from "react-router-dom";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../abis/NFT.json";
import Market from "../abis/NFTMarket.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [disableFileBtn, setdisableFileBtn] = useState(false);
  const [disableSubmit, setdisableSubmit] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
    buynowprice: "",
    royalty: "",
    auctionbool: true,
    auctionprice: "",
  });
  //   const router = useRouter()
  console.log('marketaddress--', nftmarketaddress);
  const navi = useNavigate();
  function reroute() {
    console.log("rero");
    navi("/ExploreAll");
  }
  async function onChange(e) {
    setdisableFileBtn(true);
    const file = e.target.files[0];
    console.log("file 1--");
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      console.log("file 2--", file);
      if (!file) {
        setdisableFileBtn(false);
        console.log("No file, file btn enable");
      }

      console.log("file 3--");
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setdisableFileBtn(false);
      console.log("file upload error, file btn enable");
    }
  }
  async function createNFT() {
    const { name, description, buynowprice, auctionprice, royalty } = formInput;
    if (!name || !description || !buynowprice || !auctionprice || !royalty || !fileUrl) {
      console.log("missing parameters in create item--");
      return;
    }
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    console.log("in create item, data--", data);
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      console.log("in create item, url--", url);
      createtoken(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createtoken(url) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log("in create Token");
      // let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
      const auctionprice = ethers.utils.parseUnits(formInput.auctionprice, "ether");
      const buynowprice = ethers.utils.parseUnits(formInput.buynowprice, "ether");
      const royal =formInput.royalty*100;
      console.log("royal--");
      const listingPrice = await contract.getListingPrice();
      console.log("royal2--");
      const transaction = await contract.createToken(
        url,
        buynowprice,
        royal,
        auctionprice,
        formInput.auctionbool,
        {
          value: listingPrice,
        }
      );
      const tx = await transaction.wait();
      navi("/ExploreAll");
    } catch (error) {
      alert("Error occured while creating this item");
    }
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
            Let's first make sure your wallet is connected. Click either of wallet buttons below to
            connect.
          </label>
          <ConnectWallet clas="createbutton" />
        </div>
        <div>
          <label>Image, Video, Audio or 3D Model</label>
          <span>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size:
            100 MB
          </span>
        </div>
        <div>
          <input
            type="file"
            name="Asset"
            className="createbutton"
            disabled={disableFileBtn}
            onChange={onChange}
          />
          <br />
          {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        </div>
        <br />

        <div>
          <label>
            <b>
              Name <span style={{ color: "red" }}> * </span>{" "}
            </b>
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
            <b>
              Description <span style={{ color: "red" }}> * </span>{" "}
            </b>
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
            <b>
              Buy Now Price in Polygon <span style={{ color: "red" }}> * </span>{" "}
            </b>
          </label>
          <br />
          <input
            placeholder="Buy Now NFT Price in Matic"
            className="createitemboxes"
            // className="mt-2 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, buynowprice: e.target.value })}
          />
        </div>
        <div>
          <label>
            <b>
              Royalties for any Future Resale <span style={{ color: "red" }}> * </span>{" "}
            </b>
          </label>
          <br />
          <input
            placeholder="Input the percentage of royalty"
            className="createitemboxes"
            // className="mt-2 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, royalty: e.target.value })}
          />
        </div>
        <div>
          <label>
            <b>List item for auction?</b>
          </label>
          <br />
          <input
            type="checkbox"
            style={{ height: "20px", width: "20px" }}
            defaultChecked
            // className="createitemboxes"
            // className="mt-2 border rounded p-4"

            onChange={(e) => updateFormInput({ ...formInput, auctionbool: e.target.checked })}
          />
        </div>

        <div>
          <label>
            <b>Auction Price in Polygon</b>
          </label>
          <br />
          <input
            placeholder="Auction NFT Price in Matic"
            className="createitemboxes"
            // className="mt-2 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, auctionprice: e.target.value })}
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
          <button className="createbutton" onClick={createNFT}>
            Create NFT
          </button>
        </div>
        {/* </form>{" "} */}
      </div>
    </div>
  );
}
