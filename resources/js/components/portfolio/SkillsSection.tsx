import type { Skill } from '@/types/portfolio';

interface SkillsSectionProps {
    skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    return (
        <section className="skills-section" id="skills">
            {/* Skills Badge */}
            <div className="eyebrow-badge fade-up-anime">
                <span>SKILLS</span>
            </div>

            {/* Main Title */}
            <div className="skills-title text-anime">
                <h2 className="skills-title-main">
                    <span>My </span> <span className="color">Superpowers</span>
                </h2>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid mt-64 row">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="skill-card-wrapper col-md-4 col-6 col-lg-3 fade-up-anime"
                    >
                        <div className="skill-card">
                            <div className="skill-icon">
                                <img src={skill.icon} alt={skill.name} />
                            </div>
                            <span className="skill-percentage">{skill.percentage}%</span>
                        </div>
                        <span className="skill-name">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
