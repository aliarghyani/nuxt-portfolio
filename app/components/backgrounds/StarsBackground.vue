<script setup lang="ts">
// Adapted for the portfolio from Inspira UI's layered Stars Background.
import type { SpringOptions } from "motion-v";
import { usePreferredReducedMotion } from "@vueuse/core";
import { motion, useMotionValue, useSpring } from "motion-v";

interface StarsBackgroundProps {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
}

const props = withDefaults(defineProps<StarsBackgroundProps>(), {
  factor: 0.025,
  speed: 70,
  transition: () => ({ stiffness: 50, damping: 20 }),
});

const colorMode = useColorMode();
const reducedMotion = usePreferredReducedMotion();
const offsetX = useMotionValue(0);
const offsetY = useMotionValue(0);
const springX = useSpring(offsetX, props.transition);
const springY = useSpring(offsetY, props.transition);

const boxShadow1 = ref("");
const boxShadow2 = ref("");
const boxShadow3 = ref("");
const resolvedStarColor = computed(
  () =>
    props.starColor ??
    (colorMode.value === "dark"
      ? "rgb(255 255 255 / 0.62)"
      : "rgb(109 40 217 / 0.3)"),
);

function generateStars(count: number) {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    return `${x}px ${y}px ${resolvedStarColor.value}`;
  }).join(", ");
}

function generateStarLayers() {
  boxShadow1.value = generateStars(700);
  boxShadow2.value = generateStars(280);
  boxShadow3.value = generateStars(100);
}

function handlePointerMove(event: PointerEvent) {
  if (reducedMotion.value === "reduce" || event.pointerType === "touch") return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  offsetX.set(-(event.clientX - centerX) * props.factor);
  offsetY.set(-(event.clientY - centerY) * props.factor);
}

const layerTransitions = computed(() =>
  reducedMotion.value === "reduce"
    ? undefined
    : [1, 2, 3].map((multiplier) => ({
        repeat: Infinity,
        duration: props.speed * multiplier,
        ease: "linear" as const,
      })),
);

onMounted(generateStarLayers);
watch(resolvedStarColor, generateStarLayers);
</script>

<template>
  <div
    class="portfolio-stars relative isolate min-h-screen"
    data-stars-background
    @pointermove="handlePointerMove"
  >
    <div
      class="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0"
        :class="
          colorMode.value === 'dark' ? 'stars-glow-dark' : 'stars-glow-light'
        "
      />

      <motion.div class="absolute inset-0" :style="{ x: springX, y: springY }">
        <motion.div
          v-for="(shadow, index) in [boxShadow1, boxShadow2, boxShadow3]"
          :key="index"
          class="absolute start-1/2 top-0 h-[2000px] w-px"
          :animate="reducedMotion === 'reduce' ? undefined : { y: [0, -2000] }"
          :transition="layerTransitions?.[index]"
        >
          <span
            v-for="copy in 2"
            :key="copy"
            class="absolute start-0 rounded-full bg-transparent"
            :class="[copy === 2 && 'top-[2000px]']"
            :style="{
              width: `${index + 1}px`,
              height: `${index + 1}px`,
              boxShadow: shadow,
            }"
          />
        </motion.div>
      </motion.div>
    </div>

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.stars-glow-light {
  background:
    radial-gradient(
      circle at 16% 12%,
      rgb(124 58 237 / 0.1),
      transparent 32rem
    ),
    radial-gradient(circle at 84% 42%, rgb(37 99 235 / 0.08), transparent 38rem);
}

.stars-glow-dark {
  background:
    radial-gradient(
      circle at 16% 12%,
      rgb(124 58 237 / 0.14),
      transparent 34rem
    ),
    radial-gradient(circle at 84% 42%, rgb(37 99 235 / 0.1), transparent 40rem);
}

@media print {
  [aria-hidden="true"] {
    display: none;
  }
}
</style>
