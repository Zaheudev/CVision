import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import slide1Image from "../../Components/Assets/LandingPage/generare+cv.png";
import slide2Image from "../../Components/Assets/LandingPage/angajare.png";
import slide3Image from "../../Components/Assets/LandingPage/anagajator.png";
import cvuriImage from "../../Components/Assets/cvuri-lp.png";
import PeopleImage from "../../Components/Assets/people-lp.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: slide1Image,
      text: "Te-ai săturat să îți faci singur CV-ul?\nLasă AI-ul să facă treaba în locul tău!",
      imagePosition: "left"
    },
    {
      image: slide2Image,
      text: "Obține job-ul visat rapid!\nCreează CV-ul perfect în câteva minute cu AI-ul nostru.",
      imagePosition: "right"
    },
    {
      image: slide3Image,
      text: "Recrutare inteligentă și eficientă,\ndecizii rapide bazate pe date și AI!",
      imagePosition: "left"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    if (isTransitioning) return;
    const next = (currentSlide + 1) % slides.length;
    setNextSlide(next);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(next);
      setNextSlide(null);
      setIsTransitioning(false);
    }, 1000);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setNextSlide(prev);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev);
      setNextSlide(null);
      setIsTransitioning(false);
    }, 1000);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setNextSlide(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setNextSlide(null);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="landing-page">
      <section className="lp-carousel">
        <div className="carousel-container">
          {/* Slide curent - exit animation */}
          <div className={`carousel-slide ${slides[currentSlide].imagePosition === 'left' ? 'image-left' : 'image-right'} ${isTransitioning ? 'exiting' : 'active'}`}>
            <div className="carousel-image-wrapper">
              <img src={slides[currentSlide].image} alt="Slide" className="carousel-image" />
            </div>
            <div className="carousel-text-wrapper">
              <h1 className="carousel-text">
                {slides[currentSlide].text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < slides[currentSlide].text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
            </div>
          </div>

          {/* Slide următor - enter animation */}
          {nextSlide !== null && (
            <div className={`carousel-slide ${slides[nextSlide].imagePosition === 'left' ? 'image-left' : 'image-right'} entering`}>
              <div className="carousel-image-wrapper">
                <img src={slides[nextSlide].image} alt="Slide" className="carousel-image" />
              </div>
              <div className="carousel-text-wrapper">
                <h1 className="carousel-text">
                  {slides[nextSlide].text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < slides[nextSlide].text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
              </div>
            </div>
          )}
        </div>

        <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>
          <span>‹</span>
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={handleNext}>
          <span>›</span>
        </button>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>
      <div className="lp-descriere">
        <h3>
          CVision – Soluția completă pentru crearea automată de CV-uri și
          conectarea candidaților cu angajatorii
        </h3>
        <p className="lp-paragraph">
          CVision este o aplicație web dedicată optimizării recrutării.
          Platforma generează automat CV-uri profesionale pornind de la
          informațiile introduse de candidat și identifică imediat
          oportunitățile de angajare compatibile cu abilitățile sale. <br />
          <br /> Prin algoritmi inteligenți și structurare automată a datelor,
          cVision facilitează ambele procese:
          <br /> - pentru candidați, elimină stresul redactării unui CV și
          crește vizibilitatea în fața angajatorilor;
          <br /> - pentru companii, oferă acces rapid la talente potrivite,
          filtrate în funcție de competențe reale. <br />
          <br />
          Indiferent dacă ești la început de drum sau vrei să faci un pas
          înainte în carieră, CVision îți simplifică procesul: tu completezi
          câteva detalii, iar noi te ducem direct în fața angajatorilor
          potriviți.
          <br />
          <span>Rapid. Eficient. Personalizat.</span> <br />
          <br /> CVision înseamnă mai puțin timp pierdut și o potrivire corectă
          între oameni și joburi.
        </p>
      </div>      <div className="lp-descriere">
        <h3>MISIUNE</h3>
        <p>Simplificăm recrutarea prin tehnologie inteligentă.</p>
        <p>
          Misiunea noastră este să conectăm oamenii potriviți cu oportunitățile potrivite, eliminând barierele inutile din procesul tradițional de angajare.
          Prin generarea automată de CV-uri și potrivirea instantă între abilități și cerințe, cVision transformă un proces greoi într-o experiență rapidă, intuitivă și transparentă.
        </p>
        <p><strong>Ne propunem să:</strong></p>
        <ul>
          <li>oferim fiecărui candidat un CV profesionist, creat ușor și fără stres;</li>
          <li>creștem vizibilitatea competențelor reale ale utilizatorilor;</li>
          <li>ajutăm angajatorii să găsească rapid talente potrivite;</li>
          <li>creăm o platformă accesibilă, eficientă și orientată spre rezultate.</li>
        </ul>
        <p>
          La cVision, credem că fiecare abilitate merită să fie descoperită, iar tehnologia ne ajută să facem asta la scară mare.
        </p>
      </div>
      <div className="lp-descriere">
        <h3>VIZIUNE</h3>
        <p>Reinventăm modul în care oamenii și companiile se întâlnesc profesional.</p>
        <p>
          Viziunea cVision este să devină platforma preferată pentru crearea de CV-uri automatizate și matching inteligent între candidați și angajatori, la nivel național și internațional.
        </p>
        <p><strong>Ne dorim o piață a muncii în care:</strong></p>
        <ul>
          <li>timpul nu mai reprezintă un obstacol în găsirea jobului potrivit;</li>
          <li>abilitățile fiecărui candidat sunt valorificate corect;</li>
          <li>companiile își pot construi echipe eficient, bazate pe date reale;</li>
          <li>tehnologia facilitează decizii mai bune și mai rapide.</li>
        </ul>
        <p>
          Construim un ecosistem digital în care talentul întâlnește oportunitatea într-un mod modern, automatizat și echitabil.
          În viitor, cVision va deveni un standard al recrutării inteligente — o punte între oameni, profesii și viitorul muncii.
        </p>
      </div>      <div className="lp-creeazacv">
        <img src={cvuriImage} alt="" />
        <div className="lp-creeazacv-text">
          <h3>Creează un CV</h3>
          <p>
            Începe-ți călătoria profesională alegând unul dintre modelele
            noastre de CV create special pentru a evidenția punctele tale forte.
            Fiecare template este realizat cu grijă, folosind principii de
            design modern și structură clară, astfel încât experiența, educația
            și abilitățile tale să fie prezentate în cel mai eficient mod.
            Template-urile de CV disponibile în aplicație sunt concepute pentru
            a oferi un echilibru ideal între design atractiv și claritate,
            incluzând secțiunile esențiale — experiență profesională, educație,
            competențe, limbi străine, profil personal și informații de contact
            — toate organizate într-un mod ușor de parcurs pentru recrutori.
          </p>
        </div>
      </div>
      <div className="lp-cautajob">
        <div className="lp-cautajob-text">
          <h3>Caută jobul potrivit pentru tine</h3>
          <p>
            Căutarea unui job devine mult mai simplă cu ajutorul aplicației
            noastre. Platforma îți permite să descoperi rapid oportunități
            profesionale potrivite profilului tău, fără să pierzi timp navigând
            pe zeci de site-uri. Poți explora anunțuri din diverse domenii,
            industria preferată sau poziții adaptate nivelului tău de
            experiență, folosind filtre avansate precum locație, tipul jobului,
            nivelul salarial sau modalitatea de lucru. <br /><br /> Cu un sistem inteligent
            de recomandări, aplicația îți sugerează joburi relevante în funcție
            de domeniul ales și experiența ta, ajutându-te să descoperi
            oportunități pe care nu le-ai fi găsit altfel. Tot procesul este
            conceput pentru a fi rapid, intuitiv și accesibil, astfel încât să
            poți ajunge cât mai ușor la jobul potrivit pentru tine.
          </p>
        </div>
        <img src={PeopleImage} alt="" />
      </div>

      <div className="lp-descriere lp-tehnologii">
        <h3>TEHNOLOGII UTILIZATE</h3>
        <p className="lp-paragraph">
          CVision este construită folosind tehnologii moderne pentru a oferi o experiență rapidă, intuitivă și performantă. 
          Interfața aplicației este realizată cu React, HTML, CSS și JavaScript, oferind un design dinamic și responsiv. 
          Partea de backend este dezvoltată cu Node.js și Express, iar datele sunt stocate în siguranță folosind 
          MongoDB (MongoDB Atlas). Echipa utilizează Git & GitHub pentru versionarea codului și respectă metodologia 
          SCRUM pentru o dezvoltare agilă și organizată, asigurând astfel o platformă stabilă și ușor de întreținut.
        </p>
      </div>
    </div>
  );
}
