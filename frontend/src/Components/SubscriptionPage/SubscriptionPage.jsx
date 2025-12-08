import "./SubscriptionPage.css";
import abonamentBasic from "../../Components/Assets/abonamentBasic.svg"
import abonamentPremium from "../../Components/Assets/abonamentPremium.svg"

export default function SubscriptionPage() {
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