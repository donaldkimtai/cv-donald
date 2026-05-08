import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  Post,
  Profile,
  Project,
  Skill,
} from '../lib/types'

export const fallbackProfile: Profile = {
  name: 'Donald Kimtai',
  role: 'Security Consultant · Web & API Security Researcher',
  tagline:
    'I help organizations protect their digital assets through practical, standards-aligned security work — from web app pentests to API hardening and cloud audits.',
  location: 'Nairobi, Kenya',
  email: 'donaldkimtai623@gmail.com',
  bio: [
    "Hi, I'm Donald Kimtai — a Security Consultant focused on web application and API security research, based in Nairobi, Kenya. I specialize in identifying, testing, and securing vulnerabilities in web platforms, APIs, and cloud-based services.",
    'I have a strong foundation in ethical hacking, digital forensics, and penetration testing. I help organizations protect their digital assets through practical, standards-aligned security solutions.',
  ],
  philosophy: 'Security isn\u2019t just a toolset — it\u2019s a mindset.',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/donald-kimtai/', icon: 'Linkedin' },
    { label: 'GitHub', url: 'https://github.com/donaldkimtai', icon: 'Github' },
    { label: 'X', url: 'https://x.com/54ad0n', icon: 'Twitter' },
    { label: 'Medium', url: 'https://medium.com/@donald-kimtai', icon: 'BookOpen' },
    { label: 'TryHackMe', url: 'https://tryhackme.com/p/54ad0n', icon: 'Shield' },
  ],
}

export const fallbackSkills: Skill[] = [
  {
    category: 'Offensive Security',
    items: [
      'Web Application Pentesting',
      'API Security Research',
      'Bug Bounty Hunting',
      'OWASP Top 10',
      'Burp Suite',
      'OWASP ZAP',
    ],
    order: 1,
  },
  {
    category: 'Defensive & Forensics',
    items: [
      'Digital Forensics',
      'Incident Response',
      'Vulnerability Management',
      'Firewall Administration',
      'Wireshark',
      'Nmap',
      'Shodan',
    ],
    order: 2,
  },
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'C#', 'Bash'],
    order: 3,
  },
  {
    category: 'Cloud & Platforms',
    items: ['Microsoft Azure', 'GitHub', 'Linux', 'Docker'],
    order: 4,
  },
  {
    category: 'Frameworks',
    items: ['.NET', 'Flask', 'React', 'Node.js'],
    order: 5,
  },
  {
    category: 'Compliance',
    items: ['ISO 27001', 'NIST CSF', 'GDPR'],
    order: 6,
  },
]

export const fallbackExperience: ExperienceEntry[] = [
  {
    role: 'Coding & Robotics Trainer',
    company: 'KEMSAP ALOHA',
    location: 'Nairobi, Kenya',
    startDate: '2025-01',
    current: true,
    bullets: [
      'Designed coding lessons and robotics workshops for 100+ students.',
      'Created training modules on application development and security.',
      'Conducted cybersecurity awareness training for staff and students.',
    ],
  },
  {
    role: 'IT / Security Intern',
    company: 'The Judiciary of Kenya',
    location: 'Kenya',
    startDate: '2024-05',
    endDate: '2024-07',
    bullets: [
      'Monitored network performance and resolved vulnerabilities.',
      'Provided technical support for 20+ staff members.',
    ],
  },
  {
    role: 'IT Intern',
    company: 'County Government',
    location: 'Kenya',
    startDate: '2023-05',
    endDate: '2023-07',
    bullets: [
      'Reduced system downtime through proactive monitoring.',
      'Configured firewalls and hardened internal services.',
    ],
  },
]

export const fallbackEducation: EducationEntry[] = [
  {
    degree: 'B.Sc. in Computer Security and Forensics',
    institution: 'Meru University of Science and Technology',
    startDate: '2020-11',
    endDate: '2024-10',
    description:
      'Coursework in cybersecurity, application development, network security, and digital forensics.',
  },
  {
    degree: 'Kenya Certificate of Secondary Education',
    institution: "St. Joseph's Boys High School",
    startDate: '2016-01',
    endDate: '2019-11',
    description: 'Strong foundation in science and technology subjects.',
  },
]

export const fallbackCertifications: CertificationEntry[] = [
  {
    name: 'Certified in Cybersecurity (CC)',
    issuer: 'ISC2',
    issueDate: '2024-05',
    url: 'https://www.credly.com/badges/2635c405-9741-493b-80c9-ff976d0db4f3/public_url',
  },
  {
    name: 'Security, Compliance, and Identity Fundamentals (SC-900)',
    issuer: 'Microsoft',
    issueDate: '2024-06',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/DonaldKimtai-1103/F6706499C48B5C39?sharingId=4F81F56C9091B3C5',
  },
  { name: 'Python Essentials 1', issuer: 'Cisco', issueDate: '2024-06' },
  { name: 'Executive Diploma in Leadership', issuer: 'Udemy', issueDate: '2024-04' },
]

export const fallbackProjects: Project[] = [
  {
    title: 'Fibonacci-Based File Encryption System',
    slug: 'fibonacci-encryption',
    excerpt: 'Flask web app that encrypts uploaded files using Fibonacci-generated keys and ChaCha encryption.',
    description:
      'A Flask-based web app that uses the Fibonacci sequence and ChaCha20 to securely encrypt and decrypt user files, with registration, key storage, and audit logging.',
    tags: ['Encryption', 'Flask', 'Cybersecurity'],
    technologies: ['Python', 'Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
    featured: true,
    date: '2024-04-28',
  },
  {
    title: 'GitHub Secret Scraper',
    slug: 'github-secret-scraper',
    excerpt: 'Python tool that scans public GitHub repositories for leaked secrets like API keys and tokens.',
    description:
      'A Python script using regex and the GitHub API to identify exposed API keys, passwords, and tokens in public repositories. Logs findings, alerts on critical leaks, and categorizes severity.',
    tags: ['Python', 'Security Automation', 'GitHub'],
    technologies: ['Python', 'GitHub API', 'Regex'],
    featured: true,
    date: '2024-05-10',
    repoUrl: 'https://github.com/donaldkimtai',
  },
  {
    title: 'Web Application Security Lab — TryHackMe',
    slug: 'tryhackme-web-security-lab',
    excerpt: 'Hands-on practice with SQLi, XSS, command injection, and broken session management.',
    description:
      'Completed an interactive lab covering SQL injection, XSS, command injection, and session flaws. Used Burp Suite and bWAPP to identify and mitigate OWASP Top 10 vulnerabilities.',
    tags: ['Web Security', 'TryHackMe', 'OWASP'],
    technologies: ['Burp Suite', 'bWAPP', 'OWASP Top 10'],
    featured: true,
    date: '2024-06-01',
    liveUrl: 'https://tryhackme.com/p/54ad0n',
  },
  {
    title: 'Coding & Robotics Curriculum',
    slug: 'coding-robotics-curriculum',
    excerpt: '12-week Python and robotics program aligned to Kenya\u2019s CBC STEM goals.',
    description:
      'Developed a 12-week coding program adopted by schools, focusing on Python fundamentals and robotics with Arduino and Raspberry Pi. Curriculum designer and workshop facilitator.',
    tags: ['Education', 'Robotics', 'Python'],
    technologies: ['Python', 'Arduino', 'Raspberry Pi'],
    date: '2025-01-01',
  },
]

export const fallbackPosts: Post[] = [
  {
    title: 'Welcome to my new portfolio',
    slug: 'welcome',
    excerpt:
      'A quick note on why I rebuilt this site from the ground up — and what kind of writing you can expect here.',
    publishedAt: new Date().toISOString(),
    readingMinutes: 2,
    tags: ['meta'],
    featured: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Hi, I'm Donald. This is the new home for my notes on web/API security, bug-bounty learnings, OWASP work, and cloud hardening. Posts will land here once the Sanity Studio is wired up.",
          },
        ],
      },
    ],
  },
]
