/**
 * Formats and sanitizes Moroccan phone numbers for WhatsApp API.
 * Rules:
 * - Strip spaces, dashes, parentheses, dots, and leading '+'
 * - Convert leading '0' (e.g. 0612345678 or 0712345678) to '212612345678' / '212712345678'
 */
export function sanitizeMoroccanPhone(phone) {
  if (!phone) return null;
  // Strip spaces, dashes, parentheses, dots, and leading +
  let cleaned = phone.toString().replace(/[\s\-\(\)\.\+]/g, '');
  if (!cleaned) return null;

  // Convert leading 0 to 212
  if (cleaned.startsWith('0')) {
    cleaned = '212' + cleaned.slice(1);
  }

  return cleaned;
}

/**
 * Generates direct WhatsApp URL with pre-filled candidate message
 */
/**
 * Generates direct WhatsApp URL with pre-filled candidate message
 */
export function getWhatsAppUrl(phone, customMessage) {
  const cleanPhone = sanitizeMoroccanPhone(phone);
  if (!cleanPhone) return null;
  const defaultMsg = "Hello, I am reaching out regarding my application for the Full-Stack Developer position.";
  const encodedMessage = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Calculates timestamp for upcoming Tuesday at 09:30:00 AM local time.
 * - Today is Tuesday before 09:30 AM -> lock to today 09:30 AM.
 * - Today is Tuesday after 09:30 AM -> lock to next week's Tuesday 09:30 AM.
 * - Any other day -> lock to immediately upcoming Tuesday 09:30 AM.
 */
export function getNextScheduledTuesday(fromDate = new Date()) {
  const date = new Date(fromDate);
  const currentDay = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ...

  const target = new Date(date);
  target.setHours(9, 30, 0, 0);

  if (currentDay === 2) {
    // Tuesday
    if (date.getTime() < target.getTime()) {
      return target;
    } else {
      target.setDate(target.getDate() + 7);
      return target;
    }
  } else {
    const daysUntilTuesday = (2 - currentDay + 7) % 7;
    target.setDate(target.getDate() + daysUntilTuesday);
    return target;
  }
}

/**
 * Computes pipeline status badge for scheduled Tuesday send & 7-day follow-up engine
 */
export function getRelancePipelineStatus(company, now = new Date()) {
  const { scheduledFor, relanceSent } = company || {};

  if (!scheduledFor) {
    return {
      label: "To Contact",
      variant: "warning",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      rawKey: "A_CONTACTER",
    };
  }

  const scheduledDate = new Date(scheduledFor);
  const nowDate = new Date(now);

  if (nowDate.getTime() < scheduledDate.getTime()) {
    // Format date e.g. "Tue, Oct 14" in English short date format
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateStr = scheduledDate.toLocaleDateString('en-US', options);
    
    return {
      label: `Scheduled (${dateStr})`,
      variant: "neutral",
      bgColor: "bg-slate-100",
      textColor: "text-slate-700",
      borderColor: "border-slate-300",
      rawKey: "PROGRAMME",
    };
  }

  // now >= scheduledDate
  const diffInMs = nowDate.getTime() - scheduledDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (relanceSent) {
    return {
      label: "Follow-Up Sent",
      variant: "info",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-200",
      rawKey: "RELANCE_SENT",
    };
  }

  if (diffInDays >= 7) {
    return {
      label: "Follow-Up Due (Tuesday)",
      variant: "danger",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-300",
      isHighlighted: true,
      rawKey: "RELANCE_DUE",
    };
  }

  return {
    label: `Email 1 Sent (${diffInDays}d)`,
    variant: "success",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    rawKey: "EMAIL_1_SENT",
    diffInDays,
  };
}
