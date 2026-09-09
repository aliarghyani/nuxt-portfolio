import { resumeData as english } from "~/data/resume.en";
import { resumeData as persian } from "~/data/resume.fa";
import { resumeFilename } from "~~/shared/utils/resume";

export function useResumeData() {
  const { locale, t } = useI18n();
  const language = computed(() => (locale.value === "fa" ? "fa" : "en"));
  const resume = computed(() => (language.value === "fa" ? persian : english));
  function formatDate(date: string, targetLocale = language.value): string {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(date)) return date;
    const [year, month] = date.split("-").map(Number);
    return new Intl.DateTimeFormat(
      targetLocale === "fa" ? "fa-IR-u-ca-gregory" : "en-US",
      {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      },
    ).format(new Date(Date.UTC(year!, month! - 1, 1)));
  }
  function formatDateRange(start: string, end?: string): string {
    return `${formatDate(start)} – ${end ? formatDate(end) : t("resume.present")}`;
  }
  return {
    resume,
    language,
    formatDate,
    formatDateRange,
    getFullName: () => resume.value.basics.name,
    getPdfFilename: () => resumeFilename(language.value),
  };
}
