export function useResumePdf() {
  const isGenerating = ref(false);
  const track = usePortfolioAnalytics();
  const { t } = useI18n();
  const toast = useToast();
  const { getPdfFilename, language } = useResumeData();

  function pdfUrl(download = false) {
    const query = new URLSearchParams({
      locale: language.value,
      filename: getPdfFilename(),
    });
    if (download) query.set("download", "true");
    return `/api/resume/pdf?${query}`;
  }
  function openPdf() {
    window.open(pdfUrl(), "_blank", "noopener,noreferrer");
    track("Resume Download");
  }
  async function downloadPdf() {
    if (isGenerating.value) return;
    isGenerating.value = true;
    const filename = getPdfFilename();
    try {
      const response = await fetch(pdfUrl(true));
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/pdf")
      )
        throw new Error("PDF request failed");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      track("Resume Download");
    } catch {
      toast.add({ title: t("resume.downloadError"), color: "error" });
    } finally {
      isGenerating.value = false;
    }
  }
  return { isGenerating, openPdf, downloadPdf };
}
