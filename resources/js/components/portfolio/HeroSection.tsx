import type { HeroData } from '@/types/portfolio';

interface HeroSectionProps {
    hero: HeroData;
    onContactClick?: () => void;
}

export default function HeroSection({ hero, onContactClick }: HeroSectionProps) {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetUrl: string) => {
        if (targetUrl.startsWith('#')) {
            e.preventDefault();
            const targetId = targetUrl.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="hero-section" id="home">
            <div className="eyebrow-badge fade-up-anime">
                <span>{hero.badge}</span>
            </div>
            <h1 className="hero-headline text-anime">
                <span className="hero-title-line">{hero.titleLine1}</span>{' '}
                {hero.titleLine2 && (
                    <>
                        <span className="hero-title-line">{hero.titleLine2}</span>{' '}
                    </>
                )}
                <span className="hero-title-line color">{hero.titleHighlight}</span>
            </h1>
            <p className="mt-32 text-anime">{hero.description}</p>
            <div className="buttons-holder fade-up-anime mt-64">
                <a
                    className="visiblo-btn-color"
                    href={hero.primaryButtonUrl}
                    onClick={(e) => {
                        handleScrollTo(e, hero.primaryButtonUrl);
                        onContactClick?.();
                    }}
                >
                    <span>{hero.primaryButtonText}</span>
                </a>
                <a
                    className="visiblo-btn-arrow"
                    href={hero.secondaryButtonUrl || '#resume'}
                    target={hero.secondaryButtonUrl?.startsWith('#') ? undefined : '_blank'}
                    rel={hero.secondaryButtonUrl?.startsWith('#') ? undefined : 'noopener noreferrer'}
                    download={!hero.secondaryButtonUrl?.startsWith('#')}
                    onClick={(e) => handleScrollTo(e, hero.secondaryButtonUrl || '#resume')}
                >
                    <span>{hero.secondaryButtonText || 'Download Cv'}</span>
                </a>
            </div>
        </section>
    );
}
