import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-item">
                <h3>CV</h3>
                <div className="lst">
                    <ul className="lst-ul">
                        <li><a href="#">Creați un CV</a></li>
                        <li><a href="#">Șabloane de CV</a></li>
                        <li><a href="#">Angajatori</a></li>
                        <li><a href="#">Aplicări</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-item">
                <h3>Despre noi</h3>
                <div className="lst">
                    <ul className="lst-ul">
                        <li><a href="#">Despre noi</a></li>
                        <li><a href="#">Prețuri</a></li>
                        <li><a href="#">Rețele sociale</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-item">
                <h3>Suport</h3>
                <div className="lst">
                    <ul className="lst-ul">
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Întrebări frecvente</a></li>
                        <li><a href="#">Termeni și condiții</a></li>
                        <li><a href="#">Politica de confidențialitate</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}