import React, { useState } from 'react';
import type { Service } from '@/types/portfolio';

interface ServicesSectionProps {
    services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="services-section" id="services">
            {/* Services Badge */}
            <div className="eyebrow-badge fade-up-anime">
                <span>SERVICES</span>
            </div>

            {/* Main Title */}
            <div className="services-title">
                <h2 className="services-title-primary text-anime">
                    <span>Solutions That </span>
                    <span className="color">Empower Your Brand</span>
                </h2>
            </div>

            {/* Services Accordion */}
            <div className="services-accordion mt-32">
                {services.map((service, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <React.Fragment key={service.name}>
                            <div className="accordion-item fade-up-anime">
                                <div
                                    className={`accordion-header ${isOpen ? 'active' : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                    role="button"
                                    tabIndex={0}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className="service-name">{service.name}</span>
                                    <span
                                        className="accordion-arrow"
                                        style={{
                                            transform: isOpen ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    >
                                        <i className="ri-arrow-right-down-line" />
                                    </span>
                                </div>
                                <div
                                    className="accordion-content"
                                    style={{
                                        display: isOpen ? 'block' : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {service.image && (
                                        <div
                                            style={{
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                marginBottom: '16px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                            }}
                                        >
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '260px',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />
                                        </div>
                                    )}
                                    <p>{service.description}</p>
                                </div>
                            </div>
                            {index < services.length - 1 && <div className="accordion-divider" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
