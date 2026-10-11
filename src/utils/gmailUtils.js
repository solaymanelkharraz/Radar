export const DEFAULT_EMAIL_SUBJECT = 'Candidature Spontanée – Développeur Full-Stack (React / Laravel)';

export const DEFAULT_EMAIL_BODY = `Bonjour l’équipe [Nom de l’entreprise],

Je suis Développeur Full-Stack basé à Tanger, spécialisé dans la conception et le déploiement d’applications web modernes avec React et Laravel. Je suis particulièrement intéressé par [élément spécifique de l’entreprise : vos projets web / votre approche produit / un projet précis], et j’aimerais mettre mes compétences au service de votre équipe.

Titulaire d’un Bac+2 en Développement Digital, j’ai conçu et déployé plusieurs projets concrets :
• SmartInvoice Pro : plateforme SaaS de facturation B2B avec authentification sécurisée, génération de PDF et tableau de bord.
• POSTRESA : système de gestion de réservations et d’annonces avec frontend React et backend Laravel.
• RihlatBladna : plateforme web dédiée à la valorisation et à la découverte du tourisme local.

Technologies principales :
React · Tailwind CSS · Framer Motion · Laravel · Node.js · Express · MySQL · Firebase · Docker · Git · Vercel · Render

Je recherche actuellement une opportunité en tant que Développeur Full-Stack, en présentiel, hybride ou à distance. Vous trouverez mon CV en pièce jointe ainsi que mon portfolio ci-dessous :
Portfolio : https://solayman.vercel.app

Je serais heureux d’échanger avec vous au sujet de vos projets et de la manière dont je pourrais contribuer à votre équipe.

Cordialement,

Soulayman Elkharraz
Développeur Full-Stack
0711350766`;

export const handleOpenGmail = (hrEmail, subject, body, companyName = '') => {
  if (!hrEmail) {
    alert("No HR email saved for this company.");
    return;
  }
  const safeSubject = subject || DEFAULT_EMAIL_SUBJECT;
  let safeBody = body || DEFAULT_EMAIL_BODY;

  if (companyName) {
    safeBody = safeBody.replaceAll('[Nom de l’entreprise]', companyName);
  }

  const encodedSubject = encodeURIComponent(safeSubject);
  const encodedBody = encodeURIComponent(safeBody);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(hrEmail)}&su=${encodedSubject}&body=${encodedBody}`;
  window.open(gmailUrl, '_blank');
};

export const handleOpenGmailFollowUp = (hrEmail, companyName = '') => {
  if (!hrEmail) {
    alert("No HR email saved for this company.");
    return;
  }
  const relanceSubject = `Follow-Up: Full-Stack Developer Application`;
  const relanceBody = `Hello,

I am following up regarding the application I submitted last week for the Full-Stack Developer position at ${companyName || 'your company'}.

I remain very enthusiastic about contributing my skills to your team and would be delighted to connect for a brief chat or interview.

Please find my resume attached again for your reference.

Thank you for your time and consideration.

Best regards,`;

  const encodedSubject = encodeURIComponent(relanceSubject);
  const encodedBody = encodeURIComponent(relanceBody);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(hrEmail)}&su=${encodedSubject}&body=${encodedBody}`;
  window.open(gmailUrl, '_blank');
};

export const handleOpenGmailSearchThread = (hrEmail) => {
  if (!hrEmail) {
    alert("No HR email saved for this company.");
    return;
  }
  const searchUrl = `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(hrEmail)}`;
  window.open(searchUrl, '_blank', 'noopener,noreferrer');
};
