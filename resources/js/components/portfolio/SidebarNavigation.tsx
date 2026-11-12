import { useEffect, useState } from 'react';
import type { NavigationItem } from '@/types/portfolio';

interface SidebarNavigationProps {
    items?: NavigationItem[];
}

const defaultMenuLinks = [
    { label: 'Home', url: '#home', icon: 'ri-home-3-line' },
    { label: 'About', url: '#about', icon: 'ri-user-3-line' },
    { label: 'Resume', url: '#resume', icon: 'ri-align-center' },
    { label: 'Services', url: '#services', icon: 'ri-briefcase-2-line' },
    { label: 'Skills', url: '#skills', icon: 'ri-shapes-line' },
    { label: 'Projects', url: '#portfolio', icon: 'ri-macbook-line' },
    { label: 'Testimonials', url: '#comments', icon: 'ri-message-2-line' },
    { label: 'Contact', url: '#contact', icon: 'ri-mail-send-line' },
];

export default function SidebarNavigation({ items }: SidebarNavigationProps) {
    const navItems = items && items.length > 0 ? items : defaultMenuLinks;
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const offset = 200;

            for (const item of navItems) {
                if (item.url.startsWith('#')) {
                    const sectionId = item.url.replace('#', '');
                    const el = document.getElementById(sectionId);
                    if (el) {
                        const top = el.offsetTop - offset;
                        const bottom = top + el.offsetHeight;
                        if (scrollPos >= top && scrollPos < bottom) {
                            setActiveSection(sectionId);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith('#')) {
            e.preventDefault();
            closeSidebar();
            const id = url.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(id);
            }
        } else {
            closeSidebar();
        }
    };

    return (
        <>
            <div
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
                role="button"
                tabIndex={0}
                aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={isOpen}
            >
                <span />
                <span />
                <span />
            </div>

            <div
                className="sidebar"
                style={{
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    pointerEvents: isOpen ? 'all' : 'none',
                    transition: 'all 0.3s ease',
                    zIndex: 1050,
                }}
                onClick={closeSidebar}
            >
                <div
                    className="right-bar"
                    style={{
                        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        width: 'min(400px, 100vw)',
                        maxWidth: '100vw',
                        boxSizing: 'border-box',
                        padding: '36px 28px',
                        overflowY: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Title and explicit Close (X) button */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingBottom: '20px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <p className="xl" style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>
                            Menu
                        </p>
                        <button
                            type="button"
                            onClick={closeSidebar}
                            aria-label="Close navigation menu"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#ffffff',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '22px',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                        >
                            <i className="ri-close-line" />
                        </button>
                    </div>

                    <ul className="mt-32">
                        {navItems.map((item) => {
                            const id = item.url.startsWith('#') ? item.url.replace('#', '') : item.label;
                            const isActive = activeSection === id;
                            return (
                                <li key={item.label} style={{ marginBottom: '6px' }}>
                                    <a
                                        href={item.url}
                                        className={isActive ? 'active' : ''}
                                        onClick={(e) => handleLinkClick(e, item.url)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'background 0.2s ease',
                                        }}
                                    >
                                        <i className={item.icon || 'ri-link'} style={{ fontSize: '20px' }} />
                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
