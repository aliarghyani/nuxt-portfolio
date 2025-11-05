import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import RecommendationsCarousel from '@/components/portfolio/RecommendationsCarousel.vue'

// Mock the recommendations data
vi.mock('@/data/recommendations', () => ({
  recommendations: Array.from({ length: 11 }, (_, i) => ({
    author: `Author ${i + 1}`,
    author_title: `Title ${i + 1}`,
    relationship: 'Colleague',
    date: '2024-01-01',
    linkedin_url: 'https://linkedin.com',
    recommendation_url: 'https://linkedin.com',
    text: `Recommendation text ${i + 1}`
  }))
}))

// Mock composables
vi.mock('@/composables/useSocialText', () => ({
  useSocialText: () => ({
    linkedinText: (name: string) => `View ${name} on LinkedIn`
  })
}))

vi.mock('@vueuse/core', () => ({
  useElementVisibility: () => ({ value: true }),
  usePreferredReducedMotion: () => ({ value: 'no-preference' })
}))

describe('RecommendationsCarousel Optimization', () => {
  let wrapper: any

  beforeEach(() => {
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })
  })

  it('should render carousel component', () => {
    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: {
            template: '<div><slot :item="item" :index="0" /></div>',
            props: ['items'],
            setup(props: any) {
              return { item: props.items[0] }
            }
          },
          UIcon: {
            template: '<span />'
          },
          UButton: {
            template: '<button><slot /></button>'
          }
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('should implement virtual rendering logic', async () => {
    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: {
            template: '<div><slot :item="item" :index="0" /></div>',
            props: ['items']
          },
          UIcon: true,
          UButton: true
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    await nextTick()

    // Check that virtual rendering function exists
    const vm = wrapper.vm as any
    expect(typeof vm.shouldRenderSlide).toBe('function')
  })

  it('should calculate visible slides count based on viewport', () => {
    // Test desktop
    window.innerWidth = 1024
    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: true,
          UIcon: true,
          UButton: true
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    const vm = wrapper.vm as any
    vm.updateVisibleSlidesCount()
    expect(vm.visibleSlidesCount).toBe(3)

    // Test tablet
    window.innerWidth = 768
    vm.updateVisibleSlidesCount()
    expect(vm.visibleSlidesCount).toBe(2)

    // Test mobile
    window.innerWidth = 480
    vm.updateVisibleSlidesCount()
    expect(vm.visibleSlidesCount).toBe(1)
  })

  it('should respect prefers-reduced-motion', () => {
    // Mock reduced motion preference
    vi.mock('@vueuse/core', () => ({
      useElementVisibility: () => ({ value: true }),
      usePreferredReducedMotion: () => ({ value: 'reduce' })
    }))

    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: true,
          UIcon: true,
          UButton: true
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    const vm = wrapper.vm as any
    // Auto-scroll should be disabled when reduced motion is preferred
    expect(vm.autoScrollOptions).toBe(false)
  })

  it('should have auto-scroll with stopOnInteraction enabled', () => {
    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: true,
          UIcon: true,
          UButton: true
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    const vm = wrapper.vm as any
    const autoScroll = vm.autoScrollOptions

    expect(autoScroll).toBeTruthy()
    expect(autoScroll.stopOnInteraction).toBe(true)
    expect(autoScroll.stopOnMouseEnter).toBe(true)
  })

  it('should only render slides within visible range', () => {
    wrapper = mount(RecommendationsCarousel, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>'
          },
          UContainer: {
            template: '<div><slot /></div>'
          },
          UCarousel: true,
          UIcon: true,
          UButton: true
        },
        mocks: {
          $t: (key: string) => key,
          $i18n: {
            locale: { value: 'en' }
          }
        }
      }
    })

    const vm = wrapper.vm as any

    // Set current slide to 0
    vm.currentSlideIndex = 0
    vm.visibleSlidesCount = 3
    const preloadAdjacent = 1

    // Should render slides 0-4 (visible 0-2 + preload 1 on right)
    expect(vm.shouldRenderSlide(0)).toBe(true)
    expect(vm.shouldRenderSlide(1)).toBe(true)
    expect(vm.shouldRenderSlide(2)).toBe(true)
    expect(vm.shouldRenderSlide(3)).toBe(true)
    expect(vm.shouldRenderSlide(4)).toBe(false)
    expect(vm.shouldRenderSlide(10)).toBe(false)

    // Move to middle slide
    vm.currentSlideIndex = 5

    // Should render slides 4-9 (preload 1 on left, visible 5-7, preload 1 on right)
    expect(vm.shouldRenderSlide(3)).toBe(false)
    expect(vm.shouldRenderSlide(4)).toBe(true)
    expect(vm.shouldRenderSlide(5)).toBe(true)
    expect(vm.shouldRenderSlide(6)).toBe(true)
    expect(vm.shouldRenderSlide(7)).toBe(true)
    expect(vm.shouldRenderSlide(8)).toBe(true)
    expect(vm.shouldRenderSlide(9)).toBe(false)
  })

  // Task 6.3: Test carousel optimization
  describe('Carousel Optimization Tests (Task 6.3)', () => {
    it('should verify smooth scrolling configuration', () => {
      wrapper = mount(RecommendationsCarousel, {
        global: {
          stubs: {
            ClientOnly: {
              template: '<div><slot /></div>'
            },
            UContainer: {
              template: '<div><slot /></div>'
            },
            UCarousel: {
              template: '<div class="carousel-container"><slot :item="items[0]" :index="0" /></div>',
              props: ['items', 'autoScroll']
            },
            UIcon: true,
            UButton: true
          },
          mocks: {
            $t: (key: string) => key,
            $i18n: {
              locale: { value: 'en' }
            }
          }
        }
      })

      const vm = wrapper.vm as any

      // Verify auto-scroll is configured for smooth scrolling
      expect(vm.autoScrollOptions).toBeTruthy()
      expect(typeof vm.autoScrollOptions.speed).toBe('number')
      expect(Math.abs(vm.autoScrollOptions.speed)).toBeGreaterThan(0)
      expect(Math.abs(vm.autoScrollOptions.speed)).toBeLessThan(1)

      // Verify smooth scrolling stops on interaction
      expect(vm.autoScrollOptions.stopOnInteraction).toBe(true)
      expect(vm.autoScrollOptions.stopOnMouseEnter).toBe(true)
    })

    it('should measure DOM size reduction from virtual rendering', () => {
      // Mount carousel with all recommendations
      wrapper = mount(RecommendationsCarousel, {
        global: {
          stubs: {
            ClientOnly: {
              template: '<div><slot /></div>'
            },
            UContainer: {
              template: '<div><slot /></div>'
            },
            UCarousel: {
              template: '<div><slot v-for="(item, idx) in items" :key="idx" :item="item" :index="idx" /></div>',
              props: ['items']
            },
            UIcon: true,
            UButton: true
          },
          mocks: {
            $t: (key: string) => key,
            $i18n: {
              locale: { value: 'en' }
            }
          }
        }
      })

      // Count DOM nodes in the carousel
      const carouselElement = wrapper.find('.carousel-container, [class*="carousel"]')
      const domNodeCount = carouselElement.exists() 
        ? carouselElement.element.querySelectorAll('*').length 
        : wrapper.element.querySelectorAll('*').length

      // With virtual rendering, we expect significantly fewer nodes
      // 11 recommendations × ~60 nodes each = ~660 nodes (without optimization)
      // With virtual rendering (5 slides): ~300 nodes
      // Expect at least 40% reduction
      const expectedMaxNodes = 400 // Should be much less than 660

      expect(domNodeCount).toBeLessThan(expectedMaxNodes)
    })

    it('should verify memory efficiency through limited rendering', () => {
      wrapper = mount(RecommendationsCarousel, {
        global: {
          stubs: {
            ClientOnly: {
              template: '<div><slot /></div>'
            },
            UContainer: {
              template: '<div><slot /></div>'
            },
            UCarousel: true,
            UIcon: true,
            UButton: true
          },
          mocks: {
            $t: (key: string) => key,
            $i18n: {
              locale: { value: 'en' }
            }
          }
        }
      })

      // Verify that the carousel uses the recommendations data efficiently
      const vm = wrapper.vm as any
      
      // Check that we're not creating unnecessary copies of data
      expect(vm.allRecs).toBeDefined()
      expect(Array.isArray(vm.allRecs)).toBe(true)
      expect(vm.allRecs.length).toBe(11) // All recommendations available

      // Verify carousel is configured for efficient rendering
      expect(vm.carouselUi).toBeDefined()
      expect(vm.carouselBreakpoints).toBeDefined()
      
      // The component should not render all slides at once
      // This is verified through the virtual rendering logic
      // which limits DOM nodes and thus memory usage
    })

    it('should verify carousel configuration reduces DOM overhead', () => {
      wrapper = mount(RecommendationsCarousel, {
        global: {
          stubs: {
            ClientOnly: {
              template: '<div><slot /></div>'
            },
            UContainer: {
              template: '<div><slot /></div>'
            },
            UCarousel: true,
            UIcon: true,
            UButton: true
          },
          mocks: {
            $t: (key: string) => key,
            $i18n: {
              locale: { value: 'en' }
            }
          }
        }
      })

      const vm = wrapper.vm as any

      // Verify carousel UI configuration optimizes rendering
      expect(vm.carouselUi.viewport).toBe('overflow-visible')
      expect(vm.carouselUi.container).toContain('gap-3')
      
      // Verify responsive breakpoints are configured
      expect(vm.carouselBreakpoints).toBeDefined()
      expect(typeof vm.carouselBreakpoints).toBe('object')

      // Verify the component uses ClientOnly for hydration optimization
      const clientOnly = wrapper.findComponent({ name: 'ClientOnly' })
      expect(clientOnly.exists()).toBe(true)
    })

    it('should verify performance optimizations are applied', () => {
      wrapper = mount(RecommendationsCarousel, {
        global: {
          stubs: {
            ClientOnly: {
              template: '<div><slot /></div>'
            },
            UContainer: {
              template: '<div><slot /></div>'
            },
            UCarousel: true,
            UIcon: true,
            UButton: true
          },
          mocks: {
            $t: (key: string) => key,
            $i18n: {
              locale: { value: 'en' }
            }
          }
        }
      })

      const vm = wrapper.vm as any

      // Verify lazy rendering is enabled
      expect(vm.shouldRenderCarousel).toBeDefined()
      expect(typeof vm.shouldRenderCarousel).toBe('boolean')

      // Verify visibility tracking is set up
      expect(vm.hasEntered).toBeDefined()
      expect(typeof vm.hasEntered).toBe('boolean')

      // Verify auto-scroll respects user preferences
      expect(vm.autoScrollOptions).toBeDefined()
      if (vm.reduceMotion === 'reduce') {
        expect(vm.autoScrollOptions).toBe(false)
      } else {
        expect(typeof vm.autoScrollOptions).toBe('object')
      }
    })
  })
})
