import React from 'react';
import './Echipa.css';

import img1 from '../Assets/Echipa/1.png';
import img2 from '../Assets/Echipa/2.png';
import img3 from '../Assets/Echipa/3.png';
import img4 from '../Assets/Echipa/4.png';
import img5 from '../Assets/Echipa/5.png';
import img6 from '../Assets/Echipa/6.png';
import img7 from '../Assets/Echipa/7.png';
import img8 from '../Assets/Echipa/8.png';
import img9 from '../Assets/Echipa/9.png';
import img10 from '../Assets/Echipa/10.png';
import img11 from '../Assets/Echipa/11.png';
import img12 from '../Assets/Echipa/12.png';
import img13 from '../Assets/Echipa/13.png';
import img14 from '../Assets/Echipa/14.png';

const Echipa = () => {
  const teamMembers = [
    { id: 1, name: 'Zaharia Iulian', role: '-developer-', image: img1 },
    { id: 2, name: 'Strungan Victor', role: '-developer-', image: img2 },
    { id: 3, name: 'Tudose Sebastian', role: '-developer-', image: img3 },
    { id: 4, name: 'Jugănaru Eliza', role: '-designer-', image: img4 },
    { id: 5, name: 'Mareș Cristiana', role: '-designer-', image: img5 },
    { id: 6, name: 'Ursu Raluca', role: '-designer-', image: img6 },
    { id: 7, name: 'Condurache Robert', role: '-designer-', image: img7 },
    { id: 8, name: 'Sârbu Bianca', role: '-content creator-', image: img8 },
    { id: 9, name: 'Irimia Alexandra', role: '-content creator-', image: img9 },
    { id: 10, name: 'Sapoințic Sorin', role: '-tester-', image: img10 },
    { id: 11, name: 'Manea Bogdan', role: '-analist-', image: img11 },
    { id: 12, name: 'Marin Luca', role: '-analist-', image: img12 },
    { id: 13, name: 'Stan Teodor', role: '-analist/asistent scrum-', image: img13 },
    { id: 14, name: 'Vornicu Denisa', role: '-scrum master-', image: img14 },
  ];

  return (
    <div className="echipa-container">
      <h1 className="echipa-title">Echipa</h1>
      <div className="echipa-grid">
        {teamMembers.map((member, index) => (
          <div 
            key={member.id} 
            className="echipa-member"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="echipa-image-wrapper">
              <img src={member.image} alt={member.name} className="echipa-image" />
              {member.id === 7 && <div className="echipa-tooltip">Hiena</div>}
            </div>
            <h3 className="echipa-name">{member.name}</h3>
            <p className="echipa-role">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Echipa;
