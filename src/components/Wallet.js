import React from "react";
import ConnectWallet from "./ConnectWallet";
import Navigbar from "./Navigbar";

function Wallet() {
  return (
    <div className="explore">
      <Navigbar />
      <div className="bgimg-container">
        <div>
          <div className="pagetitlesection">
            <h2>Connect to a Wallet</h2>
            {/* <p>If you don't have a wallet, you can download metamask here. MetaMask is the most popular Web3 Wallet and it is completely safe and secure </p> */}
          </div>
          <div className="media850-mainbuttons">
            <ConnectWallet clas="btn btn-primary" />
          </div>
          <div className="media851-mainbuttons">
            <ConnectWallet clas="btn btn-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
