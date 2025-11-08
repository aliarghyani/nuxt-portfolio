# Service Worker Test

## Test Objective
Verify that the service worker is properly registered and implements correct caching strategies for static assets, images, and API calls.

## Requirements Coverage
- **Requirement 2.3**: Use service worker for caching critical resources
- **Requirement 2.1**: Proper cache TTL for static assets (1 year)

## Test Setup

### Implementation Files
1. **Service Worker**: `public/sw.js`
   - CacheFirst strategy for static assets (JS, CSS, fonts)
   - CacheFirst strategy for images (including Vercel Image Optimization)
   - NetworkFirst strategy for API calls

2. **Registration Plugin**: `app/plugins/service-worker.client.ts`
   - Registers service worker on page load
   - Handles service worker updates

### Cache Strategies

#### Static Assets (CacheFirst)
- **Pattern**: `\.(js|css|woff2|woff|ttf|eot|svg|ico)$`
- **Cache Name**: `static-v1`
- **Max Age**: 31536000 seconds (1 year)
- **Max Entries**: 100
- **Strategy**: Cache first, network fallback

#### Images (CacheFirst)
- **Pattern**: `\.(png|jpg|jpeg|webp|avif|gif)$|_vercel\/image`
- **Cache Name**: `images-v1`
- **Max Age**: 2592000 seconds (30 days)
- **Max Entries**: 60
- **Strategy**: Cache first, network fallback

#### API Calls (NetworkFirst)
- **Pattern**: `/\/api\//`
- **Cache Name**: `api-v1`
- **Max Age**: 300 seconds (5 minutes)
- **Max Entries**: 50
- **Strategy**: Network first, cache fallback

## Manual Test Steps

### 1. Start Development Server
```bash
npm run dev
```

### 2. Check Service Worker Registration

#### Open Browser DevTools
1. Navigate to the portfolio website
2. Open DevTools (F12)
3. Go to **Application** tab → **Service Workers**

#### Verify Registration
- ✓ Service worker should be listed
- ✓ Status: "activated and is running"
- ✓ Scope: "/"
- ✓ Source: "/sw.js"

#### Check Console
Look for: `Service Worker registered successfully: /`

### 3. Test Cache Strategies

#### A. Static Assets (CacheFirst)

**First Load:**
1. Open Network tab
2. Filter by JS/CSS
3. Load the page
4. Check that assets are fetched from network
5. Status: 200 OK

**Second Load:**
1. Refresh the page (Ctrl+R)
2. Check Network tab
3. Assets should show: "(ServiceWorker)" or "(from ServiceWorker)"
4. Size column: "(from ServiceWorker)"

**Verify in Application Tab:**
1. Go to Application → Cache Storage
2. Find `static-v1` cache
3. Verify JS/CSS files are cached

#### B. Images (CacheFirst)

**First Load:**
1. Network tab → Filter by Img
2. Load page
3. Images fetched from network
4. Status: 200 OK

**Second Load:**
1. Refresh page
2. Images should load from ServiceWorker
3. Check Cache Storage → `images-v1`
4. Verify images are cached

**Test Vercel Image Optimization:**
1. Look for `/_vercel/image` requests
2. First load: from network
3. Second load: from ServiceWorker

#### C. API Calls (NetworkFirst)

**Online Test:**
1. Network tab → Filter by XHR/Fetch
2. Make API calls
3. Should fetch from network first
4. Response cached in `api-v1`

**Offline Test:**
1. Go to Application → Service Workers
2. Check "Offline" checkbox
3. Refresh page
4. API calls should serve from cache
5. Verify fallback works

### 4. Test Offline Functionality

#### Enable Offline Mode
1. Application tab → Service Workers
2. Check "Offline" checkbox

#### Test Cached Resources
- ✓ Page should load (HTML from cache)
- ✓ Styles should apply (CSS from cache)
- ✓ Scripts should work (JS from cache)
- ✓ Images should display (from cache)
- ✓ Fonts should render (from cache)

#### Test Network-Dependent Features
- API calls should fail gracefully or serve stale data
- New resources should show error

### 5. Test Cache Cleanup

#### Update Cache Version
1. Edit `public/sw.js`
2. Change `CACHE_VERSION = 'v1'` to `'v2'`
3. Reload page

#### Verify Old Caches Removed
1. Application → Cache Storage
2. Old caches (`static-v1`, `images-v1`, `api-v1`) should be deleted
3. New caches (`static-v2`, `images-v2`, `api-v2`) should exist

### 6. Test Service Worker Updates

#### Trigger Update
1. Make a change to `sw.js`
2. Reload page
3. Check console for: "New service worker available"

#### Verify Update Flow
1. Application → Service Workers
2. Should show "waiting to activate"
3. Close all tabs and reopen
4. New service worker should activate

## Automated Testing

### Browser DevTools Audit
1. Open Lighthouse (DevTools → Lighthouse)
2. Run audit
3. Check "Progressive Web App" section
4. Verify:
   - ✓ Registers a service worker
   - ✓ Service worker caches resources

### Performance Impact Test

**Measure First Load:**
```javascript
// In browser console
performance.getEntriesByType('navigation')[0].loadEventEnd
```

**Measure Cached Load:**
1. Refresh page
2. Run same command
3. Compare times

**Expected Results:**
- First load: ~2000-3000ms
- Cached load: ~500-1000ms (50-70% improvement)

## Success Criteria

### Registration
- ✓ Service worker registers successfully
- ✓ No registration errors in console
- ✓ Shows as "activated" in DevTools

### Caching
- ✓ Static assets cached on first load
- ✓ Images cached on first load
- ✓ API responses cached appropriately
- ✓ Cache strategies work as expected

### Offline Support
- ✓ Page loads offline with cached resources
- ✓ Images display offline
- ✓ Styles and scripts work offline
- ✓ Graceful degradation for network-dependent features

### Performance
- ✓ Repeat visits load 50%+ faster
- ✓ Reduced network requests on repeat visits
- ✓ Cache hit rate >80% for static assets

### Cleanup
- ✓ Old caches removed on version update
- ✓ No orphaned caches
- ✓ Cache size stays within limits

## Test Results

### Date: [To be filled during testing]

#### Service Worker Registration
- [ ] Successfully registered
- [ ] Scope: /
- [ ] Status: activated
- [ ] No console errors

#### Cache Strategy Tests
- [ ] Static assets use CacheFirst
- [ ] Images use CacheFirst
- [ ] API calls use NetworkFirst
- [ ] Vercel Image Optimization cached

#### Offline Functionality
- [ ] Page loads offline
- [ ] Cached resources available
- [ ] Graceful degradation works

#### Performance Metrics
- First load time: ___ ms
- Cached load time: ___ ms
- Improvement: ___%
- Cache hit rate: ___%

#### Cache Management
- [ ] Old caches cleaned up
- [ ] Version updates work
- [ ] Cache size within limits

## Troubleshooting

### Service Worker Not Registering
1. Check browser console for errors
2. Verify `sw.js` is in `public/` directory
3. Ensure HTTPS or localhost (required for SW)
4. Check browser supports service workers
5. Clear browser cache and try again

### Resources Not Caching
1. Check Network tab for SW intercept
2. Verify cache patterns in `sw.js`
3. Check Application → Cache Storage
4. Look for SW errors in console
5. Verify request method is GET

### Offline Mode Not Working
1. Ensure resources were cached on first load
2. Check cache storage has entries
3. Verify SW is activated
4. Test with DevTools offline mode
5. Check for SW fetch errors

### Old Caches Not Cleaning Up
1. Verify cache version changed
2. Check activate event in SW
3. Close all tabs and reopen
4. Manually delete old caches
5. Check SW update cycle

## Browser Compatibility

### Supported Browsers
- ✓ Chrome 40+
- ✓ Firefox 44+
- ✓ Safari 11.1+
- ✓ Edge 17+
- ✓ Opera 27+

### Fallback Behavior
- Browsers without SW support: Normal caching via HTTP headers
- No functionality loss, just no offline support

## Security Considerations

### HTTPS Requirement
- Service workers require HTTPS (or localhost for development)
- Vercel automatically provides HTTPS

### Scope Limitation
- SW scope limited to `/` (entire site)
- Cannot access resources outside scope

### Cache Poisoning Prevention
- Only cache successful responses (200 OK)
- Validate response before caching
- Use versioned cache names

## Related Files
- `public/sw.js` - Service worker implementation
- `app/plugins/service-worker.client.ts` - Registration plugin
- `.kiro/specs/performance-optimization/requirements.md` - Requirement 2.3
- `.kiro/specs/performance-optimization/design.md` - Caching strategy design

## Next Steps After Testing

### If Tests Pass
1. Mark task 8.3 as complete
2. Proceed to task 8.4 (caching tests)
3. Monitor cache hit rates in production

### If Tests Fail
1. Review error messages
2. Check browser compatibility
3. Verify file paths and patterns
4. Test in different browsers
5. Check HTTPS/localhost requirement

## Performance Monitoring

### Metrics to Track
- Service worker registration success rate
- Cache hit rate by resource type
- Offline page load success rate
- Average load time improvement
- Cache storage usage

### Tools
- Chrome DevTools Application tab
- Lighthouse PWA audit
- Performance API
- Custom analytics events
