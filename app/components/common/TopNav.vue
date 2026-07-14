<template>
  <nav
    class="fixed inset-x-0 top-0 z-50 pointer-events-auto transition-transform duration-300"
    data-section-header
  >
    <div class="mx-auto max-w-6xl px-4 pt-2">
      <div
        class="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 shadow-md rounded-2xl border border-white/30 dark:border-slate-700/50 pointer-events-auto transition-all duration-300"
      >
        <div class="flex items-center justify-between px-2 py-2">
          <div
            class="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pr-2 sm:gap-2"
          >
            <UTooltip
              v-for="item in navItems"
              :key="item.value"
              :text="item.label"
            >
              <UButton
                type="button"
                variant="soft"
                class="nav-link-button shrink-0 cursor-pointer gap-1.5 px-2 transition-all duration-200 lg:px-2.5"
                :class="[item.active ? activeClass : inactiveClass]"
                :aria-label="item.label"
                @click="goTo(item.target)"
              >
                <template #leading>
                  <UIcon :name="item.icon" class="text-xl" />
                </template>
                <span class="hidden lg:inline text-sm font-medium">{{
                  item.label
                }}</span>
              </UButton>
            </UTooltip>

            <UTooltip :text="t('sections.blog')">
              <UButton
                :to="localePath('/blog')"
                variant="soft"
                class="nav-link-button shrink-0 cursor-pointer gap-1.5 px-2 transition-all duration-200 lg:px-2.5"
                :class="[isBlogActive ? activeClass : inactiveClass]"
                :aria-label="t('sections.blog')"
              >
                <template #leading>
                  <UIcon name="i-twemoji-memo" class="text-xl" />
                </template>
                <span class="hidden lg:inline text-sm font-medium">{{
                  t("sections.blog")
                }}</span>
              </UButton>
            </UTooltip>
          </div>

          <div class="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <ThemeCustomizer />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeCustomizer from "@/components/common/ThemeCustomizer.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();

const activeClass =
  "ring-1 ring-primary-400/40 bg-primary-500/15 text-primary-600 dark:text-primary-400 transform scale-105";
const inactiveClass = "text-gray-500 dark:text-gray-300 hover:text-primary-400";

const sectionIds = [
  "hero",
  "mentorship",
  "skills",
  "work",
  "projects",
] as const;
type Target = (typeof sectionIds)[number];

const isHome = computed(() => route.path === localePath("/"));
const isBlogActive = computed(() => route.path.includes("/blog"));

// Active section tracking (client-side only)
const activeSection = ref<Target | null>(null);
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;

  // Only setup intersection observer on homepage
  if (!isHome.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as Target;
          if (sectionIds.includes(id)) {
            activeSection.value = id;
          }
        }
      });
    },
    {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    },
  );

  // Observe all sections
  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});

const isActive = (id: Target) => {
  // During SSR or before mount, no section is active
  if (!isMounted.value) return false;
  return activeSection.value === id;
};

const navItems = computed(() => [
  {
    value: "hero",
    target: "hero" as Target,
    label: t("nav.home"),
    icon: "i-twemoji-house",
    active: isActive("hero"),
  },
  {
    value: "mentorship",
    target: "mentorship" as Target,
    label: t("nav.mentorship"),
    icon: "i-mdi-account-supervisor-outline",
    active: isActive("mentorship"),
  },
  {
    value: "skills",
    target: "skills" as Target,
    label: t("sections.skills"),
    icon: "i-twemoji-hammer-and-wrench",
    active: isActive("skills"),
  },
  {
    value: "work",
    target: "work" as Target,
    label: t("sections.work"),
    icon: "i-twemoji-briefcase",
    active: isActive("work"),
  },
  {
    value: "projects",
    target: "projects" as Target,
    label: t("sections.projects"),
    icon: "i-twemoji-rocket",
    active: isActive("projects"),
  },
]);

function scrollToSection(id: Target) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

async function goTo(id: Target) {
  const homePath = localePath("/");
  if (route.path !== homePath) {
    await router.push(homePath);
    await nextTick();
    // Wait for next frame to ensure DOM is ready
    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => scrollToSection(id));
    } else {
      scrollToSection(id);
    }
  } else {
    scrollToSection(id);
  }
}
</script>
