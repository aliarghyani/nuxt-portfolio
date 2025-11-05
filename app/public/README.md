# ⚠️ Deprecated Directory

**This directory is deprecated and should not be used for new assets.**

## Why?

With Nuxt's `srcDir: 'app'` configuration, static assets must be placed in the **root `public/` directory**, not `app/public/`.

## Migration

All assets from this directory have been consolidated into the root `public/` folder. Please use:

```
/public/
  ├── favicon/
  ├── fonts/
  └── img/
```

## References

- [Nuxt 4.x Public Directory Documentation](https://nuxt.com/docs/4.x/guide/directory-structure/public)
- Assets are served from `/` (e.g., `/img/logo.png` resolves to `public/img/logo.png`)
