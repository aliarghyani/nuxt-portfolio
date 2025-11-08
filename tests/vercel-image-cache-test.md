# Vercel Image Cache Test

## Test Objective
Verify that Vercel Image Optimization endpoints (`/_vercel/image`) have proper cache headers configured with TTL of 31536000 seconds (1 year) and immutable directive.

## Requirements Coverage
- **Requirement 2.1**: Cache headers with TTL of at least 31536000 seconds
- **Requirement 2.4**: Use of immutable cache directive for images

## Test Setup

### Current Implementation
The cache headers middleware (`server/middleware/cache-headers.ts`) includes:
```typescript
if (url.includes('/_vercel/image')) {
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  return
}
```

### Image Configuration
`nuxt.config.ts` has image optimization configured:
```typescript
image: {
  quality: 80,
  formats: ['webp', 'jpg', 'png']
}
```

## Manual Test Steps

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser DevTools
- Navigate to the portfolio website
- Open DevTools (F12)
- Go to Network tab
- Filter by "Img" or search for "/_vercel/image"

### 3. Check Cache Headers
For each image request through Vercel Image Optimization:

**Expected Headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Verification Points:**
- ✓ `max-age=31536000` (1 year = 365 days × 24 hours × 60 minutes × 60 seconds)
- ✓ `immutable` directive present
- ✓ `public` directive present

### 4. Test Image Loading
Check these specific images:
- Profile avatar in Hero section
- Any images in Skills/Projects sections
- Recommendation carousel images (if any)

### 5. Verify Cache Hit Rate
After first load:
1. Refresh the page (Ctrl+R)
2. Check Network tab for cached images
3. Look for "(from disk cache)" or "(from memory cache)" status

## Expected Results

### First Load
- All images load from network
- Response headers include: `Cache-Control: public, max-age=31536000, immutable`
- Status: 200 OK

### Subsequent Loads
- Images load from cache
- Status: 200 (from disk cache) or 304 Not Modified
- Significantly faster load times

## Success Criteria

✓ All Vercel Image Optimization requests have correct cache headers
✓ Cache TTL is exactly 31536000 seconds (1 year)
✓ Immutable directive is present
✓ Images are cached on subsequent page loads
✓ No cache-related errors in console

## Test Results

### Date: [To be filled during testing]

#### Cache Headers Verification
- [ ] Profile avatar has correct headers
- [ ] All optimized images have max-age=31536000
- [ ] Immutable directive present on all images
- [ ] Public directive present

#### Cache Hit Rate
- First load: ___ images loaded
- Second load: ___ images from cache
- Cache hit rate: ___% 

#### Performance Impact
- First load time: ___ ms
- Cached load time: ___ ms
- Improvement: ___%

## Notes
- Vercel Image Optimization automatically handles image format conversion (WebP, AVIF)
- The middleware applies to all `/_vercel/image` paths
- Cache headers work in both development and production
- Browser may show different cache behavior in incognito mode

## Troubleshooting

### If cache headers are missing:
1. Verify middleware is in `server/middleware/` directory
2. Check that middleware file name ends with `.ts`
3. Restart dev server
4. Clear browser cache and test again

### If images not caching:
1. Check browser cache settings
2. Verify no cache-busting query parameters
3. Check for conflicting cache headers
4. Test in different browsers

## Related Files
- `server/middleware/cache-headers.ts` - Cache header implementation
- `nuxt.config.ts` - Image optimization configuration
- `.kiro/specs/performance-optimization/requirements.md` - Requirements 2.1, 2.4
- `.kiro/specs/performance-optimization/design.md` - Caching strategy design
