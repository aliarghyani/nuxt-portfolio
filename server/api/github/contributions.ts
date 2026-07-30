import type { GitHubApiResponse } from '@/types/github'

/**
 * GitHub Contributions API Endpoint
 * Based on: https://github.com/yuichkun/github-contribution-graph-example
 * 
 * Fetches contribution calendar data using GitHub GraphQL API
 * EXACTLY as shown in the reference implementation
 */
export default defineEventHandler(async (event): Promise<GitHubApiResponse> => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const username = query.username as string

  if (!username) {
    throw createError({
      statusCode: 400,
      message: 'Username is required'
    })
  }

  // GraphQL query - EXACTLY as in reference (no date range!)
  const graphqlQuery = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`

  try {
    const headers: Record<string, string> = {}

    // Add authorization token (EXACTLY as in reference)
    const githubToken = config.githubToken || process.env.NUXT_PUBLIC_GITHUB_TOKEN
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`
    }

    // Make GraphQL request (EXACTLY as in reference)
    const response = await $fetch<GitHubApiResponse>('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: graphqlQuery,
        variables: `
  {
    "userName": "${username}"
  }
`
      })
    })

    console.log(`Fetched contributions for ${username}:`, response.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions)

    // Return the response (structure: { data: { user: { contributionsCollection: ... } } })
    return response
  } catch (error: any) {
    console.error('GitHub API Error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch GitHub contributions'
    })
  }
})
