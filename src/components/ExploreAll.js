import React from "react";
import GetExplore from "./GetExplore";
import Navigbar from "./Navigbar";
function ExploreAll() {
  return (
    <div className="explore">
      <Navigbar />
      <div className="bgimg-container">
          <div className="pagetitlesection">
            <h2>Explore Encanto Collections!</h2>
          </div>

          <div>
            <GetExplore page="encanto" />
          </div>
      </div>
    </div>
  );
}

export default ExploreAll;
