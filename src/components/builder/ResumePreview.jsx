"use client";
import React from 'react';
import styles from './ResumePreview.module.css';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const ResumePreview = ({ data }) => {
  const { personalInfo, summary, experience, skills } = data;

  return (
    <div className={styles.paper}>
      <div className={styles.header}>
        <h1 className={styles.name}>{personalInfo.fullName || "Your Name"}</h1>
        <h2 className={styles.jobTitle}>{personalInfo.jobTitle || "Your Title"}</h2>
        
        <div className={styles.contactInfo}>
          {personalInfo.email && <span className={styles.contactItem}><Mail size={12}/> {personalInfo.email}</span>}
          {personalInfo.phone && <span className={styles.contactItem}><Phone size={12}/> {personalInfo.phone}</span>}
          {personalInfo.location && <span className={styles.contactItem}><MapPin size={12}/> {personalInfo.location}</span>}
          {personalInfo.website && <span className={styles.contactItem}><Globe size={12}/> {personalInfo.website}</span>}
        </div>
      </div>

      <div className={styles.divider} />

      {summary && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Summary</h3>
          <p className={styles.summaryText}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Experience</h3>
          <div className={styles.experienceList}>
            {experience.map(exp => (
              <div key={exp.id} className={styles.experienceItem}>
                <div className={styles.expHeader}>
                  <div className={styles.expTitleRole}>
                    <span className={styles.expCompany}>{exp.company || "Company"}</span>
                    <span className={styles.expRole}>{exp.role ? `— ${exp.role}` : ""}</span>
                  </div>
                  <span className={styles.expDates}>
                    {exp.startDate || "Date"} - {exp.endDate || "Present"}
                  </span>
                </div>
                {exp.description && (
                  <ul className={styles.bulletList}>
                    {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Skills</h3>
          <p className={styles.skillsList}>{skills}</p>
        </div>
      )}
    </div>
  );
};
