// ============================================================
// CLIENT CONFIG — Dunn Development
// ============================================================

export const config = {
  business: {
    name: "Dunn Development",
    legalName: "Dunn Development, LLC",
    tagline: "South Florida's Commercial Construction Experts",
    description:
      "Full-service commercial construction firm specializing in construction management, ground-up builds, interior fit-outs, and project turnarounds across Florida. 100+ projects delivered since 2014.",
    phone: "(954) 589-6566",
    email: "info@dunndevelopment.net",
    address: {
      street: "10300 SW 72nd St, Suite 445",
      city: "Miami",
      state: "FL",
      zip: "33173",
    },
    licenses: {
      florida: {
        number: "CGC",
        verifyUrl: "https://www.myfloridalicense.com/wl11.asp",
        label: "Florida CGC License",
      },
      louisiana: {
        number: "LA",
        verifyUrl: "https://lslbc.louisiana.gov/contractor-search/",
        label: "Louisiana Contractor License",
      },
    },
    founded: 2014,
    industry: "GeneralContractor",
    mission: ["CONCEPTUALIZE", "PERFECT", "DEVELOP", "MAINTAIN"],
  },

  branding: {
    primaryColor: "#DC2626",  // red-600
    accentColor: "#111827",   // gray-900
  },

  stats: [
    { value: "100+", label: "Projects Completed" },
    { value: "1,000+", label: "Jobs Created" },
    { value: "12+", label: "Years in Business" },
    { value: "2", label: "States Licensed" },
  ],

  clients: [
    "Southwest Airlines",
    "TKE",
    "Schindler",
    "OEC",
    "LATAM Cargo",
    "DHL",
    "CBRE",
    "TSA",
    "Parsons",
    "TAGB",
    "FISK Electric",
    "Wolfberg Alvarez & Partners",
    "JBT",
    "emcore",
    "ARCO Murray",
  ],

  services: [
    {
      slug: "turn-key-builds",
      name: "Turn Key Builds",
      icon: "🔑",
      description:
        "We take a project from conception to completion, entirely. Healthcare facilities, correctional institutions, stadiums, arenas, office buildings, and metro stations. One contract, one team, delivered.",
      featured: true,
    },
    {
      slug: "ground-up-construction",
      name: "Ground Up Construction",
      icon: "🏗️",
      description:
        "Implementing designs created by independent architects using prepared construction documents. Our portfolio spans 3,000+ residential units, hotels, resorts, educational facilities, healthcare, shopping centers, and airport infrastructure.",
      featured: true,
    },
    {
      slug: "interior-fit-outs",
      name: "Interior Fit-Outs",
      icon: "🏢",
      description:
        "Commercial tenant spaces completed after leasing: offices, restaurants, supermarkets, healthcare clinics, and retail establishments. Advanced building materials and skilled craftspeople on every project.",
      featured: true,
    },
    {
      slug: "site-improvements",
      name: "Site Improvements",
      icon: "🚧",
      description:
        "Full land modification for commercial properties: underground utilities, excavation, parking infrastructure, lighting, landscaping, hardscaping, and travel ways, all aligned to zoning requirements.",
      featured: false,
    },
    {
      slug: "remodels-renovations",
      name: "Remodels & Renovations",
      icon: "🔨",
      description:
        "Transforming outdated commercial and industrial buildings with energy audits, eco-friendly materials, and custom design updates, without blowing the budget.",
      featured: false,
    },
    {
      slug: "project-takeover",
      name: "Project Takeover",
      icon: "🚑",
      description:
        "When a project goes sideways, we step in. Site assessment, material inventory, plan review, and subcontractor evaluation to resolve complications and get your project to completion.",
      featured: false,
    },
  ],

  portfolio: [
    {
      category: "Airport",
      client: "Ft. Lauderdale International Airport",
      scope: "Terminal enhancements & infrastructure upgrades",
      location: "Fort Lauderdale, FL",
      badge: "Airport / Aviation",
    },
    {
      category: "Airport",
      client: "Miami International Airport",
      scope: "Concourse enhancements & tenant improvements",
      location: "Miami, FL",
      badge: "Airport / Aviation",
    },
    {
      category: "Commercial & Office",
      client: "Southwest Airlines",
      scope: "Commercial office fit-out",
      location: "South Florida",
      badge: "Commercial & Office",
    },
    {
      category: "Commercial & Office",
      client: "DHL",
      scope: "Logistics facility build-out",
      location: "Miami, FL",
      badge: "Commercial & Office",
    },
    {
      category: "Industrial / Biomedical",
      client: "Schindler",
      scope: "Industrial service facility & training center",
      location: "South Florida",
      badge: "Industrial / Biomedical",
    },
    {
      category: "Commercial & Office",
      client: "CBRE",
      scope: "Multi-floor commercial office renovation",
      location: "Boca Raton, FL",
      badge: "Commercial & Office",
    },
  ],

  automationServices: [
    {
      name: "Subcontractor Intake & Pre-Qualification",
      description:
        "Automated application pipeline that collects trade credentials, insurance certificates, and references, then flags expiring docs before they become a compliance problem.",
    },
    {
      name: "Bid Management & RFQ Tracking",
      description:
        "Automated RFQ distribution to your sub list, deadline reminders, and bid-leveling summaries delivered to your inbox. No more tracking bid returns in email threads.",
    },
    {
      name: "Owner Progress Reporting",
      description:
        "Weekly automated project status reports sent to owners and stakeholders. Schedule, budget variance, and open RFIs, formatted and sent without a PM writing a single email.",
    },
    {
      name: "Compliance & Insurance Monitoring",
      description:
        "Continuous monitoring of sub insurance expirations, license renewals, and OSHA certifications. Auto-alerts 60 and 30 days out, before your project is exposed.",
    },
    {
      name: "Project Kickoff Workflow",
      description:
        "Trigger a structured onboarding sequence the moment a contract executes: NTP issuance, sub setup packets, document folder creation, and schedule distribution, all automated.",
    },
    {
      name: "Change Order Pipeline",
      description:
        "Structured change event workflow from field notification to owner approval. No lost PCOs, no unlogged T&M. Every change tracked, costed, and documented automatically.",
    },
  ],

  locations: [
    "Miami",
    "Fort Lauderdale",
    "Boca Raton",
    "West Palm Beach",
    "New Orleans",
    "Baton Rouge",
  ],

  crm: {
    webhookUrl: "",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/dunn-development-inc/about/",
    facebook: "https://www.facebook.com/dunndevelopmentcorp/",
    googleMaps: "https://www.google.com/maps/place/Dunn+Development/@25.7002004,-80.3610728,17z",
  },

  credentials: [
    { label: "OSHA", sublabel: "Safety Compliant", url: "https://www.osha.gov" },
    { label: "BBB", sublabel: "Accredited Business", url: "https://www.bbb.org" },
  ],

  seo: {
    defaultTitle: "Dunn Development | Commercial Construction Management in South Florida",
    defaultDescription:
      "Full-service commercial construction firm in Miami, FL. 100+ projects delivered since 2014. Turn key builds, ground-up construction, interior fit-outs, and project turnarounds across Florida.",
    siteUrl: "https://dunndevelopment.net",
  },
} as const;
