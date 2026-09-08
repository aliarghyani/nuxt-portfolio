/**
 * PDF Download Composable
 * Handles PDF generation with preview in new tab
 */

export function useResumePdf() {
  const isGenerating = ref(false);
  const track = usePortfolioAnalytics();
  const { getPdfFilename } = useResumeData();

  // Open PDF in new tab for preview (user can download from there)
  async function openPdf() {
    if (isGenerating.value) return;

    isGenerating.value = true;
    track("Resume Download");

    try {
      const filename = getPdfFilename();
      // Opens PDF in browser's built-in viewer
      window.open(
        `/api/resume/pdf?filename=${encodeURIComponent(filename)}`,
        "_blank",
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      isGenerating.value = false;
    }
  }

  // Force download PDF directly
  async function downloadPdf() {
    if (isGenerating.value) return;

    isGenerating.value = true;
    track("Resume Download");

    try {
      const filename = getPdfFilename();
      // download=true forces attachment header
      window.open(
        `/api/resume/pdf?filename=${encodeURIComponent(filename)}&download=true`,
        "_blank",
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      isGenerating.value = false;
    }
  }

  return {
    isGenerating,
    openPdf,
    downloadPdf,
  };
}
