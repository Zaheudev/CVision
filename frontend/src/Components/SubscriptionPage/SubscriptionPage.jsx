import "./SubscriptionPage.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import abonamentBasic from "../../Components/Assets/abonamentBasic.svg"
import abonamentPremium from "../../Components/Assets/abonamentPremium.svg"
import planAngajator from "../../Components/Assets/plan-abonamente-angajator.png"

export default function SubscriptionPage() {
  const { type } = useContext(UserContext);

  // Planuri pentru angajatori
  if (type === "employer") {
    return (
      <div className="subscription-page">
        <h1>Planuri de abonament</h1>
        
        {/* Imaginea centrală cu CV-uri */}
        <div className="employer-hero-section">
          <img 
            src={planAngajator} 
            alt="Găsește candidatul perfect" 
            className="employer-hero-image"
          />
        </div>

        <div className="plans employer-plans">
          <div className="plan-container">
            <div className="plan employer-plan">
              <h2>Business Essential</h2>
              <p className="plan-price">89 lei / lună</p>
              <p className="plan-price-year">890 lei / an (2 luni gratuite)</p>
              <ul className="plan-ul employer-ul">
                <li>5 joburi active/lună</li>
                <li>20 căutări candidați/lună</li>
                <li>Filtre de bază (experiență, oraș, studii)</li>
                <li>Vizualizare profil complet candidat</li>
                <li>Export CV în PDF</li>
              </ul>
            </div>
          </div>
          <div className="plan-container">
            <div className="plan employer-plan employer-plan-pro">
              <h2>Business Pro</h2>
              <p className="plan-price">249 lei / lună</p>
              <p className="plan-price-year">2.490 lei / an (2 luni gratuite)</p>
              <ul className="plan-ul employer-ul">
                <li>Joburi nelimitate</li>
                <li>Căutări candidați nelimitate</li>
                <li>Filtre avansate (soft skills, certificări, limbi)</li>
                <li>Contactare candidați nelimitată</li>
                <li>Top 10 candidați pentru angajatori</li>
                <li>Export candidați în Excel</li>
                <li>Notificări automate candidați noi potriviți</li>
                <li>Promovare joburi în secțiunea „Recomandate"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Planuri pentru candidați (default)
  return (
    <div className="subscription-page">
      <h1>Planuri de abonament</h1>
      <div className="plans">
        <div className="plan-container">
          <img className="plans_photos" src={abonamentBasic} alt="photo_abonamentBasic"/>
          <div className="plan">
            <h2>CVision Basic - 0 lei/lună</h2>
            <ul className="plan-ul">
              <li>Profil profesional complet</li>
              <li>Analiză competențe (simplificată)</li>
              <li>Sugestii joburi (limitate: 10/zi)</li>
              <li>Generare CV inteligent (2/8 șabloane disponibile)</li>
              <li>1 descărcare PDF/lună</li>
              <li>1 CV salvat</li>
            </ul>
          </div>
        </div>
        <div className="plan-container">
          <img className="plans_photos" src={abonamentPremium} alt="photo_abonamentPremium"/>
          <div className="plan">
            <h2>CVision Premium - 24 lei/lună 
              <span className="price-year">- 199 lei/an</span>
            </h2>
            <ul className="plan-ul">
              <li>Acces la toate cele 8 șabloane de CV</li>
              <li>Descărcări CV nelimitate</li>
              <li>Sugestii joburi nelimitate</li>
              <li>Top 10 joburi pentru candidați</li>
              <li>Redesign automat CV</li>
              <li>Vizibilitate mai mare în topul candidaților</li>
              <li>CV-uri salvate nelimitat</li>
              <li>Notificări pentru joburi potrivite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}