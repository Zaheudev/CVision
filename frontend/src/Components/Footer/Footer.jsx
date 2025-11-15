import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-item">
        <h3>CV</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Creați un CV
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Șabloane de CV
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Angajatori
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Aplicări
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3>Despre noi</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Despre noi
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Prețuri
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Rețele sociale
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3>Suport</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Întrebări frecvente
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Termeni și condiții
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Politica de confidențialitate
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
