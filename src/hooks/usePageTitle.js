import { useEffect } from 'react'

const BASE = 'Pradyumna Mahajan — Full Stack Developer'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE
    return () => {
      document.title = BASE
    }
  }, [title])
}
