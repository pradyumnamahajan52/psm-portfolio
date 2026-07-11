import { useEffect, useState } from 'react'

export default function Typewriter({ words, typingMs = 65, pauseMs = 1800 }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    const word = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? typingMs / 2 : typingMs,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingMs, pauseMs])

  return (
    <span>
      {text}
      <span className="animate-pulse text-accent">▍</span>
    </span>
  )
}
