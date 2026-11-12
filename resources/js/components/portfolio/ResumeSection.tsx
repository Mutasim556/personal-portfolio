import React from 'react';
import type { EducationItem, Experience } from '@/types/portfolio';

interface ResumeSectionProps {
    experiences: Experience[];
    education?: EducationItem[];
    resumeUrl?: string;
}

export default function ResumeSection({
    experiences,
    education = [],
    resumeUrl,
}: ResumeSectionProps) {
    const isDirectDownload = Boolean(
        resumeUrl &&
            !resumeUrl.startsWith('#') &&
            !resumeUrl.includes('#')
    );

    const handleCvClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isDirectDownload) {
            e.preventDefault();
            const contactEl = document.getElementById('contact');
            if (contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="resume-section" id="resume">
            {/* Resume Badge */}
            <div className="eyebrow-badge fade-up-anime">
                <span>RESUME</span>
            </div>

            {/* Main Title */}
            <div className="main-title">
                <h2 className="title-primary text-anime">
                    <span>Professional Experience & </span>
                    <span className="color">Academic Background</span>
                </h2>
            </div>

            {/* Work Experience Section */}
            {experiences.length > 0 && (
                <div className="work-experience mt-48">
                    <h4
                        className="fade-up-anime mb-24"
                        style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <i className="ri-briefcase-line" style={{ color: '#a855f7' }} />
                        <span>Work Experience</span>
                    </h4>

                    {experiences.map((exp, index) => (
                        <React.Fragment key={`${exp.company}-${exp.dates}`}>
                            <div className="experience-item fade-up-anime">
                                <div>
                                    <div className="job-title">{exp.title}</div>
                                    <div className="company-name">{exp.company}</div>
                                    {exp.description && (
                                        <p
                                            className="mt-8"
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '22px',
                                                color: 'rgba(255, 255, 255, 0.55)',
                                                maxWidth: '520px',
                                            }}
                                        >
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                                <div className="work-dates">{exp.dates}</div>
                            </div>
                            {index < experiences.length - 1 && <div className="experience-divider" />}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <div className="work-experience mt-48">
                    <h4
                        className="fade-up-anime mb-24"
                        style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <i className="ri-graduation-cap-line" style={{ color: '#a855f7' }} />
                        <span>Education & Qualifications</span>
                    </h4>

                    {education.map((edu, index) => (
                        <React.Fragment key={`${edu.degree}-${edu.years}`}>
                            <div className="experience-item fade-up-anime">
                                <div>
                                    <div className="job-title">{edu.degree}</div>
                                    <div className="company-name">{edu.institution}</div>
                                    {edu.description && (
                                        <p
                                            className="mt-8"
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '22px',
                                                color: 'rgba(255, 255, 255, 0.55)',
                                            }}
                                        >
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                                <div className="work-dates">{edu.years}</div>
                            </div>
                            {index < education.length - 1 && <div className="experience-divider" />}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Resume Action */}
            <div className="fade-up-anime mt-48">
                <a
                    href={isDirectDownload ? resumeUrl : '#contact'}
                    target={isDirectDownload ? '_blank' : undefined}
                    rel={isDirectDownload ? 'noopener noreferrer' : undefined}
                    download={isDirectDownload}
                    onClick={handleCvClick}
                    className="visiblo-btn-color"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                    <i className="ri-file-download-line" style={{ fontSize: '18px' }} />
                    <span>{isDirectDownload ? 'Download Full CV (PDF)' : 'Request CV / Contact'}</span>
                </a>
            </div>
        </section>
    );
}
