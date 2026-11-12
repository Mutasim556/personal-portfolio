import { useForm } from '@inertiajs/react';
import type { Profile } from '@/types/portfolio';

interface ContactSectionProps {
    profile: Profile;
    flashMessage?: string | null;
}

export default function ContactSection({ profile, flashMessage }: ContactSectionProps) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        website: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="contact-section" id="contact">
            {/* Contact Badge */}
            <div className="eyebrow-badge fade-up-anime">
                <span>CONTACT</span>
            </div>

            {/* Main Title */}
            <div className="contact-title">
                <h2>
                    <span>Any questions? </span>
                    <span className="color">I'm all ears.</span>
                </h2>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-cards">
                {/* Contact Details Card */}
                <div className="contact-card">
                    <p className="xl text-anime">Contact Details</p>
                    <div className="contact-info mt-16">
                        {profile.email ? (
                            <p className="contact-item text-anime">
                                <a href={`mailto:${profile.email}`} style={{ color: 'inherit' }}>
                                    {profile.email}
                                </a>
                            </p>
                        ) : (
                            <p className="contact-item text-anime" style={{ opacity: 0.7 }}>
                                Available via the contact form below.
                            </p>
                        )}
                        {profile.phone && (
                            <p className="contact-item text-anime">
                                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>
                                    {profile.phone}
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* Address Card */}
                <div className="contact-card">
                    <p className="text-anime xl">Address</p>
                    <div className="contact-info mt-16">
                        <p className="contact-item text-anime" style={{ whiteSpace: 'pre-line' }}>
                            {profile.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Feedback alert messages */}
            {(recentlySuccessful || flashMessage) && (
                <div
                    className="mt-32 p-4 text-sm"
                    style={{
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        color: '#4ade80',
                        borderRadius: '12px',
                        padding: '16px 20px',
                    }}
                >
                    {flashMessage || 'Thank you! Your message has been sent successfully.'}
                </div>
            )}

            {/* Contact Form */}
            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group fade-up-anime">
                            <label htmlFor="name" className="form-label">
                                NAME
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Your Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="form-group fade-up-anime">
                            <label htmlFor="email" className="form-label">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Your Email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="form-group fade-up-anime">
                            <label htmlFor="website" className="form-label">
                                WEBSITE (OPTIONAL)
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                className="form-input"
                                placeholder="Company Website"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                            />
                            {errors.website && (
                                <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                                    {errors.website}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-group full-width fade-up-anime">
                        <label htmlFor="message" className="form-label">
                            MESSAGE
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-textarea"
                            placeholder="Your Message"
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            required
                        />
                        {errors.message && (
                            <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <div className="form-submit">
                        <button
                            type="submit"
                            className="visiblo-btn-color"
                            disabled={processing}
                            style={{ opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}
                        >
                            <span>{processing ? 'Sending...' : 'Send It!'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
