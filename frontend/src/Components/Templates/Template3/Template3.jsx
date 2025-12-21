import React from 'react';
import './Template3.css';

const Template3 = ({ data, profilePic }) => {
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
    education = []
  } = cvContent || {};

  const allSkills = [...(skills.hard || []), ...(skills.soft || [])];

  return (
    <div className="cv-page template3">
      {/* Sidebar stânga */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="photo">
            {profilePic ? (
              <img src={profilePic} alt="Foto profil" />
            ) : null}
          </div>

          <div className="block">
            <h4>Nr. telefon</h4>
            <p className="info-text">{phoneNumber || ''}</p>
            <h4>E-mail</h4>
            <p className="info-text">{email || ''}</p>
          </div>

          <div className="block">
            <h4>Despre mine</h4>
            <p className="about-text">{professionalSummary || ''}</p>
          </div>

          <div className="block">
            <h4>Abilități</h4>
            <ul className="skills">
              {allSkills.length > 0 ? (
                allSkills.slice(0, 4).map((skill, index) => (
                  <li key={index} className="skill">{skill}</li>
                ))
              ) : (
                <>
                  <li className="skill">#1</li>
                  <li className="skill">#2</li>
                  <li className="skill">#3</li>
                  <li className="skill">#4</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* Conținut principal dreapta */}
      <main className="main">
        <header className="main-header">
          <div className="name-block">
            <div className="name-line">{firstName || 'Nume'}</div>
            <div className="name-line">{lastName || 'Prenume'}</div>
          </div>
        </header>

        <section className="section">
          <h3>Experiență profesională</h3>
          {experience.length > 0 ? (
            experience.map((exp, index) => (
              <div key={index} className="entry">
                <div className="entry-title">{exp.role} - {exp.company}</div>
                <div className="entry-period">{exp.period}</div>
                {exp.enhancedDescription && (
                  <ul className="entry-desc">
                    {exp.enhancedDescription.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <>
              <div className="entry">
                <div className="entry-title placeholder medium"></div>
                <div className="entry-desc placeholder"></div>
              </div>
              <div className="entry">
                <div className="entry-title placeholder medium"></div>
                <div className="entry-desc placeholder"></div>
              </div>
            </>
          )}
        </section>

        <section className="section">
          <h3>Educație</h3>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="entry">
                <div className="entry-title">{edu.institution}</div>
                <div className="entry-period">{edu.period}</div>
                <div className="entry-degree">{edu.degree}</div>
              </div>
            ))
          ) : (
            <>
              <div className="entry">
                <div className="entry-title placeholder medium"></div>
                <div className="entry-desc placeholder"></div>
              </div>
              <div className="entry">
                <div className="entry-title placeholder medium"></div>
                <div className="entry-desc placeholder"></div>
              </div>
            </>
          )}
        </section>

        <section className="section">
          <h3>Hobby-uri</h3>
          <div className="pill-row">
            <div className="pill"></div>
            <div className="pill"></div>
            <div className="pill"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Template3;
