export const handleOpenGmail = (hrEmail, subject, body, companyName = '') => {
  if (!hrEmail) {
    alert("No HR email saved for this company.");
    return;
  }
  const safeSubject = subject || "Application: Full-Stack Developer Position";
  const defaultBody = `Hello,

I am writing to express my interest in a Full-Stack Developer position at ${companyName || 'your company'}.

Passionate about building modern, scalable, and high-performance web applications, I would welcome the opportunity to present my background and technical capabilities.

Please find my resume attached to this email.

I remain available at your earliest convenience for an interview.

Best regards,`;

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
