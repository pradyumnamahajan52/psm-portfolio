import { useEffect, useState } from 'react'
import { getData, putData } from './adminApi.js'
import { Field, TextInput, TagsInput, SaveBar, RowButtons, move } from './fields.jsx'

export default function SkillsEditor() {
  const [groups, setGroups] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    getData('skills')
      .then(setGroups)
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [])

  if (!groups) return <p className="text-muted">Loading skills… {status}</p>

  const update = (i, patch) => setGroups(groups.map((g, j) => (j === i ? { ...g, ...patch } : g)))

  async function save() {
    const bad = groups.find((g) => !g.group.trim())
    if (bad) {
      setStatus('❌ Every group needs a name')
      return
    }
    try {
      const cleaned = groups.map((g) => ({ ...g, group: g.group.trim() }))
      const res = await putData('skills', cleaned)
      setGroups(cleaned)
      setStatus(`✅ Saved to ${res.file}`)
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <div>
      <div className="space-y-4">
        {groups.map((g, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex-1">
                <TextInput value={g.group} onChange={(v) => update(i, { group: v })} placeholder="Group name (e.g. Frontend)" />
              </div>
              <RowButtons
                onUp={Object.assign(() => setGroups(move(groups, i, i - 1)), { enabled: i > 0 })}
                onDown={Object.assign(() => setGroups(move(groups, i, i + 1)), { enabled: i < groups.length - 1 })}
                onDelete={() => {
                  if (window.confirm(`Delete skill group "${g.group}"?`)) setGroups(groups.filter((_, j) => j !== i))
                }}
              />
            </div>
            <Field label="Skills" hint="comma separated">
              <TagsInput value={g.items} onChange={(v) => update(i, { items: v })} placeholder="React.js, Redux, …" />
            </Field>
          </div>
        ))}
      </div>

      <button
        onClick={() => setGroups([...groups, { group: '', items: [] }])}
        className="mt-4 rounded-lg border border-dashed border-line px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent-soft"
      >
        + Add group
      </button>

      <SaveBar onSave={save} status={status} label="Save skills" />
    </div>
  )
}
