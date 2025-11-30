import React, { useContext } from "react";
import "./Footer.css";
import { UserContext } from "../../context/UserContext";

export default function Footer() {
  const { type } = useContext(UserContext);
  return (
    <footer className="footer-container" id="footer">
      <div className="footer-item">
        <h3>Despre aplicație</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Misiune
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Viziune
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Problema aplicațiilor asemanătoare și soluționarea lor
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Folosirea Ai-ului
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Limbaje folosite
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Organizarea aplicației
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Echipa
              </a>
            </li>
          </ul>
        </div>
      </div>
      {type !== "employer" && (
        <div className="footer-item">
          <h3>Candidați</h3>
          <div className="lst-footer">
            <ul className="lst-ul">
              <li>
                <a href="#" className="lst-element-footer">
                  Test de personalitate
                </a>
              </li>
              <li>
                <a href="#" className="lst-element-footer">
                  Aplicările mele
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {type !== "candidate" && (
        <div className="footer-item">
          <h3>Angajatori</h3>
          <div className="lst-footer">
            <ul className="lst-ul">
              <li>
                <a href="#" className="lst-element-footer">
                  Jobul meu
                </a>
              </li>
              <li>
                <a href="#" className="lst-element-footer">
                  Top 10 candidați ideali
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="footer-item">
        <h3>Profilul meu</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Profil candidat
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Profil angajator
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                CV-ul meu
              </a>
            </li>
            <li>
              <a href="/settingscandidat" className="lst-element-footer">
                Setări cont
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3>Contact</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Rețele sociale
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Feedback
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3>Planuri de abonament</h3>
        <div className="lst-footer">
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer">
                Planul de bază
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer">
                Planul premium
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
