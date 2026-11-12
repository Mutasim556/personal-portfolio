import { PropsWithChildren } from 'react';
import BackgroundVideo from '@/components/portfolio/BackgroundVideo';

interface PortfolioLayoutProps extends PropsWithChildren {
    videoSrc?: string;
}

export default function PortfolioLayout({ children, videoSrc }: PortfolioLayoutProps) {
    return (
        <div className="portfolio-theme-root">
            {/* SVG Filter for Glass Distortion used in original Visiblo theme */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <filter id="refractionFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.006"
                            numOctaves="10"
                            result="turbulence"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="170"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Background looping ambient video */}
            <BackgroundVideo videoSrc={videoSrc} />

            {/* Main theme page wrapper */}
            <main>{children}</main>
        </div>
    );
}
