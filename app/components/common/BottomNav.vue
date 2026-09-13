<template>
  <div class="fixed inset-x-0 bottom-0 z-50 pointer-events-none md:hidden">
    <div
      class="pointer-events-auto mx-auto max-w-md px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      <nav
        :aria-label="t('nav.mobileNavigation')"
        class="grid grid-cols-5 gap-1 rounded-2xl border border-white/30 bg-white/90 p-1.5 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/90"
      >
        <UButton
          v-for="item in navItems"
          :key="item.value"
          type="button"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="item.label"
          :aria-current="item.active ? item.ariaCurrent : undefined"
          :aria-controls="item.controls"
          class="min-h-14 min-w-0 cursor-pointer flex-col gap-0.5 rounded-xl px-1 py-2 text-center text-[11px] font-semibold leading-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          :class="item.active ? activeItemClass : inactiveItemClass"
          @click="item.onClick"
        >
          <template #leading>
            <UIcon :name="item.icon" class="text-xl" aria-hidden="true" />
          </template>
          <span class="block max-w-full truncate leading-tight">
            {{ item.label }}
          </span>
        </UButton>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { open: openContact } = useProjectContact();

const observedSectionIds = [
  "hero",
  "mentorship",
  "skills",
  "work",
  "projects",
  "contact",
] as const;
type ObservedSectionId = (typeof observedSectionIds)[number];
type AriaCurrent = "page" | "location";

const homePath = computed(() => localePath("/"));
const blogIndexPath = computed(() => localePath("/blog"));
const isHome = computed(() => route.path === homePath.value);
const isBlogRoute = computed(
  () =>
    route.path === blogIndexPath.value ||
    route.path.startsWith(`${blogIndexPath.value}/`),
);

const { activeSection, scrollToSection } = useSectionObserver({
  ids: [...observedSectionIds],
  enabled: isHome,
  headerSelector: "nav[data-section-header]",
});

const prefersReducedMotion = () =>
  import.meta.client &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function goHome() {
  if (!isHome.value) {
    await router.push(homePath.value);
    return;
  }
  scrollToSection("hero", prefersReducedMotion() ? "auto" : "smooth");
}

async function goSection(id: ObservedSectionId) {
  const scroll = () =>
    scrollToSection(id, prefersReducedMotion() ? "auto" : "smooth");

  if (isHome.value) {
    scroll();
    return;
  }

  await router.push(homePath.value);
  if (import.meta.client) requestAnimationFrame(scroll);
}

async function goContact() {
  await goSection("contact");

  if (!import.meta.client) return;
  requestAnimationFrame(() => {
    if (!document.getElementById("contact")) {
      openContact();
    }
  });
}

function isSectionActive(id: ObservedSectionId) {
  return isHome.value && activeSection.value === id;
}

const navItems = computed(() => [
  {
    value: "home",
    label: t("nav.home"),
    icon: "i-twemoji-house",
    active:
      isHome.value && (!activeSection.value || activeSection.value === "hero"),
    ariaCurrent: "page" as AriaCurrent,
    controls: "hero",
    onClick: goHome,
  },
  {
    value: "skills",
    label: t("nav.skills"),
    icon: "i-twemoji-hammer-and-wrench",
    active: isSectionActive("skills"),
    ariaCurrent: "location" as AriaCurrent,
    controls: "skills",
    onClick: () => goSection("skills"),
  },
  {
    value: "projects",
    label: t("sections.projects"),
    icon: "i-twemoji-rocket",
    active: isSectionActive("projects"),
    ariaCurrent: "location" as AriaCurrent,
    controls: "projects",
    onClick: () => goSection("projects"),
  },
  {
    value: "blog",
    label: t("nav.blog"),
    icon: "i-twemoji-memo",
    active: isBlogRoute.value,
    ariaCurrent: "page" as AriaCurrent,
    controls: undefined,
    onClick: () => {
      if (!isBlogRoute.value) router.push(blogIndexPath.value);
    },
  },
  {
    value: "contact",
    label: t("nav.contact"),
    icon: "i-twemoji-e-mail",
    active: isSectionActive("contact"),
    ariaCurrent: "location" as AriaCurrent,
    controls: "contact",
    onClick: goContact,
  },
]);

const activeItemClass =
  "bg-primary-500/15 text-primary-700 ring-1 ring-primary-400/40 dark:text-primary-300";
const inactiveItemClass =
  "text-slate-600 hover:bg-primary-500/10 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300";
</script>
