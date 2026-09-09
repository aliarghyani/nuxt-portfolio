type ReadingPosition = {
  sectionId: string | null;
  fraction: number;
  pageFraction: number;
  atTop: boolean;
};

// This state is intentionally client-local. Nuxt route payloads can refresh
// useState values during navigation, which would erase the captured position.
const isLocaleSwitching = shallowRef(false);
let position: ReadingPosition | null = null;

export function useLocaleSwitching() {
  const readingLine = 96;
  function begin() {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section[id], .resume-content section[id]",
      ),
    );
    const section =
      sections.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      }) ?? sections.find((el) => el.getBoundingClientRect().top > readingLine);
    const rect = section?.getBoundingClientRect();
    position = {
      sectionId: section?.id ?? null,
      fraction: rect
        ? Math.max(0, (readingLine - rect.top) / Math.max(1, rect.height))
        : 0,
      pageFraction:
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight),
      atTop: scrollY < 20,
    };
    isLocaleSwitching.value = true;
    document.documentElement.classList.add("locale-switching");
  }
  function end() {
    isLocaleSwitching.value = false;
    position = null;
    document.documentElement.classList.remove("locale-switching");
  }
  async function restore(preserve = true) {
    const saved = position;
    await nextTick();
    // Wait for locale fonts, but a failed external font must not lock navigation.
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
    if (!saved) return;
    let interrupted = false;
    const stop = () => {
      interrupted = true;
    };
    const stopOnKey = (event: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        stop();
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stopOnKey);
    try {
      let previous = -1;
      let stable = 0;
      const deadline = performance.now() + 1500;
      while (!interrupted && performance.now() < deadline) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        const section = saved.sectionId
          ? document.getElementById(saved.sectionId)
          : null;
        let top = 0;
        if (preserve && !saved.atTop) {
          top = section
            ? scrollY +
              section.getBoundingClientRect().top +
              saved.fraction * section.getBoundingClientRect().height -
              readingLine
            : saved.pageFraction *
              (document.documentElement.scrollHeight - innerHeight);
        }
        top = Math.max(
          0,
          Math.min(top, document.documentElement.scrollHeight - innerHeight),
        );
        window.scrollTo({ top, behavior: "instant" });
        stable = Math.abs(top - previous) < 1 ? stable + 1 : 0;
        previous = top;
        if (stable >= 8) break;
      }
    } finally {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stopOnKey);
    }
  }
  return { isLocaleSwitching, begin, restore, end };
}
