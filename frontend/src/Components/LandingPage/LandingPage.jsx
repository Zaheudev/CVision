import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import landingImage from "../../Components/Assets/landingpage.png";
import cv1image from "../../Components/Assets/cv1lp.png";
import cv2image from "../../Components/Assets/cv2lp.png";
import cvuriImage from "../../Components/Assets/cvuri-lp.png";
import PeopleImage from "../../Components/Assets/people-lp.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="lp-section">
        <img className="landingImage" src={landingImage} alt="Landing" />
        <div className="lp-h1-section">
          <h1>Te-ai săturat să îți faci singur CV-ul?</h1>
          <h1>Lasă AI-ul să facă treaba în locul tău!</h1>
        </div>
        <div className="lp-cv-section">
          <img className="cv1" src={cv1image} alt="cv" />
          <img className="cv2" src={cv2image} alt="cv" />
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
      </div>
      <div className="lp-creeazacv">
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
    </div>
  );
}
