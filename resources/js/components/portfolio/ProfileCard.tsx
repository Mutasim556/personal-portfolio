import type { Profile } from '@/types/portfolio';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <div className="profile-box-wrap col-12 offset-md-1 col-md-10 offset-lg-0 col-lg-3">
            <div className="profile-box glass-effect">
                <div className="profile-box-inner">
                    <div className="profile-image">
                        <img src={profile.avatar} alt={profile.name} />
                    </div>
                    <div className="profile-info">
                        <h5 className="mt-1">{profile.name}</h5>
                        <p className="body-three mt-16" style={{ whiteSpace: 'pre-line' }}>
                            {profile.title}
                        </p>
                    </div>
                    <div className="social-links mt-32">
                        {profile.socialLinks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.platform}
                            >
                                <i className={social.icon} />
                            </a>
                        ))}
                    </div>
                    {profile.email && (
                        <div className="email-info mt-32">
                            <a href={profile.email.includes('@') ? `mailto:${profile.email}` : '#contact'}>
                                <h6>{profile.email}</h6>
                            </a>
                        </div>
                    )}
                    <div className="cv-download mt-24">
                        <a
                            href={profile.resumeUrl || '#contact'}
                            target={profile.resumeUrl && !profile.resumeUrl.startsWith('#') ? '_blank' : undefined}
                            rel={profile.resumeUrl && !profile.resumeUrl.startsWith('#') ? 'noopener noreferrer' : undefined}
                            download={profile.resumeUrl && !profile.resumeUrl.startsWith('#')}
                            className="visiblo-btn-arrow"
                            style={{
                                width: '100%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <i className="ri-file-download-line" style={{ fontSize: '18px' }} />
                            <span>{profile.resumeUrl && !profile.resumeUrl.startsWith('#') ? 'Download CV' : 'Request CV'}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
