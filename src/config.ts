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
    'Salesforce and Heroku architect with 16+ years of enterprise delivery and a decade on the Salesforce platform. Co-founder of CloudAlgo, where I have scoped, architected and shipped 70+ projects for non-profits, healthcare and life-sciences organisations, retailers, manufacturers and enterprise software companies. I take an engagement from a rough brief to a running system: data model, integrations, Lightning UI, Heroku services, CI/CD, and the code review that keeps it maintainable after I hand it over.',
  /* Short pitch for the sidebar / hero */
  pitch:
    'Co-founder of CloudAlgo, a Salesforce consulting partner, and the architect who still writes the code. Bring me an org that has outgrown its build, an integration nobody wants to own, or a platform that needs its first design. I scope it, build it with a small CloudAlgo team, and hand it over documented.',
  company: 'CloudAlgo',
  companyUrl: 'https://cloudalgo.com',
  companyCaseStudiesUrl: 'https://cloudalgo.com/case-studies/',
  /* Search / social preview. Title under 60 chars, description under 160. */
  seoTitle: 'Salesforce & Heroku Architect for Hire | Sandeep Kumar',
  seoDescription:
    'Freelance Salesforce and Heroku architect, CloudAlgo co-founder. 16+ years, 70+ projects: Salesforce, MuleSoft and API integrations, Airflow, AWS. Remote-first.',
  ogImage: 'og.png',
  siteUrl: 'https://xenotime-india.github.io/',
} as const

/* What clients hire me for — problem first, then what they get */
export const SERVICES = [
  {
    title: 'Fix an org that has outgrown its build',
    problem: 'Triggers fire in the wrong order, deployments break things, and nobody is sure what the last consultant left behind.',
    outcome: 'An org audit with a prioritised fix list, then the refactor: governor-limit-safe Apex, a sharing model that matches how you actually work, and CI/CD so releases stop being a gamble.',
  },
  {
    title: 'Build a new system from a brief',
    problem: 'You know the business outcome. You need someone to turn it into a data model, a UI and a release plan without a six-month discovery phase.',
    outcome: 'Discovery workshops, an architecture document you can hold me to, and a working system delivered in sprints with a demo every two weeks.',
  },
  {
    title: 'Connect Salesforce to everything else',
    problem: 'ERP, NetSuite, Office 365, an EMR, a donor platform, a legacy commerce backend. Each has its own API, and someone is re-keying data between them every day.',
    outcome: 'MuleSoft or API-led integrations that retry, log and alert, MuleSoft RPA bots for the systems that have no API at all, or a Heroku service that sits between the systems and keeps the org clean. Zero records typed in twice.',
  },
  {
    title: 'Data pipelines and cloud beyond Salesforce',
    problem: 'Reports run on yesterday\'s numbers because a nightly batch sits between your CRM and your ERP, and the warehouse nobody trusts.',
    outcome: 'Airflow pipelines and AWS data layers that bring CRM and ERP data together in minutes, not overnight. Lambda and Fargate for the compute, Cognito for identity, Postgres or S3 for storage. Medallion-style, documented, and monitored.',
  },
  {
    title: 'Products on Heroku, web and mobile',
    problem: 'Your customers or field staff need an app that talks to Salesforce, and a Lightning page will not cut it.',
    outcome: 'Node.js and React portals, React Native or native iOS apps, and Heroku services that expose exactly the Salesforce data they need. Built to App Store release, not just to demo.',
  },
  {
    title: 'Architect for your in-house team',
    problem: 'You have developers but no one setting the standards, reviewing pull requests, or making the platform decisions that are hard to undo.',
    outcome: 'A fractional architect on a monthly retainer: design reviews, pull request reviews, release oversight and mentoring so the team ships faster and safer.',
  },
] as const

/* Recent CloudAlgo engagements — anonymised, from cloudalgo.com/case-studies */
export const RECENT_WORK = [
  { client: 'Global non-profit, 180+ countries',  what: 'Next.js member platform integrated with Salesforce, unifying enrolment, donations and membership records that lived in three systems.', result: 'One record per member', stack: 'Salesforce · Next.js' },
  { client: 'Multi-division manufacturer',        what: 'Medallion data pipeline in Airflow replacing a 12 to 24 hour batch between CRM and ERP.', result: 'Under 15 min data latency', stack: 'Airflow · CRM · ERP' },
  { client: 'At-home diagnostics platform',       what: 'MuleSoft layer connecting the patient portal, Salesforce and the logistics provider so test kits are trackable end to end.', result: 'Logistics to portal in 5 min', stack: 'Salesforce · MuleSoft' },
  { client: 'Specialist wholesale distributor',   what: 'API integration between Salesforce and NetSuite so orders and invoices flow without re-keying.', result: '0 orders typed in twice', stack: 'Salesforce · NetSuite' },
  { client: 'Paediatric therapy clinic',          what: 'Heroku automation that syncs Salesforce with an EMR that has no API, ending double data entry.', result: '0 records re-entered by hand', stack: 'Salesforce · Heroku' },
] as const

/* Industries with repeat delivery, for the About strip */
export const INDUSTRIES = [
  { name: 'Non-profit',                 text: 'Membership, enrolment and donation platforms on Salesforce for organisations working across 180+ countries.' },
  { name: 'Healthcare & life sciences', text: 'Pharma intranets and patient portals, clinic and EMR integrations, diagnostics logistics. Built with the access controls health data needs.' },
  { name: 'Retail & distribution',      text: 'Commerce-connected mobile apps, Service Cloud for business customers, and order-to-invoice integration with NetSuite.' },
  { name: 'Manufacturing & enterprise', text: 'CRM-to-ERP data pipelines, Office 365 and identity integrations, and Salesforce-native products for software companies.' },
] as const

/* Organisations whose systems I have built or led. All appear in the experience and project entries below. */
export const CLIENTS = [
  'Eli Lilly',
  'Teva Pharmaceutical',
  'Logitech',
  'Lids',
  'Align Technology',
  'BMC Software',
  'Experian',
  'Traction on Demand',
  'Mesh01',
  'Aegerion Pharmaceuticals',
  'Nightingale Conant',
  'Kimberly-Clark',
  'IBM',
  'Delta Electronics',
] as const

/* How an engagement runs */
export const PROCESS = [
  { step: 'Intro call',      text: 'Thirty minutes on what you are trying to achieve and what is in the way. If CloudAlgo is not the right fit, I will say so and point you to who is.' },
  { step: 'Scope & estimate', text: 'A short discovery: I read the org, talk to the people who use it, and come back with a written scope, an estimate and the risks I can see.' },
  { step: 'Build in sprints', text: 'Two-week sprints with a working demo at the end of each. You see progress in the org, not in a status report.' },
  { step: 'Hand over',        text: 'Documentation, CI/CD, test coverage and a walkthrough for your team. A period of hypercare after go-live, then you own it.' },
] as const

/* Practical details clients ask about before the first call */
export const ENGAGEMENT = [
  { label: 'Who you contract with', text: 'Every engagement runs through CloudAlgo, a Salesforce consulting partner I co-founded. NDA, MSA and invoices are with CloudAlgo, in USD or EUR. You get me on the architecture and the code.' },
  { label: 'Team',                  text: 'Solo for audits, reviews and architecture. For builds, a small CloudAlgo team of certified Salesforce developers, plus MuleSoft and data engineers when the scope needs them. I stay on the code.' },
  { label: 'Scope',                 text: 'Salesforce and everything around it: Heroku, MuleSoft and MuleSoft RPA, Airflow, AWS (Lambda, Fargate, Cognito), Postgres, web and mobile. If the problem touches your org, it is in scope.' },
  { label: 'Location and formats',  text: 'Remote from Jaipur, India (IST, UTC+5:30) with regular overlap with US and European hours. Fixed-scope projects, monthly retainers, or a fractional architect seat beside your team or SI.' },
] as const

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
