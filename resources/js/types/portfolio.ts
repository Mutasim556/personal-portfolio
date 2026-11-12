export interface Profile {
    name: string;
    title: string;
    avatar: string;
    logo?: string | null;
    logoDark?: string | null;
    favicon?: string | null;
    footerLogo?: string | null;
    email: string;
    phone: string;
    location: string;
    socialLinks: {
        platform: string;
        url: string;
        icon: string;
    }[];
    resumeUrl: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoOgImage?: string | null;
}

export interface HeroData {
    badge: string;
    titleLine1: string;
    titleLine2: string | null;
    titleHighlight: string;
    description: string;
    profileImage?: string | null;
    backgroundImage?: string | null;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string | null;
    secondaryButtonUrl: string | null;
    backgroundVideo: string;
}

export interface AboutData {
    badge: string;
    titlePrimary: string;
    titleHighlight: string;
    paragraph1: string;
    paragraph2: string | null;
    image?: string | null;
}

export interface Experience {
    title: string;
    company: string;
    dates: string;
    description?: string | null;
}

export interface EducationItem {
    degree: string;
    institution: string;
    years: string;
    description?: string | null;
}

export interface Service {
    name: string;
    description: string;
    icon?: string | null;
    image?: string | null;
}

export interface Skill {
    name: string;
    percentage: number;
    icon: string;
}

export interface ProjectGalleryImage {
    id: number;
    imageUrl: string;
    altText?: string | null;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    category?: string;
    image: string;
    gallery?: ProjectGalleryImage[];
    fullWidth?: boolean;
}

export interface Testimonial {
    id?: number;
    author: string;
    quote: string;
    company?: string | null;
    designation?: string | null;
    avatar?: string | null;
}

export interface Client {
    name: string;
    icon: string;
}

export interface NavigationItem {
    label: string;
    url: string;
    icon?: string | null;
    is_external?: boolean;
}

export interface PortfolioHomeProps {
    profile: Profile;
    hero: HeroData;
    about: AboutData;
    experiences: Experience[];
    education: EducationItem[];
    services: Service[];
    skills: Skill[];
    projects: Project[];
    testimonials: Testimonial[];
    navigationItems: NavigationItem[];
    clients: Client[];
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}
