import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import type { Client, Testimonial } from '@/types/portfolio';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    clients: Client[];
}

export default function TestimonialsSection({
    testimonials,
    clients,
}: TestimonialsSectionProps) {
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!swiperRef.current) return;

        const swiperInstance = new Swiper(swiperRef.current, {
            modules: [Autoplay],
            slidesPerView: 2.8,
            spaceBetween: 30,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
            },
            speed: 8000,
            loop: true,
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                },
                576: {
                    slidesPerView: 1.8,
                },
                768: {
                    slidesPerView: 2.8,
                },
            },
        });

        return () => {
            swiperInstance.destroy(true, true);
        };
    }, []);

    return (
        <section className="comments" id="comments">
            <div className="eyebrow-badge fade-up-anime">
                <span>COMMENTS</span>
            </div>
            <h2 className="text-anime">
                <span>What the People Saying </span>
                <span className="color">About Me</span>
            </h2>

            {/* Swiper */}
            <div ref={swiperRef} className="swiper commentSlider mt-32 fade-up-anime">
                <div className="swiper-wrapper">
                    {testimonials.map((testimonial, idx) => (
                        <div key={`${testimonial.author}-${idx}`} className="swiper-slide">
                            <div className="comment-box">
                                <p className="xs">{testimonial.quote}</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginTop: '24px',
                                    }}
                                >
                                    {testimonial.avatar && (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            style={{
                                                width: '42px',
                                                height: '42px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                flexShrink: 0,
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        />
                                    )}
                                    <div>
                                        <span style={{ display: 'block', fontWeight: 600, color: '#fff' }}>
                                            {testimonial.author}
                                        </span>
                                        {(testimonial.designation || testimonial.company) && (
                                            <span style={{ display: 'block', fontSize: '12px', color: '#999' }}>
                                                {testimonial.designation}
                                                {testimonial.company ? ` at ${testimonial.company}` : ''}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Client Logos / Tech Stack */}
            <div className="row logos g-5 mt-64">
                {clients.map((client) => (
                    <div
                        key={client.name}
                        className="col-md-3 col-6 logo fade-up-anime"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            color: '#999',
                            fontSize: '28px',
                        }}
                    >
                        <i className={client.icon} />
                        <span style={{ fontSize: '18px', fontWeight: 600 }}>{client.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
