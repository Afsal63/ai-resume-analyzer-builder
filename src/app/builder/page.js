"use client";
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ResumeForm } from '@/components/builder/ResumeForm';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import styles from './page.module.css';

export default function BuilderPage() {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@example.com',
      phone: '(123) 456-7890',
      location: 'San Francisco, CA',
      website: 'github.com/johndoe',
    },
    summary: 'Passionate software engineer with 5+ years of experience building scalable web applications.',
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        role: 'Senior Developer',
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: 'Led the frontend team to rebuild the core platform in React.\nImproved load times by 40%.\nMentored 3 junior developers.',
      }
    ],
    education: [
      {
        id: 1,
        school: 'University of Engineering',
        degree: 'BS in Computer Science',
        graduationDate: 'May 2018',
      }
    ],
    skills: 'JavaScript, React, Node.js, Next.js, CSS, Python' 
  });

  return (
    <div className={styles.builderContainer}>
      <div className={styles.formSection}>
        <ResumeForm data={resumeData} onChange={setResumeData} />
      </div>
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <Button variant="primary" onClick={() => reactToPrintFn()}>
            <Download size={16} /> Download PDF
          </Button>
        </div>
        <div className={styles.canvasContainer} ref={contentRef}>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
}
