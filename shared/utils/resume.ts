export function resumeFilename(locale: "en" | "fa", now = new Date()): string {
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(now);
  return `Ali_Arghyani_Resume_${locale.toUpperCase()}_${month}_${now.getUTCFullYear()}.pdf`;
}
