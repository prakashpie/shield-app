import {
  Profile,
  OpenSourceProjectSection,
  RecentWorkSection,
  WorkExperience,
  InterestSection,
  EducationSection,
  SkillSection,
  OtherSkillSection,
  CoreTechnologySection,
  OtherTechnologySection,
  CourseWorkSection,
  BuiltWithSection,
} from '@/lib/types';

interface ResumeData {
  profile: Profile;
  openSourceProjectSection: OpenSourceProjectSection;
  recentWorkSection: RecentWorkSection;
  skillSections: SkillSection[];
  otherSkillSection: OtherSkillSection;
  educationSection: EducationSection;
  workExperiences: WorkExperience[];
  months: string[];
  coreTechnologySection: CoreTechnologySection;
  otherTechnologySection: OtherTechnologySection;
  interestSection: InterestSection;
  courseWorkSection: CourseWorkSection;
  builtWithSection: BuiltWithSection;
}

export const resumeData: ResumeData = {
  profile: {
    name: 'Prakash Bharti',
    designation: 'Lead Frontend Dev',
    image: {
      src: '/img/profile.webp',
    },
    aboutMe: [
      'Lead Frontend Developer with 11+ years of experience building accessible, scalable web applications. Specializing in React, Next.js, I am passionate about creating clean, responsive, and pixel-perfect user experiences.',
      "My expertise extends to a broad range of frontend technologies, including TailWind, UnoCSS, SCSS, TypeScript, Vue.js, and Angular. I am also proficient in developing robust REST APIs with Node.js frameworks like Adonis.js, and have a proven track record of mentoring high-performing teams, architecting web applications, and managing end-to-end development on AWS and GCP.",
    ],
    address: {
      line1: 'India, 560102',
      line2: 'HSR Layout, Bangalore',
    },
    email: 'prakash.codepie@gmail.com',
    mobile: '+91 620 1410 605',
    linkedinUrl: 'https://www.linkedin.com/in/prakashpie/',
    greetMessage: "Hello 🙌, I'm Prakash Bharti",
    company: 'Gameskraft',
    companyUrl: 'https://www.gameskraft.com/',
  },
  openSourceProjectSection: {
    title: 'My Github Repositories',
    items: [
      {
        url: 'https://github.com/prakashpie',
        name: 'github.com/prakashpie',
        icon: 'code',
      },
      {
        url: 'https://github.com/codepie-io',
        name: 'github.com/codepie-io',
        icon: 'code',
      },
    ],
  },
  recentWorkSection: {
    title: 'My Recent Work',
    items: [
      {
        url: 'https://www.playirg.com',
        name: 'www.playirg.com ',
        icon: 'web',
      },
      {
        url: 'https://design.gameskraft.com',
        name: 'design.gameskraft.com ',
        icon: 'web',
      },
      {
        url: 'https://rummyculture.com',
        name: 'www.rummyculture.com',
        icon: 'web',
      },
      {
        url: 'https://rummytime.com',
        name: 'www.rummytime.com',
        icon: 'web',
      },
      {
        url: 'https://www.read.enago.com/',
        name: 'read.enago.com',
        icon: 'web',
      },
      {
        url: 'https://www.ahlawattravels.com/',
        name: 'www.ahlawattravels.com',
        icon: 'web',
      },
    ],
  },
  skillSections: [
    {
      title: 'Frontend & Backend',
      items: [
        {
          name: 'HTML5 / CSS3 / SCSS',
          score: 9,
        },
        {
          name: 'Bootstrap / Tailwind / UnoCSS',
          score: 9,
        },
        {
          name: 'JavaScript / TypeScript',
          score: 8,
        },
        {
          name: 'React / Next.js / Vue / Nuxt ',
          score: 8,
        },
        {
          name: 'Node.js / Adonis.js / Express',
          score: 7,
        },
        {
          name: 'PHP / Wordpress / Laravel',
          score: 7,
        },
      ],
    },
    {
      title: 'Cloud & DevOps',
      items: [
        {
          name: 'AWS, Google Cloud',
          score: 7,
        },
        {
          name: 'Firebase, Docker',
          score: 7,
        },
      ],
    },
  ],
  otherSkillSection: {
    title: 'Other Skills',
    items: [
      'Agile Development (JIRA)',
      'Progressive Web App Development',
      'REST API Design and Implementation',
    ],
  },
  educationSection: {
    title: '',
    items: [
      {
        institute: 'Swami Vivekananda Institute of Science & Technology',
        degree: "Bachelor of Technology",
        subject: 'Computer Science',
        grade: 'A',
        startYear: 2010,
        endYear: 2014,
        description: '',
      },
    ],
  },
  workExperiences: [
    {
      company: 'Gameskraft Technology',
      companyLogo: '/icons/gameskraft.jpeg',
      startDate: { year: 2020, month: 5 },
      endDate: null,
      description: [
        'Led and mentored a team of 8 developers, fostering a collaborative environment and ensuring timely project delivery.',
        'Enhanced website performance by optimizing <span class="font-bold">core web vitals (LCP, FID, INP) by 40%</span> through strategic application of micro-optimizations and bundle size reduction.',
        'Demonstrated strong problem-solving and adaptability skills, <span class="font-bold"> actively proposing and implementing scalable </span> solutions.',
        'Successfully migrated 5+ PHP websites to a Static Site Generation (SSG) architecture, leveraging WordPress as a headless CMS. Built with <span class="font-bold">Next.js</span>, this approach enabled the creation of complex, visually rich pages without compromising on website speed and user experience.',
        'Developed and deployed a national-level tournament registration web application, utilizing <span class="font-bold">TypeScript</span> and the <span class="font-bold">Repository pattern</span> for efficient and maintainable API calls. Leveraged <span class="font-bold">AWS services</span> extensively, including EC2, Lambda, S3, CloudFront, and Auto Scaling, to design and implement a scalable and high-performance solution capable of serving a large number of users. See here 👉 <a class="text-primary font-bold" target="_blank" href="https://www.playirg.com/">www.playirg.com</a>',
        'Successfully designed, developed, and deployed a suite of microservices utilizing Node.js. To enhance content management and user experience, I also developed a <span class="font-bold">custom CMS application</span>, providing an intuitive interface for efficient data entry and updates tailored to specific project needs. 👉 <a class="text-primary font-bold" target="_blank" href="https://design.gameskraft.com/admin/">design.gameskraft.com/admin</a>',
      ],
      designation: 'Lead Developer',
    },
    {
      company: 'Cyware Labs',
      companyLogo: '/icons/cyware.jpeg',
      startDate: { year: 2019, month: 10 },
      endDate: { year: 2020, month: 4 },
      description: [
        'Enhanced significant features of the Cyware Threat Intelligence Platform (TIP) Web App using React, Tailwind, TypeScript, and Node.js.',
        'Collaborated closely with the design team to revamp the entire landing page in Next.js. See here 👉 <a href="https://www.cyware.com/" target="_blank" rel="nofollow, noopener, noreferrer" class="font-bold text-primary">www.cyware.com</a>',
        'Collaborated with the development team to identify, diagnose, and <span class="font-bold"> resolve a variety of bugs </span> on Cyware\'s web applications.',
      ],
      designation: 'Sr. Software Developer',
    },
    {
      company: 'Enago read',
      companyLogo: '/icons/rax_labs.jpeg',
      startDate: { year: 2018, month: 2 },
      endDate: { year: 2019, month: 9 },
      description: [
        'Developed and styled interactive, reusable Vue components, improving UI consistency and development efficiency.',
        'Proposed and implemented the entire architecture, including the Landing page, Assistant Web App, and Admin Web App, resulting in a 5x increase in user acquisition.',
        'Reduced backend server response time by 50% through optimization of Node.js (Sails.js) microservices. See here 👉 <a href="https://www.read.enago.com/" target="_blank" rel="nofollow, noopener, noreferrer" class="font-bold text-primary">read.enago.one</a>',
      ],
      designation: 'Senior Frontend Developer',
    },
    {
      company: 'Earth Technology | National IT | Novatree eSolutions',
      companyLogo: '/icons/earth-technology.jpeg',
      startDate: { year: 2015, month: 0 },
      endDate: { year: 2018, month: 1 },
      description: [
        'Developed, maintained, and deployed Travel and Fitness Social Network Website using HTML, CSS, Sass, Laravel , JavaScript, and jQuery. ',
        'Designed and implemented a MySQL database and backend server using PHP, improving data management efficiency.',
        'Trained and onboarded new team members, contributing to a 50% reduction in project ramp-up time.',
        'Rapidly developed advanced front-end skills through intensive training and hands-on problem-solving, resulting in pixel-perfect, high-quality deliverables.',
      ],
      designation: 'Full Stack Developer',
    },
  ],
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  coreTechnologySection: {
    title: 'Core Technologies',
    items: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Next.js', icon: '/icons/next_js.svg' },
      { name: 'Javascript', icon: '/icons/javascript.svg' },
      { name: 'Typescript', icon: '/icons/typescript.svg' },
      { name: 'Tailwind', icon: '/icons/tailwind.svg' },
      { name: 'Scss', icon: '/icons/scss.svg' },
      { name: 'Vue', icon: '/icons/vue.svg' },
      { name: 'Nuxt', icon: '/icons/nuxt.svg' },
      { name: 'NodeJs', icon: '/icons/nodejs.svg' },
      { name: 'PWA', icon: '/icons/pwa.svg' },
      { name: 'AWS', icon: '/icons/aws.svg' },
      { name: 'Playwright', icon: '/icons/playwright.svg' },
    ],
  },
  otherTechnologySection: {
    title: 'Other Technologies',
    items: [
      { name: 'WebStorm', icon: '/icons/webstorm.svg' },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'Material Design', icon: '/icons/material_design.svg' },
      { name: 'shadcn ui', icon: '/icons/shadcn_ui.svg' },
      { name: 'MySQL', icon: '/icons/mysql.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg' },
      { name: 'Figma', icon: '/icons/figma.svg' },
    ],
  },
  interestSection: {
    title: 'Interests',
    items: [
      {
        name: 'Cricket',
      },
      {
        name: 'Travelling',
      },
      {
        name: 'Fitness',
      },
      {
        name: 'Technology Meetups',
      },
    ],
  },
  courseWorkSection: {
    title: 'Coursework',
    items: [
      {
        name: 'Meta Front-End Certification ',
      },
      {
        name: 'GCP Associate Cloud Engineer',
      },
    ],
  },
  builtWithSection: {
    title: 'Built with',
    show: true
  }
};
