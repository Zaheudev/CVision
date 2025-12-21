import React from 'react';
import './Template2.css';

const Template2 = ({ data, profilePic }) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    phoneNumber = '',
    cvContent = {}
  } = data || {};

  const {
    professionalSummary = '',
    experience = [],
    skills = { hard: [], soft: [] },
    education = [],
    languages = []
  } = cvContent || {};

  return (
    <div className="cv template2">
      {/* COLOANA STÂNGĂ */}
      <div className="left">
        <h1 className="name">
          {firstName || 'Nume'}<br />
          <span>{lastName || 'Prenume'}</span>
        </h1>

        <div className="field">
          <p>{phoneNumber || 'Nr. telefon'}</p>
          <div className="line"></div>
        </div>

        <div className="field">
          <p>{email || 'e-mail'}</p>
          <div className="line"></div>
        </div>

        <h2>Experiență profesională</h2>
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div key={index} className="field">
              <p>{exp.role} – {exp.period}</p>
              <p className="company">{exp.company}</p>
              {exp.enhancedDescription && (
                <ul className="exp-desc">
                  {exp.enhancedDescription.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
              <div className="line"></div>
            </div>
          ))
        ) : (
          <>
            <div className="field">
              <p>Post ocupat – perioadă</p>
              <div className="line"></div>
            </div>
            <div className="field">
              <p>Post ocupat – perioadă</p>
              <div className="line"></div>
            </div>
          </>
        )}

        <h2>Educație și formare</h2>
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className="field">
              <p>{edu.institution} – {edu.period}</p>
              <p className="degree">{edu.degree}</p>
              <div className="line"></div>
            </div>
          ))
        ) : (
          <>
            <div className="field">
              <p>Instituție – perioadă</p>
              <div className="line"></div>
            </div>
            <div className="field">
              <p>Instituție – perioadă</p>
              <div className="line"></div>
            </div>
          </>
        )}

        <h2>Limbi străine</h2>
        {languages.length > 0 ? (
          <div className="languages-text">
            {languages.map((lang, index) => (
              <p key={index}>{lang}</p>
            ))}
          </div>
        ) : (
          <div className="line full"></div>
        )}
      </div>

      {/* COLOANA DREAPTĂ */}
      <div className="right">
        <div className="photo-container">
          {profilePic ? (
            <img src={profilePic} alt="Poză CV" />
          ) : (
            <div className="photo-placeholder"></div>
          )}
        </div>

        <h2>Despre mine</h2>
        <p className="text">{professionalSummary || ''}</p>

        <h2>Hobby-uri</h2>
        <p className="text">{/* Lăsat gol */}</p>

        <h2>Abilități</h2>
        <div className="skills-grid">
          {skills.hard?.length > 0 || skills.soft?.length > 0 ? (
            <>
              {skills.hard?.slice(0, 2).map((skill, index) => (
                <span key={`hard-${index}`} className="skill-item">{skill}</span>
              ))}
              {skills.soft?.slice(0, 2).map((skill, index) => (
                <span key={`soft-${index}`} className="skill-item">{skill}</span>
              ))}
            </>
          ) : (
            <>
              <span className="skill-item">#1</span>
              <span className="skill-item">#2</span>
              <span className="skill-item">#3</span>
              <span className="skill-item">#4</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;
