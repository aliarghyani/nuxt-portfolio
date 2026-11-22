<template>
  <StarsBackground>
    <div class="mx-auto max-w-6xl pt-20">
      <Hero />

      <!-- Below-the-fold sections rendered on server for SEO (SSR) -->
      <Services />
      <ProjectsList />
      <WorkExperience />
      <Skills />
      <ReactExpansion />
      <AIStack />
      <MentorshipSection />
      <GitHubActivity username="aliarghyani" />
      <SoftSkills />
      <LanguageSkills />
      <EducationList />
      <RecommendationsCarousel />
      <HireCTA />
    </div>
  </StarsBackground>
</template>

<script setup lang="ts">
definePageMeta({ key: "home" });
import { defineAsyncComponent } from "vue";
import Hero from "@/components/portfolio/Hero.vue";
import StarsBackground from "@/components/backgrounds/StarsBackground.vue";
import { usePortfolio } from "@/composables/usePortfolio";

const Services = defineAsyncComponent(
  () => import("@/components/portfolio/Services.vue"),
);
const MentorshipSection = defineAsyncComponent(
  () => import("@/components/portfolio/MentorshipSection.vue"),
);
const Skills = defineAsyncComponent(
  () => import("@/components/portfolio/Skills.vue"),
);
const ReactExpansion = defineAsyncComponent(
  () => import("@/components/portfolio/ReactExpansion.vue"),
);
const ProjectsList = defineAsyncComponent(
  () => import("@/components/portfolio/ProjectsList.vue"),
);
const WorkExperience = defineAsyncComponent(
  () => import("@/components/portfolio/WorkExperience.vue"),
);
const GitHubActivity = defineAsyncComponent(
  () => import("@/components/portfolio/GitHubActivity.vue"),
);
const AIStack = defineAsyncComponent(
  () => import("@/components/portfolio/AIStack.vue"),
);
const SoftSkills = defineAsyncComponent(
  () => import("@/components/portfolio/SoftSkills.vue"),
);
const LanguageSkills = defineAsyncComponent(
  () => import("@/components/portfolio/LanguageSkills.vue"),
);
const EducationList = defineAsyncComponent(
  () => import("@/components/portfolio/EducationList.vue"),
);
const RecommendationsCarousel = defineAsyncComponent(
  () => import("@/components/portfolio/RecommendationsCarousel.vue"),
);
const HireCTA = defineAsyncComponent(
  () => import("@/components/portfolio/HireCTA.vue"),
);

const portfolio = usePortfolio();
const { t, locale } = useI18n();

const siteTitle = computed(
  () => `${portfolio.value.profile.name} - ${t("meta.portfolioTitleSuffix")}`,
);
const description = computed(
  () =>
    portfolio.value.profile.seoDescription || portfolio.value.profile.summary,
);
const { absoluteUrl, languageLinks, personId } = usePortfolioSeo();
const localePath = useLocalePath();
const canonicalUrl = computed(() => absoluteUrl(localePath("/")));
const ogImageUrl = absoluteUrl("/img/portfolio-og.png");

useHead(() => ({
  title: siteTitle.value,
  link: [
    { rel: "icon", type: "image/png", href: "/favicon/newlogo.png" },
    { rel: "canonical", href: canonicalUrl.value },
    ...languageLinks({ en: "/", fa: "/fa" }),
  ],
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${canonicalUrl.value}#profile`,
        url: canonicalUrl.value,
        inLanguage: locale.value === "fa" ? "fa-IR" : "en-US",
        mainEntity: {
          "@type": "Person",
          "@id": personId,
          name: portfolio.value.profile.name,
          jobTitle: portfolio.value.profile.title,
          description: portfolio.value.profile.summary,
          url: absoluteUrl("/"),
          image: absoluteUrl(
            portfolio.value.profile.avatar || "/img/AliProfile.webp",
          ),
          sameAs: [
            portfolio.value.profile.socials?.github,
            portfolio.value.profile.socials?.linkedin,
          ].filter(Boolean),
        },
      }).replace(/</g, "\\u003c"),
    },
  ],
}));

useSeoMeta({
  title: () => siteTitle.value,
  description: () => description.value,
  ogTitle: () => siteTitle.value,
  ogDescription: () => description.value,
  ogUrl: () => canonicalUrl.value,
  ogType: "website",
  ogLocale: () => (locale.value === "fa" ? "fa_IR" : "en_US"),
  ogImage: ogImageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t("meta.portfolioImageAlt"),
  twitterCard: "summary_large_image",
  twitterTitle: () => siteTitle.value,
  twitterDescription: () => description.value,
  twitterImage: ogImageUrl,
});
</script>
