import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Wallet from "./components/Wallet";
import CreateItem from "./components/CreateItem";
import ExploreAll from "./components/ExploreAll";
import MyNFTs from "./components/MyNFTs";
// import AuctionMarket from "./components/AuctionMarket";
import ItemDetail from "./itemdetails/Itemdetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/Wallet' element={<Wallet/>}></Route>
      <Route path='/CreateItem' element={<CreateItem/>}></Route>
      <Route path='/ExploreAll' element={<ExploreAll/>}></Route>
      {/* <Route path='/AuctionMarket' element={<AuctionMarket/>}></Route> */}
      <Route path='/MyNFTs' element={<MyNFTs/>}></Route>
      <Route path='/itemdetail/:stokenId' element={<ItemDetail/>}></Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
