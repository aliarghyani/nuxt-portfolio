/**
 * View Transitions ripple utility (best-practice).
 * - Uses document.startViewTransition when available
 * - Ripple originates from click position
 * - Duration defaults to 500ms, easing to 'ease-in-out'
 * - Respects prefers-reduced-motion
 * - Graceful fallback: runs update without animation
 *
 * Usage:
 *   const { runRipple } = useViewTransitionRipple()
 *   await runRipple(mouseEvent, () => { // change theme or primary here })
 */

export type RippleOptions = {
  duration?: number
  easing?: string
}

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function supportsViewTransitions(): boolean {
  return isClient() && 'startViewTransition' in document
}

function prefersReducedMotion(): boolean {
  if (!isClient()) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Compute the end radius needed to cover the viewport from an origin point.
 */
function computeEndRadius(x: number, y: number, w: number, h: number): number {
  const topLeft = Math.hypot(x, y)
  const topRight = Math.hypot(w - x, y)
  const bottomLeft = Math.hypot(x, h - y)
  const bottomRight = Math.hypot(w - x, h - y)
  return Math.max(topLeft, topRight, bottomLeft, bottomRight)
}

/**
 * Set CSS variables on :root to drive the ripple animation in CSS:
 * --vtx-x: origin X (px)
 * --vtx-y: origin Y (px)
 * --vtx-end: final circle radius (px)
 * --vtx-duration: animation duration (ms)
 * --vtx-easing: animation easing function
 */
function setRippleCSSVars(x: number, y: number, end: number, opts: Required<RippleOptions>) {
  const root = document.documentElement
  root.style.setProperty('--vtx-x', `${x}px`)
  root.style.setProperty('--vtx-y', `${y}px`)
  root.style.setProperty('--vtx-end', `${end}px`)
  root.style.setProperty('--vtx-duration', `${opts.duration}ms`)
  root.style.setProperty('--vtx-easing', opts.easing)
}

/**
 * Clear the CSS variables used by the ripple.
 */
function clearRippleCSSVars() {
  const root = document.documentElement
  root.style.removeProperty('--vtx-x')
  root.style.removeProperty('--vtx-y')
  root.style.removeProperty('--vtx-end')
  root.style.removeProperty('--vtx-duration')
  root.style.removeProperty('--vtx-easing')
}

/**
 * Run the update inside a View Transition with a ripple.
 * If unsupported or reduced motion is preferred, runs update immediately.
 */
export function useViewTransitionRipple() {
  async function runRipple(ev: MouseEvent | null, update: () => void, options?: RippleOptions): Promise<void> {
    if (!isClient()) {
      update()
      return
    }

    const duration = options?.duration ?? 500
    const easing = options?.easing ?? 'ease-in-out'
    const w = window.innerWidth
    const h = window.innerHeight
    const x = ev?.clientX ?? Math.floor(w / 2)
    const y = ev?.clientY ?? Math.floor(h / 2)
    const end = computeEndRadius(x, y, w, h)

    // Fallback: simple fade if unsupported or reduced motion is preferred
    if (!supportsViewTransitions() || prefersReducedMotion()) {
      const root = document.documentElement
      // set vars for timing and easing used by CSS
      root.style.setProperty('--vtx-duration', `${duration}ms`)
      root.style.setProperty('--vtx-easing', easing)
      root.classList.add('vtx-fade')
      // Force reflow to ensure class applies before update
      void (root as any).offsetWidth
      update()
      requestAnimationFrame(() => {
        root.classList.remove('vtx-fade')
        // cleanup
        root.style.removeProperty('--vtx-duration')
        root.style.removeProperty('--vtx-easing')
      })
      return
    }

    // Prepare CSS vars for the ripple animation
    setRippleCSSVars(x, y, end, { duration, easing })

    // Start the view transition and perform the update
    const transition = (document as any).startViewTransition(() => {
      update()
    })

    // Wait for the transition to finish then cleanup
    try {
      await transition.finished
    } finally {
      clearRippleCSSVars()
    }
  }

  async function runRippleFromCenter(update: () => void, options?: RippleOptions): Promise<void> {
    return runRipple(null, update, options)
  }

  return {
    runRipple,
    runRippleFromCenter,
  }
}
