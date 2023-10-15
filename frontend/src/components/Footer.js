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
            <h3>SBCH Community</h3>
            <div className="social-links">
              <a
                href="https://t.me/smartbch_community"
                target="_blank"
                aria-label="Telegram"
              >
                <TbBrandTelegram size={20} />
              </a>
            </div>
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
