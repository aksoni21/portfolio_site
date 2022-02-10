import React from "react";

const Bcprojs = () => {
  return (
    <div className="b" id='bcpr'>
      <div className="b-bg"></div>
      <div className="b-wrapper">
        <h1>
          Self-taught Web3 Projects:
        </h1>
        <div className="b-dex">
          <a href="http://dex.ankursoni.com/">Decentralized Exchange:</a>
          <p>
            Buy 'eRAD' Token on Ropsten test network by connecting to Metamask
            and using test Ether
          </p>
        </div>
        <div className="b-nft">
          <a href="http://nftgame.ankursoni.com/">NFT Memory Game:</a>
          <p>
            Play a game where matching two images mints a NFT Memory Token on
            Ropsten test network. Connect to Metamask and mint Memory Token
            using test Ether
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bcprojs;
