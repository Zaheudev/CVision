import React from 'react';
import './Template1.css';

const Template1 = ({ data, profilePic }) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    phoneNumber = '',
    location = '',
    cvContent = {}
  } = data || {};

  const {
    professionalSummary = '',
    experience = [],
    skills = { hard: [], soft: [] },
    education = [],
    languages = []
  } = cvContent || {};

  const fullName = `${firstName} ${lastName}`.trim() || 'Nume și Prenume';
  const allSkills = [...(skills.hard || []), ...(skills.soft || [])];

  return (
    <div className="cv-page template1">
      <aside className="sidebar">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Foto profil" />
          ) : (
            <div className="placeholder-photo"></div>
          )}
        </div>

        <section>
          <h3>Contact</h3>
          <div className="contact-info">
            {phoneNumber && <p className="contact-item">📞 {phoneNumber}</p>}
            {email && <p className="contact-item">✉️ {email}</p>}
            {location && <p className="contact-item">📍 {location}</p>}
            {!phoneNumber && !email && !location && (
              <>
                <div className="placeholder-line"></div>
                <div className="placeholder-line short"></div>
              </>
            )}
          </div>
        </section>

        <section>
          <h3>Skill-uri</h3>
          <div className="skills-list">
            {allSkills.length > 0 ? (
              allSkills.map((skill, index) => (
                <span key={index} className="skill-item">{skill}</span>
              ))
            ) : (
              <>
                <div className="placeholder-line"></div>
                <div className="placeholder-line"></div>
              </>
            )}
          </div>
        </section>

        <section>
          <h3>Limbi vorbite</h3>
          <div className="languages-list">
            {languages && languages.length > 0 ? (
              languages.map((lang, index) => (
                <p key={index} className="language-item">{lang}</p>
              ))
            ) : (
              <>
                <div className="placeholder-line"></div>
                <div className="placeholder-line short"></div>
              </>
            )}
          </div>
        </section>
      </aside>

      <main className="main-content">
        <header>
          <h1>{fullName}</h1>
        </header>

        <section>
          <h3>Profilul</h3>
          {professionalSummary ? (
            <p className="summary-text">{professionalSummary}</p>
          ) : (
            <>
              <div className="placeholder-line"></div>
              <div className="placeholder-line short"></div>
            </>
          )}
        </section>

        <section>
          <h3>Experiență</h3>
          {experience && experience.length > 0 ? (
            experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <p className="exp-role"><strong>{exp.role}</strong> - {exp.company}</p>
                {exp.period && <p className="exp-period">{exp.period}</p>}
                {exp.enhancedDescription && exp.enhancedDescription.length > 0 && (
                  <ul className="exp-description">
                    {exp.enhancedDescription.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
            </>
          )}
        </section>

        <section>
          <h3>Educație</h3>
          {education && education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="edu-header">
                  <p className="edu-degree"><strong>{edu.degree}</strong></p>
                  {edu.period && edu.period !== 'N/A' && <p className="edu-period">{edu.period}</p>}
                </div>
                <p className="edu-institution">{edu.institution}</p>
              </div>
            ))
          ) : (
            <>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Template1;
