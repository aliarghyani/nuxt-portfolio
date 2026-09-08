type PortfolioEvent =
  | "Project Details"
  | "Contact Open"
  | "Email Open"
  | "Email Copy"
  | "Resume Download"
  | "Mentorship Inquiry";

export function usePortfolioAnalytics() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  return (event: PortfolioEvent) => {
    if (
      !import.meta.client ||
      !["true", "1"].includes(String(config.public.loadPlausible))
    )
      return;
    const plausible = (
      window as Window & {
        plausible?: (
          event: string,
          options: { props: { locale: string } },
        ) => void;
      }
    ).plausible;
    // Never send personal contact details, clipboard contents, or inquiry text.
    plausible?.(event, { props: { locale: locale.value } });
  };
}
