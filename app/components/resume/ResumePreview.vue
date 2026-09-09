<script setup lang="ts">
const { resume, language } = useResumeData();
const { t } = useI18n();
</script>

<template>
  <div
    class="resume-wrapper"
    :dir="language === 'fa' ? 'rtl' : 'ltr'"
    :lang="language"
    data-resume-ready
  >
    <!-- A4 Container -->
    <div class="resume-container">
      <!-- Single-column vertical stack -->
      <div class="resume-content">
        <!-- Header with Photo + Name + Contact -->
        <ResumeHeader id="resume-header" :basics="resume.basics" />

        <!-- Summary -->
        <ResumeSummary id="resume-summary" :summary="resume.basics.summary" />

        <!-- Skills & Qualifications -->
        <ResumeAdditionalInfo id="resume-skills" :skills="resume.skills" />

        <!-- Experience -->
        <ResumeExperience id="resume-work" :work="resume.work" />

        <!-- Education -->
        <ResumeEducation id="resume-education" :education="resume.education" />

        <!-- Languages & Certifications -->
        <ResumeLanguages
          id="resume-languages"
          :languages="resume.languages"
          :certifications="resume.certificates"
        />
        <p v-if="language === 'fa'" class="text-xs text-gray-600">
          {{ t("resume.dates") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Static local fonts keep Persian shaping and text extraction reliable in Chromium PDFs. */
@font-face {
  font-family: "ResumeVazirmatn";
  src: url("/fonts/vazirmatn/webfonts/Vazirmatn-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "ResumeVazirmatn";
  src: url("/fonts/vazirmatn/webfonts/Vazirmatn-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
.resume-wrapper[lang="fa"] {
  font-family: "ResumeVazirmatn", sans-serif;
}
.resume-wrapper[lang="fa"] :deep(h1),
.resume-wrapper[lang="fa"] :deep(h2),
.resume-wrapper[lang="fa"] :deep(h3) {
  font-family: inherit;
}
.resume-content :deep(h1),
.resume-content :deep(h2),
.resume-content :deep(h3) {
  background: none !important;
  background-image: none !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  -webkit-text-fill-color: currentColor;
}

.resume-wrapper {
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  padding: 1rem 0.75rem 5rem;
  color-scheme: light;
  color: #111827;
  min-height: 100vh;
}

.resume-container {
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  width: 210mm;
  max-width: 100%;
}

.resume-content {
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 4vw, 2rem) !important;
}

@media print {
  .resume-wrapper {
    background: white !important;
    padding: 0 !important;
    display: block !important;
  }

  .resume-container {
    width: 210mm !important;
    max-width: none !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .resume-content {
    padding: 1rem !important;
  }

  * {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    hyphens: none !important;
    -webkit-hyphens: none !important;
  }

  section {
    break-inside: avoid;
  }
}
</style>
