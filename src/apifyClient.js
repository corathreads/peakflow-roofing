const APIFY_TOKEN = import.meta.env.VITE_APIFY_API_TOKEN
const BASE = 'https://api.apify.com/v2'

export const hasApifyConfig = Boolean(APIFY_TOKEN)

async function apifyFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${APIFY_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })
  if (!res.ok) throw new Error(`Apify API error ${res.status}: ${await res.text()}`)
  return res.json()
}

export async function runActor(actorId, input) {
  const { data } = await apifyFetch(`/acts/${actorId}/runs`, {
    method: 'POST',
    body: JSON.stringify(input)
  })
  return data
}

export async function getRunStatus(runId) {
  const { data } = await apifyFetch(`/actor-runs/${runId}`)
  return data
}

export async function getDatasetItems(datasetId) {
  const response = await apifyFetch(`/datasets/${datasetId}/items`)
  return Array.isArray(response) ? response : []
}
