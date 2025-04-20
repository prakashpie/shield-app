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
    name: 'Vandana Prasad',
    designation: 'QA Engineer',
    image: {
      src: '/img/vandna.png',
    },
    aboutMe: [
      'Quality Assurance Engineer with 6 years of experience in Automation & Functional Testing.',
      'Providing expertise in improving client service and consulting for projects and initiatives relating to testing targeting assignments inIT Services, IT Consultant, IT Management and IT Department.',
    ],
    address: {
      line1: 'India, 560102',
      line2: 'HSR Layout, Bangalore',
    },
    email: 'vandanaprasad2619@gmail.com',
    mobile: '+91 91740 56237',
    linkedinUrl: 'https://www.linkedin.com/in/vandana-prasad-266454129/',
    greetMessage: "Hello 🙌, I'm Vandana Prasad",
    company: 'TCS',
    companyUrl: 'https://www.tcs.com/',
  },
  openSourceProjectSection: {
    title: 'My Github Repositories',
    items: [],
  },
  recentWorkSection: {
    title: 'My Recent Work',
    items: [],
  },
  skillSections: [
    {
      title: 'Frontend & Backend',
      items: [],
    },
  ],
  otherSkillSection: {
    title: 'Other Skills',
    items: [
      'Agile technology',
      'Scrum',
      'Automation testing',
      'Database testing',
      'Functional testing',
      'API testing',
    ],
  },
  educationSection: {
    title: '',
    items: [
      {
        institute: 'Technocrats Institute of Science & Technology',
        degree: 'Bachelor in Engineering',
        subject: 'Computer Science',
        grade: '7.95 / 10',
        startYear: 2014,
        endYear: 2018,
        description: '',
      },
      {
        institute: 'M.G.M CO - ED SR . SEC SCHOOL',
        degree: '12th',
        subject: 'Math Science',
        grade: '65.5 %',
        startYear: 2012,
        endYear: 2014,
        description: '',
      },
      {
        institute: 'M.G.M CO - ED SR . SEC SCHOOL',
        degree: '10th',
        subject: 'Math Science',
        grade: '72 %',
        startYear: 2010,
        endYear: 2012,
        description: '',
      },
    ],
  },
  workExperiences: [
    {
      company: 'TCS',
      companyLogo: '/icons/tcs.png',
      startDate: { year: 2022, month: 4 },
      endDate: null,
      description: [
        'Utilized Playwright for end-to-end testing of modern web applications, enabling faster feedback loops and enhancing the overall testing process.',
        'Conducted thorough functional testing of web and mobile applications, ensuring compliance with business requirements and user expectations.',
        'Designed and implemented automated test scripts using Selenium WebDriver, Java, and Cucumber, significantly improving testing efficiency and coverage.',
        'Extensive experience in reviewing and analyzing Business Requirements and creating Test Plans, Test Cases, Test Scripts, Test Estimation & Requirement Traceability Matrix.',
      ],
      designation: 'Quality Assurance Engineer',
    },
    {
      company: 'Cognizant Technology Solutions',
      companyLogo: '/icons/cognizant.jpeg',
      startDate: { year: 2019, month: 3 },
      endDate: { year: 2022, month: 4 },
      description: [
        'Implemented automated test scripts using Selenium WebDriver, Java, and TestNG .' +
        'Have experience in Database testing using SAP,Salesforce.' +
        ' Perfromed API testing using Postman',
        'Performing analysis, design of test cases, test data for functional testing as required',
        'Expert using defect tracking tools Zephyr and Jira.',
        'Jenkins log Analysis using Perfecto and making changes in code required',
        'Working effectively in a team environment with other testers, developers, analysts, project managers and client staff.',
        'Involve in creating documentations about client specific applications, project specific processes and workflows.',
      ],
      designation: 'Programmer Analyst',
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
      { name: 'Playwright', icon: '/icons/playwright.svg' },
      { name: 'Selenium WebDriver', icon: '/icons/selenium-web-driver.png' },
      { name: 'Cucumber / BDD', icon: '/icons/cucumber.png' },
      { name: 'Jenkins', icon: '/icons/jenkins.jpeg' },
    ],
  },
  otherTechnologySection: {
    title: 'Other Technologies',
    items: [
      { name: 'Dbeaver', icon: '/icons/dbeaver.jpeg' },
      { name: 'Postman', icon: '/icons/postman.png' },
      { name: 'Intellij', icon: '/icons/intellij.jpeg' },
      { name: 'Salesforce', icon: '/icons/salesforce.jpeg' },
      { name: 'SAP', icon: '/icons/sap.jpeg' },
    ],
  },
  interestSection: {
    title: 'Interests',
    items: [],
  },
  courseWorkSection: {
    title: 'Coursework',
    items: [],
  },
  builtWithSection: {
    title: 'Built with',
    show: false,
  },
};
