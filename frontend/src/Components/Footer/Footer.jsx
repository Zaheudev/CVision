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
          Despre noi
        </h3>
        <div className={`lst-footer ${openSection === "despre" ? "open" : ""}`}>
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/echipa"); }}>
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
          </h3>
          <div className={`lst-footer ${openSection === "candidati" ? "open" : ""}`}>
            <ul className="lst-ul">
              <li>
                <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/cv"); }}>
                  CV-ul meu
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
          </h3>
          <div className={`lst-footer ${openSection === "angajatori" ? "open" : ""}`}>
            <ul className="lst-ul">
              <li>
                <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/my-jobs"); }}>
                  Job-urile mele
                </a>
              </li>
              <li>
                <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/candidati?top=true"); }}>
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
        </h3>
        <div className={`lst-footer ${openSection === "profil" ? "open" : ""}`}>
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/profil"); }}>
                {type === "candidate" ? "Profil candidat" : "Profil angajator"}
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
        </h3>
        <div className={`lst-footer ${openSection === "contact" ? "open" : ""}`}>
          <ul className="lst-ul">
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
                Rețele de socializare
              </a>
            </li>
            <li>
              <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
                Feedback
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <h3 className="footer-title" onClick={() => toggleSection("abonament")}>
          Planuri de abonament
        </h3>
        <div className={`lst-footer ${openSection === "abonament" ? "open" : ""}`}>
          <ul className="lst-ul">
            {type === "candidate" && (
              <li>
                <Link to="/subscription" className="lst-element-footer">
                  Candidați
                </Link>
              </li>
            )}
            {type === "employer" && (
              <li>
                <a href="#" className="lst-element-footer" onClick={(e) => { e.preventDefault(); navigate("/subscription"); }}>
                  Angajatori
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
