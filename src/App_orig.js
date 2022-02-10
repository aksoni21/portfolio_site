// import { useMediaQuery } from 'react-responsive'
import React from "react";
import Profile from "./PortfolioContainer/Home/Profile";
import "./App.css";
import Typical from "react-typical";

// windowdimensions()

function App() {
  return (
    <div>
    <Profile/>
    <h1>helllllooo</h1>
    </div>
  );
}



// // --
// import { useState, useEffect } from 'react';

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height
//   };
// }

// export default function useWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowDimensions;
// }
// // --

// function windowdimensions(){
//     const { innerWidth: width, innerHeight: height } = window;
//     // alert(width)
//     // alert(height)
//     return {
//       width,
//       height
//     };
// }
export default App;
