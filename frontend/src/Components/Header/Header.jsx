import React from "react";
import "./Header.css";

import logoPNG from "../Assets/logo.png";

export default function Header() {
  return (
    <div className="header-container">
      {" "}
      <header className="header">
        {" "}
        <div className="logo-section item">
          {" "}
          <a
            href="/"
            className=""
          >
            {" "}
            <img src={logoPNG} alt="Logo" className="logo-png" />{" "}
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
            <a href="#" className="lst-item">
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
        <div className="btn-section item">
          {" "}
          <div className="btn-item">
          <button type="button" className="btn btn-Login">
            Log In
          </button>
          </div>{" "}
          <div className="btn-item">
          <button type="button" className="btn btn-Signup">
            Sign Up
          </button>
          </div>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
}
