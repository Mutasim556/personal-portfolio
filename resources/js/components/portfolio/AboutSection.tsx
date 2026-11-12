import type { AboutData } from '@/types/portfolio';

interface AboutSectionProps {
    about: AboutData;
}

export default function AboutSection({ about }: AboutSectionProps) {
    return (
        <section className="about-section" id="about">
            {/* About Badge */}
            <div className="eyebrow-badge fade-up-anime">
                <span>{about.badge}</span>
            </div>
            {/* Main Title */}
            <div className="about-title">
                <h2 className="about-title-secondary text-anime">
                    <span>{about.titlePrimary}</span> <span className="color">{about.titleHighlight}</span>
                </h2>
            </div>

            {/* Optional About Featured Image */}
            {about.image && (
                <div
                    className="about-image-wrap mt-32 fade-up-anime"
                    style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <img
                        src={about.image}
                        alt={about.titlePrimary || 'About Me'}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </div>
            )}

            {/* About Content */}
            <div className="about-content mt-32">
                <p className="about-paragraph text-anime">{about.paragraph1}</p>
                {about.paragraph2 && (
                    <>
                        <br />
                        <p className="about-paragraph text-anime">{about.paragraph2}</p>
                    </>
                )}
            </div>
        </section>
    );
}
