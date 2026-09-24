// Local dev: change the fallback string below to switch themes.
// CI/CD:     set ACTIVE_THEME in GitHub repo Settings → Variables → Actions.
const VALID_THEMES = ['architect','editorial','brutalist','luxury','cloudalgo','noir','blueprint','broadsheet','executive'] as const
export type Theme = typeof VALID_THEMES[number]

const envTheme = import.meta.env.ACTIVE_THEME as string | undefined
export const ACTIVE_THEME: Theme =
  (VALID_THEMES as readonly string[]).includes(envTheme ?? '')
    ? (envTheme as Theme)
    : 'architect' // ← default theme

export const PERSON = {
  name: 'Sandeep Kumar',
  title: 'Salesforce & Heroku Architect | Full Stack Developer',
  email: 'sandeepkhoj@gmail.com',
  phone: '+91 9261231405',
  location: 'Jaipur, Rajasthan, India',
  linkedin: 'linkedin.com/in/xenotime',
  linkedinUrl: 'https://linkedin.com/in/xenotime',
  github: 'github.com/xenotime-india',
  githubUrl: 'https://github.com/xenotime-india',
  summary:
    'Salesforce and Heroku architect with 16+ years of enterprise delivery and a decade on the Salesforce platform. Co-founder of CloudAlgo, where I have scoped, architected and shipped 70+ projects for clients in pharma, retail, recreation and enterprise software. I take an engagement from a rough brief to a running system: data model, integrations, Lightning UI, Heroku services, CI/CD, and the code review that keeps it maintainable after I hand it over.',
} as const

export const CERTIFICATIONS = [
  'Salesforce Certified Administrator',
  'Salesforce Certified Platform App Builder',
  'Salesforce Certified Platform Developer I',
  'Salesforce Certified Platform Developer II',
  'Salesforce Certified Sales Cloud Consultant',
  'Salesforce Certified Service Cloud Consultant',
  'Salesforce Certified Sharing and Visibility Designer',
  'Salesforce Certified Integration Architecture Designer',
  'OCP, Java SE Programmer',
  'DOEACC A Level',
] as const

export const HOBBIES =
  'I keep current by reading platform release notes and building small things with new tooling before a client needs it. Off the keyboard: tabletop gaming, video games and travel.'
