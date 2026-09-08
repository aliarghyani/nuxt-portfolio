const openers = new WeakMap<object, HTMLElement>();

export function useProjectContact() {
  const app = useNuxtApp();
  const isOpen = useState<boolean>("project-contact-open", () => false);
  const track = usePortfolioAnalytics();
  function open() {
    if (import.meta.client && document.activeElement instanceof HTMLElement) {
      openers.set(app, document.activeElement);
    }
    isOpen.value = true;
    track("Contact Open");
  }
  function restoreFocus(event: Event) {
    event.preventDefault();
    openers.get(app)?.focus();
    openers.delete(app);
  }
  return { isOpen, open, restoreFocus };
}
