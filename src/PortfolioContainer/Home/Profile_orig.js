import React from "react";
import Typical from "react-typical";
import "./Profile_orig.css";

export default function Profile() {
  return (
    <div className="profile-container" id="prof">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="profile-details-name">
            <span className="p-name-span">
              {" "}
              Hi, my name is <span className="AS">Ankur Soni.</span> I am a:
            </span>
            <br/><br/>
            <div>
              <span className="primary-text">
                <h1 className="typ">
                  <Typical
                    loop={Infinity}
                    steps={[
                      "Web3 Enthusiast",
                      2500,
                      "Senior Product Manager",
                      2500,
                      "Blockchain Engineer",
                      2500,
                      "Game Of Thrones Fan!!",
                      2500,
                    ]}
                  />
                </h1>
              </span>
            </div>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}
