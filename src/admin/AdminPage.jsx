import { useEffect, useState } from 'react'
import { getData, putData } from './adminApi.js'
import ProjectsEditor from './ProjectsEditor.jsx'
import ProfileEditor from './ProfileEditor.jsx'
import SkillsEditor from './SkillsEditor.jsx'
import ExperienceEditor from './ExperienceEditor.jsx'
import ServicesEditor from './ServicesEditor.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

const TABS = {
  projects: ProjectsEditor,
  profile: ProfileEditor,
  skills: SkillsEditor,
  experience: ExperienceEditor,
  services: ServicesEditor,
}

// Escape hatch: raw JSON editing for any data file, for the rare case the
// forms don't cover something.
function JsonEditor({ name }) {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStatus('')
    getData(name)
      .then((data) => setText(JSON.stringify(data, null, 2)))
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [name])

  async function save() {
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      setStatus(`❌ Invalid JSON — not saved: ${e.message}`)
      return
    }
    try {
      const res = await putData(name, parsed)
      setStatus(`✅ Saved to ${res.file}`)
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        rows={24}
        className="w-full rounded-lg border border-line bg-surface p-4 font-mono text-sm text-text focus:border-accent focus:outline-none"
      />
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={save}
          className="rounded-lg bg-accent px-5 py-2 font-medium text-white hover:bg-accent-soft"
        >
          Validate & Save
        </button>
        <span className="text-sm text-muted">{status}</span>
      </div>
    </div>
  )
}

export default function AdminPage() {
  usePageTitle('Admin')
  const [tab, setTab] = useState('projects')
  const [rawJson, setRawJson] = useState(false)

  const Editor = TABS[tab]

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-6">
      <div className="mb-2 flex items-center gap-3">
        <h1 className="font-display text-3xl font-bold">Local Admin</h1>
        <span className="rounded-full border border-accent/50 px-2.5 py-0.5 text-xs text-accent-soft">
          dev only — never deployed
        </span>
      </div>
      <p className="mb-8 text-sm text-muted">
        Edits write directly to <code className="text-accent-soft">src/data/*.json</code> on your
        disk — the site preview hot-reloads instantly. Remember to{' '}
        <code className="text-accent-soft">npm run build</code> and re-upload to publish.
      </p>

      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-line pb-4">
        {Object.keys(TABS).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t)
              setRawJson(false)
            }}
            className={`rounded-lg px-4 py-2 text-sm capitalize transition-colors ${
              tab === t ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            {t}
          </button>
        ))}
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={rawJson}
            onChange={(e) => setRawJson(e.target.checked)}
            className="accent-[#8b5cf6]"
          />
          Edit raw JSON
        </label>
      </div>

      {rawJson ? <JsonEditor name={tab} /> : <Editor />}
    </div>
  )
}
