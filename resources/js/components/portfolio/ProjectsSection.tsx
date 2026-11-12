import { useState } from 'react';
import type { Project } from '@/types/portfolio';

interface ProjectsSectionProps {
    projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const closeLightbox = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
    };

    const getProjectImages = (project: Project): string[] => {
        const list = [project.image];
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach((g) => {
                if (g.imageUrl && !list.includes(g.imageUrl)) {
                    list.push(g.imageUrl);
                }
            });
        }
        return list;
    };

    const currentImages = selectedProject ? getProjectImages(selectedProject) : [];
    const activeImageSrc = currentImages[currentImageIndex] || selectedProject?.image;

    const showPrev = () => {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1));
    };

    const showNext = () => {
        setCurrentImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0));
    };

    return (
        <section className="portfolio" id="portfolio">
            <div className="eyebrow-badge fade-up-anime">
                <span>PROJECTS</span>
            </div>
            <h2 className="text-anime">
                <span>Projects Where Creativity </span>
                <span className="color">Meets Strategy</span>
            </h2>

            <div className="projects-wrap row g-5 mt-32">
                {projects.map((project) => {
                    const colClass = project.fullWidth ? 'col-md-12' : 'col-md-6';
                    const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
                    return (
                        <div key={project.id} className={`project ${colClass} fade-up-anime`}>
                            <div
                                data-lightbox="pro"
                                className="lightbox"
                                onClick={() => openLightbox(project)}
                                role="button"
                                tabIndex={0}
                                style={{ position: 'relative' }}
                            >
                                <img
                                    decoding="async"
                                    src={project.image}
                                    data-mfp-src={project.image}
                                    alt={project.title}
                                />
                                {hasGallery && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            right: '12px',
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            color: '#fff',
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            backdropFilter: 'blur(4px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        <i className="ri-gallery-line" />
                                        <span>{(project.gallery?.length || 0) + 1} photos</span>
                                    </div>
                                )}
                            </div>
                            <span className="mt-16 project-name">{project.title}</span>
                        </div>
                    );
                })}
            </div>

            {/* Custom Lightbox Modal */}
            {selectedProject && activeImageSrc && (
                <div
                    className="mfp-bg mfp-ready"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 99999,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={closeLightbox}
                >
                    <div
                        style={{
                            maxWidth: '92vw',
                            maxHeight: '92vh',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={activeImageSrc}
                                alt={selectedProject.title}
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '90vw',
                                    maxHeight: '75vh',
                                    objectFit: 'contain',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    display: 'block',
                                }}
                            />

                            {/* Prev / Next buttons if multiple photos */}
                            {currentImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={showPrev}
                                        style={{
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                        aria-label="Previous photo"
                                    >
                                        <i className="ri-arrow-left-s-line" style={{ fontSize: '22px' }} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={showNext}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                        aria-label="Next photo"
                                    >
                                        <i className="ri-arrow-right-s-line" style={{ fontSize: '22px' }} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Title and Counter */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: '12px',
                                color: '#fff',
                            }}
                        >
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>
                                {selectedProject.title}
                            </span>
                            {currentImages.length > 1 && (
                                <span style={{ fontSize: '13px', color: '#aaa' }}>
                                    {currentImageIndex + 1} / {currentImages.length}
                                </span>
                            )}
                        </div>

                        {/* Thumbnail strip if multiple photos */}
                        {currentImages.length > 1 && (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '10px',
                                    overflowX: 'auto',
                                    maxWidth: '100%',
                                    padding: '4px 0',
                                }}
                            >
                                {currentImages.map((src, idx) => (
                                    <button
                                        key={src}
                                        type="button"
                                        onClick={() => setCurrentImageIndex(idx)}
                                        style={{
                                            padding: 0,
                                            border:
                                                idx === currentImageIndex
                                                    ? '2px solid #a855f7'
                                                    : '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '6px',
                                            overflow: 'hidden',
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            style={{
                                                width: '50px',
                                                height: '35px',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={closeLightbox}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '28px',
                                cursor: 'pointer',
                            }}
                            aria-label="Close image preview"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
