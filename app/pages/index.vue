<template>
  <div class="mx-auto max-w-6xl pt-20">
    <Hero />

    <!-- Below-the-fold sections rendered on server for SEO (SSR) -->
    <Services />
    <MentorshipSection />
    <Skills />
    <ReactExpansion />
    <ProjectsList />
    <WorkExperience />
    <GitHubActivity username="aliarghyani" />
    <AIStack />
    <SoftSkills />
    <LanguageSkills />
    <EducationList />
    <RecommendationsCarousel />
    <HireCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ key: "home" });
import { defineAsyncComponent } from "vue";
import Hero from "@/components/portfolio/Hero.vue";
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
const description = computed(() => portfolio.value.profile.summary);
const { siteUrl, absoluteUrl, languageLinks } = usePortfolioSeo();
const localePath = useLocalePath();
const ogImageUrl = `${siteUrl}/img/portfolio-og.png`;

useHead(() => ({
  title: siteTitle.value,
  link: [
    { rel: "icon", type: "image/png", href: "/favicon/newlogo.png" },
    { rel: "canonical", href: absoluteUrl(localePath("/")) },
    ...languageLinks({ en: "/", fa: "/fa" }),
  ],
}));

useSeoMeta({
  title: () => siteTitle.value,
  description: () => description.value,
  ogTitle: () => siteTitle.value,
  ogDescription: () => description.value,
  ogUrl: () => absoluteUrl(localePath("/")),
  ogType: "website",
  ogLocale: () => (locale.value === "fa" ? "fa_IR" : "en_US"),
  ogImage: ogImageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Ali Arghyani frontend developer portfolio preview",
  twitterCard: "summary_large_image",
  twitterTitle: () => siteTitle.value,
  twitterDescription: () => description.value,
  twitterImage: ogImageUrl,
});
</script>
