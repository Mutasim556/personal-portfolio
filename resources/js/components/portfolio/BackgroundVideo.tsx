import { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
    videoSrc?: string;
    opacity?: number;
    left?: string;
}

export default function BackgroundVideo({
    videoSrc,
    opacity = 0.85,
    left = '0',
}: BackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Correct common typo ("ocen.mp4" -> "ocean.mp4") and ensure clean URL
    const normalizedSrc = (videoSrc || '')
        .replace(/\/ocen\.mp4$/i, '/ocean.mp4')
        .replace(/^theme\//, '/theme/');

    const src = normalizedSrc || `${import.meta.env.BASE_URL.replace(/\/$/, '')}/theme/video/ball.mp4`;

    // Ensure programmatic play, reload on src change, and handle browser autoplay
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        el.muted = true;
        el.defaultMuted = true;
        el.load();

        const playPromise = el.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.warn('Background video autoplay was prevented:', err);
            });
        }
    }, [src]);

    return (
        <div
            className="video-wrapper"
            style={{
                opacity,
                left,
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                src={src}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                }}
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
}
