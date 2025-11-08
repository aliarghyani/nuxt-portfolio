# Action Plan: رفع مشکل CLS

## مشکل
CLS = 1.58 (باید < 0.1 باشد) - بیش از 15 برابر حد مجاز!

## علت ریشه‌ای
استفاده از `background-position-x` در shimmer animations که:
1. روی GPU composite نمی‌شود
2. باعث layout shifts می‌شود
3. Performance بسیار ضعیفی دارد

## راه‌حل: بازنویسی Shimmer Animation

### قدم 1: آپدیت CSS در main.css

**فایل**: `app/assets/css/main.css`

```css
/* حذف کنید - Animation قدیمی */
@keyframes shimmer {
  0% {
    background-position-x: -200%;
  }
  100% {
    background-position-x: 200%;
  }
}

/* اضافه کنید - Animation جدید GPU-friendly */
@keyframes shimmer-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Base skeleton styles */
.skeleton-base {
  position: relative;
  overflow: hidden;
  background-color: rgb(var(--color-gray-200));
  border-radius: 0.5rem;
}

/* Shimmer effect با pseudo-element */
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shimmer-slide 2s ease-in-out infinite;
  will-change: transform;
  /* GPU acceleration */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Dark mode support */
.dark .skeleton-shimmer::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}
```

### قدم 2: آپدیت SkeletonLoader Component

**فایل**: `app/components/portfolio/SkeletonLoader.vue`

```vue
<template>
  <div class="skeleton-base skeleton-shimmer" :class="customClass" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  circle?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  circle: false,
  customClass: ''
})

const style = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.circle ? '50%' : undefined,
  // Reserve space to prevent layout shift
  minHeight: props.height,
  minWidth: props.width
}))
</script>
```

### قدم 3: آپدیت تمام Skeleton Components

برای هر skeleton component، اطمینان حاصل کنید که:

1. **Reserve Space**: از `min-height` استفاده کنید
2. **Aspect Ratio**: برای تصاویر از `aspect-ratio` استفاده کنید
3. **No Layout Shift**: skeleton دقیقاً به اندازه محتوای واقعی باشد

**مثال - RecommendationsCarouselSkeleton.vue**:

```vue
<template>
  <div class="recommendations-skeleton">
    <!-- Reserve exact space -->
    <div class="carousel-container" style="min-height: 400px;">
      <div v-for="i in 3" :key="i" class="recommendation-card">
        <!-- Avatar with aspect-ratio -->
        <SkeletonLoader 
          width="64px" 
          height="64px" 
          circle 
          class="mb-4"
          style="aspect-ratio: 1/1;"
        />
        
        <!-- Text lines with exact heights -->
        <SkeletonLoader width="80%" height="20px" class="mb-2" />
        <SkeletonLoader width="100%" height="16px" class="mb-2" />
        <SkeletonLoader width="90%" height="16px" />
      </div>
    </div>
  </div>
</template>
```

### قدم 4: تست و Validation

```bash
# 1. Build production
pnpm build

# 2. Preview
pnpm preview

# 3. باز کردن Chrome DevTools
# - Performance tab
# - Record
# - Reload page
# - Stop recording
# - بررسی CLS در Performance Insights
```

**معیار موفقیت**: CLS < 0.1

### قدم 5: فایل‌های نیازمند تغییر

- [ ] `app/assets/css/main.css` - بازنویسی shimmer animation
- [ ] `app/components/portfolio/SkeletonLoader.vue` - اضافه کردن min-height/width
- [ ] `app/components/portfolio/RecommendationsCarouselSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/EducationListSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/LanguageSkillsSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/SkillsSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/ProjectsListSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/WorkExperienceSkeleton.vue` - reserve space
- [ ] `app/components/portfolio/AIStackSkeleton.vue` - reserve space

## Timeline

- **Day 1**: قدم‌های 1 و 2 (CSS و SkeletonLoader)
- **Day 2**: قدم 3 (آپدیت تمام skeleton components)
- **Day 3**: قدم 4 (تست و validation)

## نکات مهم

1. **will-change**: فقط برای animations استفاده کنید
2. **transform**: همیشه GPU-friendly است
3. **min-height/min-width**: از layout shift جلوگیری می‌کند
4. **aspect-ratio**: برای تصاویر و avatars ضروری است

## بعد از رفع CLS

وقتی CLS < 0.1 شد، می‌توانیم روی موارد دیگر تمرکز کنیم:
1. بهینه‌سازی LCP render delay
2. رفع forced reflow
3. بهبود INP

## مراجع

- [Optimize CLS](https://web.dev/articles/optimize-cls)
- [CSS Triggers](https://csstriggers.com/)
- [GPU Animation](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
