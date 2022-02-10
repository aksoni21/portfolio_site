import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="c" id='cont'>
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Get in touch!</h1>
          <div className="c-info">
            <div >Email: ankur.soni414@gmail.com</div>
          </div>

          <div className="c-info">
            Social:
            </div><div>
            <a href="http://linkedin.com/in/ankurksoni/">
              LinkedIn
            </a>{" "}
            <a href="https://twitter.com/aksoni21">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

{
  /* <div className="c-right">
<div className="c-desc">
  <form>
    <input type="text" placeholder = 'Name' name='user_name'/>
    <br/>
    <input type="text" placeholder = 'Subject' name='user_subject'/>
    <br/>
    <input type="text" placeholder = 'Email' name='user_email'/>
 <textarea rows='5' placeholder = 'message' name = 'message'/>
 <button>Submit</button>
  </form>
</div>
</div> */
}
