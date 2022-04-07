import React from 'react'
const fs = require("fs");



function Generative_art() {
    function clicked(){
        // buildSetup();
        // createFiles(edition);
        // createMetaData();
    }
  return (
    <div className='gen'><button onClick={clicked}>Click to generate</button></div>
  )
}

export default Generative_art

  // "node-sass": {
        //   "optional": true
        // },