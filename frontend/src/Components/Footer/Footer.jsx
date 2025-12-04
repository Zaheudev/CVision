import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { type } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <footer className="footer-container" id="footer">
      <div className="footer-item">
        <h3 className="footer-title" onClick={() => toggleSection("despre")}>
          Despre aplicație
          <span className={`footer-arrow ${openSection === "despre" ? "open" : ""}`}>▼</span>
        </h3>
        <div className={`lst-footer ${openSection === "despre" ? "open" : ""}`}>
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
          <h3 className="footer-title" onClick={() => toggleSection("candidati")}>
            Candidați
            <span className={`footer-arrow ${openSection === "candidati" ? "open" : ""}`}>▼</span>
          </h3>
          <div className={`lst-footer ${openSection === "candidati" ? "open" : ""}`}>
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
          <h3 className="footer-title" onClick={() => toggleSection("angajatori")}>
            Angajatori
            <span className={`footer-arrow ${openSection === "angajatori" ? "open" : ""}`}>▼</span>
          </h3>
          <div className={`lst-footer ${openSection === "angajatori" ? "open" : ""}`}>
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
        <h3 className="footer-title" onClick={() => toggleSection("profil")}>
          Profilul meu
          <span className={`footer-arrow ${openSection === "profil" ? "open" : ""}`}>▼</span>
        </h3>
        <div className={`lst-footer ${openSection === "profil" ? "open" : ""}`}>
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/profil"); }}>
                Profilul meu
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/profil"); }}>
                CV-ul meu
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/settings"); }}>
                Setări cont
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3 className="footer-title" onClick={() => toggleSection("contact")}>
          Contact
          <span className={`footer-arrow ${openSection === "contact" ? "open" : ""}`}>▼</span>
        </h3>
        <div className={`lst-footer ${openSection === "contact" ? "open" : ""}`}>
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
        <h3 className="footer-title" onClick={() => toggleSection("abonament")}>
          Planuri de abonament
          <span className={`footer-arrow ${openSection === "abonament" ? "open" : ""}`}>▼</span>
        </h3>
        <div className={`lst-footer ${openSection === "abonament" ? "open" : ""}`}>
          <ul className="lst-ul">
            <li>
              <Link to="/subscription" className="lst-element-footer">
                Planul de bază
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="lst-element-footer">
                Planul premium
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3 className="footer-title" onClick={() => toggleSection("suport")}>
          Suport
          <span className={`footer-arrow ${openSection === "suport" ? "open" : ""}`}>▼</span>
        </h3>
        <div className={`lst-footer ${openSection === "suport" ? "open" : ""}`}>
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
