import React from 'react';
import './Template4.css';

const Template4 = ({ data, profilePic }) => {
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

  const fullName = `${firstName} ${lastName}`.trim() || 'Noel Taylor';
  const allSkills = [...(skills.hard || []), ...(skills.soft || [])];

  return (
    <div className="a4 template4">
      {/* LEFT COLUMN */}
      <div className="left-bg"></div>
      <div className="left-top"></div>
      <div className="left-bottom"></div>

      {/* PROFILE */}
      <div className="avatar-border"></div>
      {profilePic ? (
        <img src={profilePic} className="avatar" alt="Foto profil" />
      ) : (
        <div className="avatar avatar-placeholder"></div>
      )}

      <div className="name">{fullName}</div>
      <div className="role">{cvContent.role || 'Web designer'}</div>

      {/* CONTACT */}
      <div className="contact-title">CONTACT ME</div>
      <div className="contact-content">
        {phoneNumber && <p>{phoneNumber}</p>}
        {email && <p>{email}</p>}
      </div>

      {/* EDUCATION */}
      <div className="education-title">EDUCATION</div>
      <div className="education-content">
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className="edu-item">
              <p className="edu-institution">{edu.institution}</p>
              <p className="edu-degree">{edu.degree}</p>
              <p className="edu-period">{edu.period}</p>
            </div>
          ))
        ) : null}
      </div>

      {/* REFERENCES */}
      <div className="references-title">REFERENCES</div>
      <div className="references-content">
        {/* Lăsat gol */}
      </div>

      {/* RIGHT SECTIONS */}
      <div className="section about">
        <h3>ABOUT ME</h3>
        <p>{professionalSummary || ''}</p>
      </div>

      <div className="section job">
        <h3>JOB EXPERIENCE</h3>
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div key={index} className="exp-item">
              <p className="exp-role">{exp.role}</p>
              <p className="exp-company">{exp.company} - {exp.period}</p>
              {exp.enhancedDescription && (
                <ul className="exp-desc">
                  {exp.enhancedDescription.slice(0, 2).map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : null}
      </div>

      <div className="section skills">
        <h3>SKILLS</h3>
        <div className="skills-list">
          {allSkills.length > 0 ? (
            allSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))
          ) : null}
        </div>
      </div>

      <div className="section languages">
        <h3>LANGUAGES</h3>
        <div className="languages-list">
          {languages.length > 0 ? (
            languages.map((lang, index) => (
              <p key={index}>{lang}</p>
            ))
          ) : null}
        </div>
      </div>

      <div className="section hobbies">
        <h3>HOBBIES</h3>
        {/* Lăsat gol */}
      </div>
    </div>
  );
};

export default Template4;
