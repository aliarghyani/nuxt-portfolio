# Implementation Plan

- [x] 1. Fix ViewportLoader hydration mismatch


  - Replace v-if with v-show to maintain consistent DOM structure between SSR and client
  - Add wrapper divs for both skeleton and content that are always rendered
  - Update component to use v-show for visibility control instead of conditional rendering
  - _Requirements: 1.2, 1.5, 4.1, 4.2_




- [ ] 2. Fix Hero component image attributes
  - [ ] 2.1 Update company logo loading strategy
    - Change loading="lazy" to loading="eager" for above-the-fold image
    - Add decoding="async" attribute


    - Verify width and height attributes are present during SSR
    - _Requirements: 1.3, 5.1, 5.3_
  

  - [x] 2.2 Optimize profile avatar preload configuration


    - Add loading="eager" to NuxtImg component
    - Add fetchpriority="high" for LCP optimization
    - Ensure preload directive matches rendered image URL


    - _Requirements: 3.1, 3.4, 5.2_

- [ ] 3. Match skeleton dimensions to actual content
  - [ ] 3.1 Measure and document actual content heights
    - Record heights for Skills, WorkExperience, Education, Recommendations sections
    - Document padding and margin values


    - _Requirements: 2.3, 2.5_
  

  - [x] 3.2 Update skeleton components with min-height constraints


    - Add min-height CSS to SkillsSkeleton
    - Add min-height CSS to WorkExperienceSkeleton
    - Add min-height CSS to EducationListSkeleton


    - Add min-height CSS to RecommendationsCarouselSkeleton
    - Ensure all skeleton elements have explicit min-width and min-height
    - _Requirements: 2.3, 2.5, 4.5, 5.5_

  
  - [ ] 3.3 Verify skeleton-to-content transitions
    - Test that dimensions match between skeleton and loaded content
    - Ensure no layout shift occurs during transition
    - _Requirements: 2.3, 2.4, 4.3_





- [ ] 4. Remove or fix unused preload resources
  - [ ] 4.1 Audit current preload directives
    - Identify which images are preloaded
    - Check if preloaded URLs match rendered image sources

    - _Requirements: 3.2, 3.4_
  
  - [ ] 4.2 Fix or remove profile image preloads
    - Ensure NuxtImg preload URL matches the actual rendered source
    - Remove preload if image is not used within 3 seconds

    - Add appropriate "as" attribute to preload links
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5. Add accessibility attributes to ViewportLoader
  - Add aria-busy="true" to skeleton wrapper
  - Add aria-live="polite" to both skeleton and content wrappers
  - Add aria-label="Loading content" to skeleton wrapper
  - _Requirements: 4.3, 4.4_

- [ ] 6. Verify hydration and CLS fixes
  - [ ] 6.1 Test hydration in production build
    - Run npm run build && npm run preview
    - Check console for hydration warnings
    - Verify zero hydration mismatch errors
    - _Requirements: 1.5, 4.2_
  
  - [ ] 6.2 Measure CLS score
    - Use Chrome DevTools Performance tab
    - Record page load and check CLS value
    - Verify CLS is below 0.1
    - _Requirements: 2.1, 2.4_
  
  - [ ] 6.3 Check for unused preload warnings
    - Wait 5 seconds after page load
    - Verify no "preloaded but not used" warnings in console
    - _Requirements: 3.1, 3.2_

- [ ]* 7. Add automated tests
  - [ ]* 7.1 Create hydration test
    - Write Playwright test to detect hydration errors
    - Verify zero console errors/warnings related to hydration
    - _Requirements: 1.4, 1.5_
  
  - [ ]* 7.2 Create CLS measurement test
    - Write Playwright test to measure CLS during page load
    - Assert CLS value is below 0.1
    - _Requirements: 2.1_
  
  - [ ]* 7.3 Create skeleton dimension matching test
    - Capture skeleton and content bounding boxes
    - Verify dimensions match within 5% tolerance
    - _Requirements: 2.3, 4.5_
  
  - [ ]* 7.4 Create preload resource test
    - Monitor console for unused preload warnings
    - Assert zero unused preload resources
    - _Requirements: 3.1, 3.2_

- [ ]* 8. Add performance monitoring
  - [ ]* 8.1 Implement CLS tracking in performance plugin
    - Add PerformanceObserver for layout-shift entries
    - Log CLS values exceeding 0.1
    - _Requirements: 2.1_
  
  - [ ]* 8.2 Add hydration error detection
    - Intercept console.error for hydration messages
    - Report hydration errors to monitoring service
    - _Requirements: 1.4_
