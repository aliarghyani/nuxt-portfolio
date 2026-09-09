<script setup lang="ts">
const props = defineProps<{
  title: string
  url: string
}>()

const { t } = useI18n()

const shareLinks = computed(() => ({
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(props.url)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`
}))

const toast = useToast()

const copyToClipboard = async () => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.url)
      toast.add({
        title: t('blog.linkCopied') || 'Link copied!',
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = props.url
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      toast.add({
        title: t('blog.linkCopied') || 'Link copied!',
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    }
  } catch (err) {
    console.error('Failed to copy:', err)
    toast.add({
      title: t('blog.copyFailed') || 'Failed to copy link',
      icon: 'i-heroicons-x-circle',
      color: 'error'
    })
  }
}
</script>

<template>
  <div
    class="blog-share my-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <!-- Title -->
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-share" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <span class="font-semibold text-gray-900 dark:text-gray-100">
          {{ t('blog.sharePost') || 'Share this post' }}
        </span>
      </div>

      <!-- Share Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Twitter -->
        <UButton :to="shareLinks.twitter" target="_blank" rel="noopener noreferrer" color="neutral" variant="ghost"
          size="sm" icon="i-simple-icons-x" aria-label="Share on Twitter" />

        <!-- LinkedIn -->
        <UButton :to="shareLinks.linkedin" target="_blank" rel="noopener noreferrer" color="neutral" variant="ghost"
          size="sm" icon="i-simple-icons-linkedin" aria-label="Share on LinkedIn" />

        <!-- Facebook -->
        <UButton :to="shareLinks.facebook" target="_blank" rel="noopener noreferrer" color="neutral" variant="ghost"
          size="sm" icon="i-simple-icons-facebook" aria-label="Share on Facebook" />

        <!-- Telegram -->
        <UButton :to="shareLinks.telegram" target="_blank" rel="noopener noreferrer" color="neutral" variant="ghost"
          size="sm" icon="i-simple-icons-telegram" aria-label="Share on Telegram" />

        <!-- Copy Link -->
        <UButton @click="copyToClipboard" color="neutral" variant="ghost" size="sm" icon="i-heroicons-link"
          aria-label="Copy link" />
      </div>
    </div>
  </div>
</template>
