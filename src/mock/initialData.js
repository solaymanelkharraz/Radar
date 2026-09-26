export const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    companyName: "Ministère de la Transition Numérique",
    jobTitle: "Ingénieur d'État en Informatique",
    source: "Emploi-Public",
    priority: "High",
    linkToApply: "https://www.emploi-public.ma",
    responseUrl: "https://www.emploi-public.ma/fr/resultats",
    deadlineDate: "2026-10-15",
    isApplied: false,
    requirements: "• Demande manuscrite adressée au Ministre\n• Copie légalisée de la CIN\n• Copie certifiée du diplôme d'ingénieur\n• CV détaillé",
    notes: "Concours national d'ingénieur d'État.",
    createdAt: Date.now() - 100000
  },
  {
    id: "app-2",
    companyName: "Capgemini Engineering",
    jobTitle: "Full-Stack React & Node Developer",
    source: "ReKrute",
    priority: "Medium",
    linkToApply: "https://www.rekrute.com",
    responseUrl: "https://careers.capgemini.com/morocco/my-applications",
    deadlineDate: "2026-10-05",
    isApplied: true,
    requirements: "• CV en Anglais/Français (PDF)\n• Lien Portfolio GitHub\n• Pretentions salariales",
    notes: "Candidature envoyée via le portail RH.",
    createdAt: Date.now() - 200000
  },
  {
    id: "app-3",
    companyName: "Renault Group Tanger",
    jobTitle: "Chef de Projet Système d'Information",
    source: "Spontaneous",
    priority: "High",
    linkToApply: "https://www.renault.ma/careers",
    responseUrl: "",
    deadlineDate: "2026-09-24",
    isApplied: false,
    requirements: "• CV mis à jour\n• Lettre de motivation personnalisée\n• Recommandations académiques/professionnelles",
    notes: "Postuler directement sur le site carrières de Renault TFZ.",
    createdAt: Date.now() - 300000
  },
  {
    id: "app-4",
    companyName: "ANAPEC Tanger Ville",
    jobTitle: "Consultant SI & Transformation",
    source: "Anapec",
    priority: "Low",
    linkToApply: "https://www.anapec.org",
    responseUrl: "https://www.anapec.org/mon-espace-candidat",
    deadlineDate: "2026-09-25",
    isApplied: true,
    requirements: "• Inscription au portail ANAPEC\n• Copie diplôme et attestations de travail",
    notes: "Offre archivée.",
    createdAt: Date.now() - 400000
  }
];

export const INITIAL_COMPANIES = [
  {
    id: "comp-1",
    companyName: "Renault Group Tanger",
    sector: "Automotive & Logistics",
    location: "Tanger Free Zone (TFZ)",
    hrEmail: "recrutement.tanger@renault.com",
    website: "https://www.renault.ma",
    contactStatus: "CV Sent",
    createdAt: Date.now() - 100000
  },
  {
    id: "comp-2",
    companyName: "Capgemini Engineering",
    sector: "IT & Services",
    location: "Tanger Ville / Nearshore",
    hrEmail: "jobs.morocco@capgemini.com",
    website: "https://www.capgemini.com",
    contactStatus: "CV Sent",
    createdAt: Date.now() - 200000
  },
  {
    id: "comp-3",
    companyName: "APM Terminals MedPort",
    sector: "Logistics & Maritime",
    location: "Tanger Med Port",
    hrEmail: "hr.tangermed@apmterminals.com",
    website: "https://www.apmterminals.com",
    contactStatus: "Not Contacted",
    createdAt: Date.now() - 300000
  },
  {
    id: "comp-4",
    companyName: "TMSA (Tanger Med Special Agency)",
    sector: "Government & Infrastructure",
    location: "Tanger Ville",
    hrEmail: "recrutement@tanger-med.ma",
    website: "https://www.tangermed.ma",
    contactStatus: "Not Contacted",
    createdAt: Date.now() - 400000
  }
];
