export const handleOpenGmail = (hrEmail, subject, body, companyName = '') => {
  if (!hrEmail) {
    alert("No HR email saved for this company.");
    return;
  }
  const safeSubject = subject || "Candidature Spontanée : Développeur Full-Stack";
  const defaultBody = `Bonjour,

Je vous adresse ma candidature spontanée pour un poste de Développeur Full-Stack au sein de ${companyName || 'votre entreprise'}.

Passionné par la conception d'applications web modernes, évolutives et performantes, je serais ravi de pouvoir vous présenter mon parcours ainsi que mes compétences techniques.

Vous trouverez mon CV ci-joint à cet email.

Je reste à votre entière disposition pour tout échange ou entretien.

Cordialement,`;

  const safeBody = body || defaultBody;
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
  const relanceSubject = `Relance : Candidature Spontanée - Développeur Full-Stack`;
  const relanceBody = `Bonjour,

Je me permets de revenir vers vous concernant ma candidature spontanée transmise la semaine dernière pour un poste de Développeur Full-Stack au sein de ${companyName || 'votre entreprise'}.

Toujours très enthousiaste à l'idée de pouvoir apporter mes compétences à votre équipe, je serais ravi d'échanger lors d'un bref entretien.

Vous trouverez mon CV ci-joint à cet email.

Je vous remercie par avance pour l'attention portée à mon message.

Cordialement,`;

  const encodedSubject = encodeURIComponent(relanceSubject);
  const encodedBody = encodeURIComponent(relanceBody);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(hrEmail)}&su=${encodedSubject}&body=${encodedBody}`;
  window.open(gmailUrl, '_blank');
};
