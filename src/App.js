import React, { useRef } from "react";
import "./App.css";
import Navigbar from "./Navigbar";
import Navigbar_copy from "./Navigbar_copy";
import Profile from "./PortfolioContainer/Home/Profile";
import Profile_orig from "./PortfolioContainer/Home/Profile_orig";
import Bcprojs from "./PortfolioContainer/Projects/Bcprojs";
import Workhist from "./PortfolioContainer/Projects/Workhist";
import Contact from "./PortfolioContainer/ContactMe/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const commentsect = useRef(null);

  const gotocomments = () =>
    window.scrollTo({ top: commentsect.current.offsetTop, behavior: "smooth" });

  return (
    <div className="App">
      <div>
        <Navigbar />
      </div>
      <div className="an">
        <Profile_orig />
        <Bcprojs />
        <Workhist />
        <Contact />
      </div>
    </div>
  );
};

export default App;
{
  /* <Router>
<Navigbar/>
<Routes>
  <Route exact path="/Bcprojs" element={<Bcprojs />}></Route>
  <Route exact path="/" element={<Profile_orig />}></Route>
</Routes>
</Router> */
}
