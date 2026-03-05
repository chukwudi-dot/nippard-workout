import { useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../utils/storage'

const CACHE_KEY = 'wger_image_cache'

export function useWgerGif(query, enabled) {
  const [gifUrl, setGifUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!enabled || !query) return

    const cache = loadJSON(CACHE_KEY, {})
    if (cache[query] !== undefined) {
      setGifUrl(cache[query])
      return
    }

    setLoading(true)
    setGifUrl(null)

    fetch(`https://wger.de/api/v2/exercise/search/?term=${encodeURIComponent(query)}&language=english&format=json`)
      .then(r => r.json())
      .then(data => {
        const id = data?.suggestions?.[0]?.data?.id
        if (!id) throw new Error('no result')
        return fetch(`https://wger.de/api/v2/exerciseimage/?exercise_base=${id}&format=json`)
      })
      .then(r => r.json())
      .then(img => {
        const url = img?.results?.find(i => i.is_main)?.image || img?.results?.[0]?.image || null
        const cache = loadJSON(CACHE_KEY, {})
        cache[query] = url
        saveJSON(CACHE_KEY, cache)
        setGifUrl(url)
      })
      .catch(() => {
        const cache = loadJSON(CACHE_KEY, {})
        cache[query] = null
        saveJSON(CACHE_KEY, cache)
        setGifUrl(null)
      })
      .finally(() => setLoading(false))
  }, [query, enabled])

  return { gifUrl, loading }
}
