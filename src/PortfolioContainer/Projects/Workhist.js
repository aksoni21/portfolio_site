import React from "react";
import Timeline from "./Worktimeline";

const Workhist = () => {
  return (
    <div className="w" id='work'>
      <div className="w-bg"></div>
      <div className="w-wrapper">
        <h1>
          Work and Education History: {" "}
        </h1>
        <a href="ankur_soni_resume.pdf" download="ankur_soni_resume.pdf">View Resume</a>
        <div className="w-dex">
          <Timeline/>
        </div>
      </div>
    </div>
  );
};

export default Workhist;
