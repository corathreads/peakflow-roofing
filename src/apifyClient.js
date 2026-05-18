import { ApifyClient } from 'apify-client'

const apifyToken = import.meta.env.VITE_APIFY_API_TOKEN

export const hasApifyConfig = Boolean(apifyToken)

export const apify = hasApifyConfig
  ? new ApifyClient({ token: apifyToken })
  : null
