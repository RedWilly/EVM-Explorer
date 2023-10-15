/* eslint-disable */
import React from "react";
import "./Footer.css";
import { TbBrandTelegram } from "react-icons/tb";
import { BsMedium, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h3>Contribute</h3>
            <ul>
              <li>
                <a href="https://github.com/RedWilly/EVM-Explorer" target="_blank">
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact TG</h3>
            <ul>
              <li>@Rink3y</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foo">
        forked from © GENERATION
      </div>
    </footer>
  );
};

export default Footer;
