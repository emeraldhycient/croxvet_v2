import React from "react";
import logo from "../images/crox/croxvest-nobg.png"

function Footer() {
  const d = new Date();
  const year = d.getFullYear();

  return (
     <div>
  <div id="footer">
    <div id="sub_footer">
      <div className="footer_one">
        <div className="fologo">
          
        </div>
        <div className="fologo_text">
          <p>Croxvest<br />
            14 Macpherson Road #07-02 Pines Industrial Building, 348574, Singapore<br />
            Company number : #9912289
          </p>
        </div>
      </div>
      {/*--visualhyip.com--*/}
      <div className="footer_two">
        <div className="site-head">
          <p><i className="fas fa-angle-double-right" /> Contact Us</p>
        </div>
        <div className="phonea">
          <p><i className="fas fa-phone-square" /> Phone : </p>
        </div>
        <div className="phonea">
          <p><i className="fas fa-envelope" /> support@Croxvest.com</p>
        </div>
      </div>
      <div className="footer_three">
        <div className="site-head">
          <p><i className="fas fa-angle-double-right" /> Quick Link</p>
        </div>
        <div className="menu-down">
          <div className="link-one">
            <ul>
              <li><a href="/home"><i className="fas fa-circle" /> Home</a></li>
              <li><a href="/about"><i className="fas fa-circle" /> About Us</a></li>
              <li><a href="/"><i className="fas fa-circle" /> Rules</a></li>
              <li><a href="/faq"><i className="fas fa-circle" /> FAQ</a></li>
            </ul>
          </div>
          <div className="link-one">
            <ul>
              <li><a href="/login"><i className="fas fa-circle" /> Log In</a></li>
              <li><a href="/signup"><i className="fas fa-circle" /> Sign Up</a></li>
              <li><a href="/"><i className="fas fa-circle" /> Rate Us</a></li>
              <li><a href="/contact"><i className="fas fa-circle" /> Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="down_footer">
    <div id="sub_footera">
      <div className="reserved">
        <p>©{year} All Rights Reserved By Croxvest</p>
      </div>
      <div className="mediaal">
        <div className="media_one">
          <a target="_blank" href="https://www.facebook.com/"><i className="fab fa-facebook-f" /> Facebook</a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Footer;
