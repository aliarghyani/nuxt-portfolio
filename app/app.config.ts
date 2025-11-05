export default defineAppConfig({
  ui: {
    strategy: "merge",
    primary: "indigo",
    gray: "slate",
    colors: {
      primary: 'indigo',
    },
    icons: {
      dynamic: true,
    },
    tooltip: {
      // removes fixed height and truncate
      base: "h-auto overflow-visible text-overflow-clip whitespace-normal",
      popper: { placement: "top" },
    },
    timeline: {
      slots: {
        separator: 'flex-1 rounded-full bg-gray-200 dark:bg-gray-700',
      },
      variants: {
        color: {
          primary: {
            separator: 'group-data-[state=completed]:bg-primary-500 dark:group-data-[state=completed]:bg-primary-400'
          }
        }
      }
    }
  } as any,
  repoUrl: "https://github.com/aliarghyani/vue-cursor-rules",
  myWebsiteUrl: "https://www.linkedin.com/in/aliarghyani/",
  myContactUrl: "https://www.linkedin.com/in/aliarghyani/",
})
