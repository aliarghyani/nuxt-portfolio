export default defineEventHandler((event) => {
  const url = event.node.req.url || ''
  
  // Static assets: 1 year cache (31536000 seconds) with immutable - Requirements 2.1, 2.4
  if (/\.(js|css|woff2|woff|ttf|eot|png|jpg|jpeg|webp|avif|svg|ico|gif)$/.test(url)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return
  }
  
  // Images from Vercel Image Optimization - Requirements 2.1, 2.4
  if (url.includes('/_vercel/image')) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return
  }
  
  // HTML: No cache for dynamic content
  if (url.endsWith('.html') || url === '/' || !url.includes('.')) {
    setHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')
    return
  }
})
