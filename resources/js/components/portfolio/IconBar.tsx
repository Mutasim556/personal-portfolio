import { useEffect, useState } from 'react';
import type { NavigationItem } from '@/types/portfolio';

interface IconBarProps {
    items?: NavigationItem[];
}

const defaultSections = [
    { label: 'home', url: '#home', icon: 'ri-home-3-line' },
    { label: 'resume', url: '#resume', icon: 'ri-align-center' },
    { label: 'services', url: '#services', icon: 'ri-briefcase-2-line' },
    { label: 'skills', url: '#skills', icon: 'ri-shapes-line' },
    { label: 'projects', url: '#portfolio', icon: 'ri-macbook-line' },
    { label: 'testimonials', url: '#comments', icon: 'ri-message-2-line' },
    { label: 'contact', url: '#contact', icon: 'ri-mail-send-line' },
];

export default function IconBar({ items }: IconBarProps) {
    const navItems = items && items.length > 0 ? items : defaultSections;
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

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith('#')) {
            e.preventDefault();
            const id = url.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(id);
            }
        }
    };

    return (
        <div className="icon-bar">
            {navItems.map((item) => {
                const id = item.url.startsWith('#') ? item.url.replace('#', '') : item.label;
                const isActive = activeSection === id;
                return (
                    <a
                        key={item.label}
                        href={item.url}
                        className={isActive ? 'active' : ''}
                        onClick={(e) => scrollToSection(e, item.url)}
                    >
                        <span>{item.label.toLowerCase()}</span>
                        <i className={item.icon || 'ri-link'} />
                    </a>
                );
            })}
        </div>
    );
}
