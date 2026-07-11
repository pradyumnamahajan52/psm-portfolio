import { useEffect, useState } from 'react'
import { getData, putData } from './adminApi.js'
import { Field, TextInput, LinesInput, inputCls, RowButtons, move } from './fields.jsx'

const EMPTY = { type: 'work', title: '', org: '', location: '', period: '', points: [] }

export default function ExperienceEditor() {
  const [entries, setEntries] = useState(null)
  const [draft, setDraft] = useState(null)
  const [editIndex, setEditIndex] = useState(-1)
  const [status, setStatus] = useState('')

  useEffect(() => {
    getData('experience')
      .then(setEntries)
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [])

  if (!entries) return <p className="text-muted">Loading experience… {status}</p>

  async function persist(next, okMsg) {
    try {
      await putData('experience', next)
      setEntries(next)
      setStatus(okMsg)
      return true
    } catch (e) {
      setStatus(`❌ ${e.message}`)
      return false
    }
  }

  async function saveDraft() {
    if (!draft.title || !draft.org) {
      setStatus('❌ Title and organisation are required')
      return
    }
    const next = [...entries]
    if (editIndex === -1) next.push(draft)
    else next[editIndex] = draft
    if (await persist(next, `✅ Saved "${draft.title}"`)) setDraft(null)
  }

  // ---------- Edit form ----------
  if (draft) {
    const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }))
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {editIndex === -1 ? 'Add entry' : `Edit: ${entries[editIndex].title}`}
          </h2>
          <button onClick={() => setDraft(null)} className="text-sm text-muted hover:text-text">
            ← Back to list (discard changes)
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Type">
            <select className={inputCls} value={draft.type} onChange={(e) => set('type', e.target.value)}>
              <option value="work">Work</option>
              <option value="education">Education</option>
            </select>
          </Field>
          <Field label="Period" hint="e.g. Mar 2025 — Present">
            <TextInput value={draft.period} onChange={(v) => set('period', v)} />
          </Field>
          <Field label="Title" hint="role or degree">
            <TextInput value={draft.title} onChange={(v) => set('title', v)} />
          </Field>
          <Field label="Organisation">
            <TextInput value={draft.org} onChange={(v) => set('org', v)} />
          </Field>
          <Field label="Location">
            <TextInput value={draft.location} onChange={(v) => set('location', v)} />
          </Field>
        </div>

        <Field label="Points" hint="one per line, shown as bullets">
          <LinesInput value={draft.points} onChange={(v) => set('points', v)} rows={5} />
        </Field>

        <div className="flex items-center gap-4 border-t border-line pt-5">
          <button onClick={saveDraft} className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white hover:bg-accent-soft">
            Save entry
          </button>
          <span className="text-sm text-muted">{status}</span>
        </div>
      </div>
    )
  }

  // ---------- List view ----------
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">{entries.length} entries · shown top to bottom</p>
        <button
          onClick={() => {
            setDraft({ ...EMPTY })
            setEditIndex(-1)
            setStatus('')
          }}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-soft"
        >
          + Add entry
        </button>
      </div>
      <div className="space-y-2">
        {entries.map((en, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-line bg-surface p-3">
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs capitalize ${
                en.type === 'work' ? 'bg-accent/15 text-accent-soft' : 'bg-surface-2 text-muted'
              }`}
            >
              {en.type}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{en.title}</p>
              <p className="truncate text-xs text-muted">
                {en.org} · {en.period}
              </p>
            </div>
            <RowButtons
              onUp={Object.assign(() => persist(move(entries, i, i - 1), '✅ Reordered'), { enabled: i > 0 })}
              onDown={Object.assign(() => persist(move(entries, i, i + 1), '✅ Reordered'), {
                enabled: i < entries.length - 1,
              })}
              onEdit={() => {
                setDraft({ ...EMPTY, ...en })
                setEditIndex(i)
                setStatus('')
              }}
              onDelete={() => {
                if (window.confirm(`Delete "${en.title}"? This edits experience.json immediately.`))
                  persist(entries.filter((_, j) => j !== i), `🗑️ Deleted "${en.title}"`)
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{status}</p>
    </div>
  )
}
