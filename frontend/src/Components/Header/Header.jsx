import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import logoPNG from "../Assets/logo.png";
import logosmallPNG from "../Assets/logosmall.png";
import personPNG from "../Assets/profile.png";
import useAuth from "../../hooks/useAuth";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { type } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(personPNG);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadProfileImage = () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setProfileImage(personPNG);
        return;
      }
      const storedPic =
        localStorage.getItem(`settingsProfilePic_${userId}`) ||
        localStorage.getItem(`profilePic_${userId}`);
      setProfileImage(storedPic || personPNG);
    };

    loadProfileImage();

    const handleStorage = (event) => {
      if (!event.key) {
        loadProfileImage();
        return;
      }
      if (event.key.includes("profilePic")) {
        loadProfileImage();
      }
    };

    const handleCustomUpdate = () => loadProfileImage();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("profilePicUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profilePicUpdated", handleCustomUpdate);
    };
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollToFooter = () => {
    const element = document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          {type !== "candidate" && (
            <li>
              <a href="#" className="lst-item">
                Candidați
              </a>
            </li>
          )}{" "}
          {type !== "employer" && (
            <li>
              <a href="#" className="lst-item">
                Angajatori
              </a>
            </li>
          )}{" "}
          <li>
            <a href="#" className="lst-item">
              Aplică acum
            </a>
          </li>{" "}
          <li>
            <a
              href="#"
              className="lst-item"
              onClick={() => navigate("/profil")}
            >
              Profilul meu
            </a>
          </li>{" "}
          <li>
            <a className="lst-item" onClick={scrollToFooter}>
              Mai multe
            </a>
          </li>{" "}
        </ul>{" "}
        {!user ? (
          <div className="btn-section item">
            {" "}
            <div className="btn-item">
              <button
                type="button"
                className="btn btn-Login"
                onClick={() => navigate("/login")}
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
        ) : (
          <div className="profile-section item" ref={dropdownRef}>
            <div className="profile-avatar" onClick={toggleProfileMenu}>
              <img src={profileImage} alt="Profile" className="avatar-img" />
            </div>
            {isProfileMenuOpen && (
              <div className="profile-dropdown">
                <button className="dropdown-item" onClick={() => { navigate("/settings"); setIsProfileMenuOpen(false); }}>
                  Setări cont
                </button>
                <button className="dropdown-item" onClick={() => { handleLogout(); setIsProfileMenuOpen(false); }}>
                  Ieșire din cont
                </button>
              </div>
            )}
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
          {type !== "candidate" && (
            <a href="#" className="mobile-item" onClick={toggleMenu}>
              Candidați
            </a>
          )}
          {type !== "employer" && (
            <a href="#" className="mobile-item" onClick={toggleMenu}>
              Angajatori
            </a>
          )}
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
          <a href="#" className="mobile-item" onClick={() => { scrollToFooter(); toggleMenu(); }}>
            Mai multe
          </a>
          {!user ? (
            <>
              <button
                className="mobile-btn"
                onClick={() => {
                  navigate("/login");
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
          ) : (
            <>
              <button
                className="mobile-btn"
                onClick={() => {
                  navigate("/settings");
                  toggleMenu();
                }}
              >
                Setări cont
              </button>
              <button
                className="mobile-btn"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Ieșire din cont
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
