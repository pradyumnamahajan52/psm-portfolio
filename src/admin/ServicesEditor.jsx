import { useEffect, useState } from 'react'
import { getData, putData } from './adminApi.js'
import { Field, TextInput, LinesInput, inputCls, RowButtons, move } from './fields.jsx'

const ICONS = ['globe', 'smartphone', 'cart', 'server']
const EMPTY = { icon: 'globe', title: '', description: '', points: [] }

export default function ServicesEditor() {
  const [services, setServices] = useState(null)
  const [draft, setDraft] = useState(null)
  const [editIndex, setEditIndex] = useState(-1)
  const [status, setStatus] = useState('')

  useEffect(() => {
    getData('services')
      .then(setServices)
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [])

  if (!services) return <p className="text-muted">Loading services… {status}</p>

  async function persist(next, okMsg) {
    try {
      await putData('services', next)
      setServices(next)
      setStatus(okMsg)
      return true
    } catch (e) {
      setStatus(`❌ ${e.message}`)
      return false
    }
  }

  async function saveDraft() {
    if (!draft.title) {
      setStatus('❌ Title is required')
      return
    }
    const next = [...services]
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
            {editIndex === -1 ? 'Add service' : `Edit: ${services[editIndex].title}`}
          </h2>
          <button onClick={() => setDraft(null)} className="text-sm text-muted hover:text-text">
            ← Back to list (discard changes)
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <TextInput value={draft.title} onChange={(v) => set('title', v)} />
          </Field>
          <Field label="Icon">
            <select className={inputCls} value={draft.icon} onChange={(e) => set('icon', e.target.value)}>
              {ICONS.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Description" hint="short paragraph on the card">
          <textarea
            rows={3}
            className={inputCls}
            value={draft.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </Field>

        <Field label="Points" hint="one per line, shown as bullets">
          <LinesInput value={draft.points} onChange={(v) => set('points', v)} rows={4} />
        </Field>

        <div className="flex items-center gap-4 border-t border-line pt-5">
          <button onClick={saveDraft} className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white hover:bg-accent-soft">
            Save service
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
        <p className="text-sm text-muted">{services.length} services</p>
        <button
          onClick={() => {
            setDraft({ ...EMPTY })
            setEditIndex(-1)
            setStatus('')
          }}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-soft"
        >
          + Add service
        </button>
      </div>
      <div className="space-y-2">
        {services.map((s, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-line bg-surface p-3">
            <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{s.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{s.title}</p>
              <p className="truncate text-xs text-muted">{s.description}</p>
            </div>
            <RowButtons
              onUp={Object.assign(() => persist(move(services, i, i - 1), '✅ Reordered'), { enabled: i > 0 })}
              onDown={Object.assign(() => persist(move(services, i, i + 1), '✅ Reordered'), {
                enabled: i < services.length - 1,
              })}
              onEdit={() => {
                setDraft({ ...EMPTY, ...s })
                setEditIndex(i)
                setStatus('')
              }}
              onDelete={() => {
                if (window.confirm(`Delete "${s.title}"? This edits services.json immediately.`))
                  persist(services.filter((_, j) => j !== i), `🗑️ Deleted "${s.title}"`)
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{status}</p>
    </div>
  )
}
