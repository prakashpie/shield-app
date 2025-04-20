export interface Profile {
    name: string;
    designation: string;
    company: string;
    companyUrl: string;
    image: {
        src: string;
    };
    aboutMe: string[];
    address: { line1: string; line2: string };
    email: string;
    mobile: string;
    linkedinUrl: string;
    greetMessage: string;
}

export interface UrlItem {
    url?: string;
    name: string;
    icon?: string;
}

export interface OpenSourceProjectSection {
    items: UrlItem[];
    title: string;
}

export interface RecentWorkSection {
    items: UrlItem[];
    title: string;
}

export interface Skill {
    name: string;
    score: number;
}

export interface SkillSection {
    title: string;
    items: Skill[];
}

export interface OtherSkillSection {
    title: string;
    items: string[];
}

export interface CoreTechnology {
    name: string;
    icon: string;
}

export interface CoreTechnologySection {
    title: string;
    items: CoreTechnology[];
}

export interface OtherTechnology {
    name: string;
    icon: string;
}

export interface OtherTechnologySection {
    title: string;
    items: OtherTechnology[];
}

export interface Education {
    institute: string;
    degree: string;
    subject: string;
    grade: string;
    startYear: number;
    endYear: number;
    description: string;
}

export interface EducationSection {
    title: string;
    items: Education[];
}

export interface WorkExperience {
    company: string;
    startDate: { year: number; month: number };
    endDate: { year: number; month: number } | null;
    description: string | string[];
    designation: string;
    companyLogo?: string;
}

export interface InterestSection {
    title: string;
    items: UrlItem[];
}

export interface CourseWorkSection {
    title: string;
    items: UrlItem[];
}

export interface BuiltWithSection {
    title: string;
    show: boolean;
}

export interface WorkExperienceSection {
    title: string;
    items: WorkExperience[];
}