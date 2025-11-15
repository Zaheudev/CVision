import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import logoPNG from "../Assets/logo.png";
import logosmallPNG from "../Assets/logosmall.png";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="header-container">
      {" "}
      <header className="header">
        {" "}
        <div className="logo-section item">
          {" "}
          <a href="/" className="">
            {" "}
            <img
              src={logoPNG}
              alt="Logo"
              className="logo-png desktop-logo"
            />{" "}
            <img
              src={logosmallPNG}
              alt="Logo Small"
              className="logo-png mobile-logo"
            />{" "}
          </a>{" "}
        </div>{" "}
        <ul className="lst item">
          {" "}
          <li>
            <a href="#" className="lst-item">
              Despre
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Candidați
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Angajatori
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Aplică acum
            </a>
          </li>{" "}
          <li>
            <a
              href="#"
              className="lst-item"
              onClick={() => navigate("/profil-candidat")}
            >
              Profilul meu
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Rețele sociale
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Contact
            </a>
          </li>{" "}
          <li>
            <a href="#" className="lst-item">
              Mai multe
            </a>
          </li>{" "}
        </ul>{" "}
        {!localStorage.getItem("id") && (
          <div className="btn-section item">
            {" "}
            <div className="btn-item">
              <button
                type="button"
                className="btn btn-Login"
                onClick={() => navigate("/")}
              >
                Autentificare
              </button>
            </div>{" "}
            <div className="btn-item">
              <button
                type="button"
                className="btn btn-Signup"
                onClick={() => navigate("/register")}
              >
                Înregistrare
              </button>
            </div>{" "}
          </div>
        )}{" "}
        <button className="menu-btn" onClick={toggleMenu}>
          Meniu ☰
        </button>
      </header>{" "}
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Despre
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Candidați
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Angajatori
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Aplică acum
          </a>
          <a
            href="#"
            className="mobile-item"
            onClick={() => {
              navigate("/profil-candidat");
              toggleMenu();
            }}
          >
            Profilul meu
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Rețele sociale
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Contact
          </a>
          <a href="#" className="mobile-item" onClick={toggleMenu}>
            Mai multe
          </a>
          {!localStorage.getItem("id") && (
            <>
              <button
                className="mobile-btn"
                onClick={() => {
                  navigate("/");
                  toggleMenu();
                }}
              >
                Autentificare
              </button>
              <button
                className="mobile-btn"
                onClick={() => {
                  navigate("/register");
                  toggleMenu();
                }}
              >
                Înregistrare
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
