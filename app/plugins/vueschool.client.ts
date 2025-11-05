export default defineNuxtPlugin(() => {
  const script = document.createElement("script")
  script.src = "https://media.bitterbrains.com/main.js?from=UILIB&type=top"
  script.async = true
  document.head.appendChild(script)
})
