export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { isLocaleSwitching } = useLocaleSwitching();
  const defaultScrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = (to, from, savedPosition) => {
    // The language switcher restores a semantic reading position after translation.
    // Retain Nuxt's normal anchor and browser-history behavior for other navigation.
    if (isLocaleSwitching.value) return false;
    return defaultScrollBehavior?.(to, from, savedPosition) ?? false;
  };
});
