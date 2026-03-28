"use client";
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import styles from './ResumeForm.module.css';

export const ResumeForm = ({ data, onChange }) => {
  const { deductCredit, credits } = useCredits();
  const [activeSection, setActiveSection] = useState('personal');
  const [isEnhancing, setIsEnhancing] = useState(null);

  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateSummary = (value) => {
    onChange({ ...data, summary: value });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '', role: '', startDate: '', endDate: '', description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id, field, value) => {
    const newExp = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: newExp });
  };

  const deleteExperience = (id) => {
    const newExp = data.experience.filter(exp => exp.id !== id);
    onChange({ ...data, experience: newExp });
  };

  const enhanceWithAI = async (id, currentText) => {
    if(!currentText || currentText.length < 5) return;
    
    // Check SaaS Credit Limit
    if (!deductCredit(1)) {
      alert("You are out of AI Tokens! Please upgrade to Pro.");
      return;
    }

    setIsEnhancing(id);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentText })
      });
      if(response.ok) {
        const { enhanced } = await response.json();
        updateExperience(id, 'description', enhanced);
      } else {
        throw new Error("API Failed");
      }
    } catch(err) {
      console.error(err);
      alert("AI Enhancement failed. Please check your API key in .env.local");
    }
    setIsEnhancing(null);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.mainTitle}>Build Your Resume</h2>
      
      {/* Personal Info */}
      <Card className={styles.sectionCard} hoverable={false}>
        <div className={styles.sectionHeader} onClick={() => setActiveSection(activeSection === 'personal' ? '' : 'personal')}>
          <h3>Personal Details</h3>
          {activeSection === 'personal' ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
        
        {activeSection === 'personal' && (
          <div className={styles.sectionBody}>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input className={styles.inputField} value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Job Title</label>
                <input className={styles.inputField} value={data.personalInfo.jobTitle} onChange={e => updatePersonalInfo('jobTitle', e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input className={styles.inputField} value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input className={styles.inputField} value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Location</label>
                <input className={styles.inputField} value={data.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Website / Link</label>
                <input className={styles.inputField} value={data.personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Summary */}
      <Card className={styles.sectionCard} hoverable={false}>
        <div className={styles.sectionHeader} onClick={() => setActiveSection(activeSection === 'summary' ? '' : 'summary')}>
          <h3>Professional Summary</h3>
          {activeSection === 'summary' ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
        {activeSection === 'summary' && (
          <div className={styles.sectionBody}>
            <div className={styles.inputGroup}>
              <textarea 
                className={styles.textareaField}
                rows={4} 
                value={data.summary} 
                onChange={e => updateSummary(e.target.value)}
                placeholder="Briefly describe your professional background..."
              />
            </div>
          </div>
        )}
      </Card>

      {/* Experience */}
      <Card className={styles.sectionCard} hoverable={false}>
        <div className={styles.sectionHeader} onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}>
          <h3>Work Experience</h3>
          {activeSection === 'experience' ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
        {activeSection === 'experience' && (
          <div className={styles.sectionBody}>
            {data.experience.map((exp, index) => (
              <div key={exp.id} className={styles.itemBox}>
                <div className={styles.itemHeader}>
                  <h4>Experience {index + 1}</h4>
                  <button className={styles.deleteBtn} onClick={() => deleteExperience(exp.id)}><Trash2 size={16}/></button>
                </div>
                <div className={styles.grid}>
                   <div className={styles.inputGroup}>
                    <label>Company</label>
                    <input className={styles.inputField} value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Role</label>
                    <input className={styles.inputField} value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Start Date</label>
                    <input className={styles.inputField} value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>End Date</label>
                    <input className={styles.inputField} value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" />
                  </div>
                </div>
                <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
                  <div className={styles.aiLabelRow}>
                    <label>Description (Bullets)</label>
                    <Button variant="ghost" size="sm" onClick={() => enhanceWithAI(exp.id, exp.description)} disabled={isEnhancing === exp.id}>
                      {isEnhancing === exp.id ? "Enhancing..." : <><Sparkles size={14} color="var(--accent-primary)"/> Enhance with AI</>}
                    </Button>
                  </div>
                  <textarea 
                    className={styles.textareaField}
                    rows={5} 
                    value={exp.description} 
                    onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button variant="secondary" onClick={addExperience} className={styles.addBtn}>
              <Plus size={16} /> Add Experience
            </Button>
          </div>
        )}
      </Card>
      
      {/* Skills */}
      <Card className={styles.sectionCard} hoverable={false}>
        <div className={styles.sectionHeader} onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}>
          <h3>Skills</h3>
          {activeSection === 'skills' ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
        {activeSection === 'skills' && (
          <div className={styles.sectionBody}>
             <div className={styles.inputGroup}>
                <label>Comma separated skills</label>
                <input className={styles.inputField} value={data.skills} onChange={e => onChange({...data, skills: e.target.value})} placeholder="e.g. React, Python, Leadership"/>
             </div>
          </div>
        )}
      </Card>
    </div>
  );
};
