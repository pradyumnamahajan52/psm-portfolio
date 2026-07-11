import { useEffect, useState } from 'react'
import { getData, putData, uploadImage } from './adminApi.js'

const EMPTY = {
  slug: '',
  title: '',
  rank: 99,
  featured: false,
  tech: [],
  summary: '',
  description: '',
  highlights: [],
  images: [],
  liveUrl: '',
  repoUrl: '',
  role: 'Full Stack Developer',
  duration: '',
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-text">
        {label} {hint && <span className="font-normal text-muted">— {hint}</span>}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-text focus:border-accent focus:outline-none'

export default function ProjectsEditor() {
  const [projects, setProjects] = useState(null)
  const [draft, setDraft] = useState(null) // project being edited
  const [editIndex, setEditIndex] = useState(-1) // -1 = adding new
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getData('projects')
      .then(setProjects)
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [])

  function set(key, value) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  async function persist(next) {
    const sorted = [...next].sort((a, b) => a.rank - b.rank)
    await putData('projects', sorted)
    setProjects(sorted)
  }

  async function saveDraft() {
    if (!draft.slug || !/^[a-z0-9-]+$/.test(draft.slug)) {
      setStatus('❌ Slug is required: lowercase letters, numbers and dashes only (e.g. my-project)')
      return
    }
    if (!draft.title) {
      setStatus('❌ Title is required')
      return
    }
    const clashes = projects.some((p, i) => p.slug === draft.slug && i !== editIndex)
    if (clashes) {
      setStatus(`❌ Slug "${draft.slug}" is already used by another project`)
      return
    }
    const next = [...projects]
    if (editIndex === -1) next.push(draft)
    else next[editIndex] = draft
    try {
      await persist(next)
      setStatus(`✅ Saved "${draft.title}"`)
      setDraft(null)
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  async function remove(index) {
    const target = projects[index]
    if (!window.confirm(`Delete project "${target.title}"? This edits projects.json immediately.`)) return
    try {
      await persist(projects.filter((_, i) => i !== index))
      setStatus(`🗑️ Deleted "${target.title}"`)
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  async function onUpload(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!draft.slug) {
      setStatus('❌ Set the slug first — images are stored in public/projects/<slug>/')
      return
    }
    setUploading(true)
    try {
      const res = await uploadImage(draft.slug, file)
      set('images', [...draft.images, res.path])
      setStatus(`✅ Uploaded ${res.path}`)
    } catch (err) {
      setStatus(`❌ ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (!projects) return <p className="text-muted">Loading projects… {status}</p>

  // ---------- Edit form ----------
  if (draft) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {editIndex === -1 ? 'Add project' : `Edit: ${projects[editIndex].title}`}
          </h2>
          <button onClick={() => setDraft(null)} className="text-sm text-muted hover:text-text">
            ← Back to list (discard changes)
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <input className={inputCls} value={draft.title} onChange={(e) => set('title', e.target.value)} />
          </Field>
          <Field label="Slug" hint="URL: /projects/<slug>">
            <input className={inputCls} value={draft.slug} onChange={(e) => set('slug', e.target.value)} placeholder="my-project" />
          </Field>
          <Field label="Rank" hint="lower shows first">
            <input type="number" className={inputCls} value={draft.rank} onChange={(e) => set('rank', Number(e.target.value))} />
          </Field>
          <Field label="Featured on home page">
            <button
              onClick={() => set('featured', !draft.featured)}
              className={`rounded-lg px-4 py-2 text-sm ${draft.featured ? 'bg-accent text-white' : 'bg-surface text-muted border border-line'}`}
            >
              {draft.featured ? '★ Featured' : '☆ Not featured'}
            </button>
          </Field>
          <Field label="Role">
            <input className={inputCls} value={draft.role} onChange={(e) => set('role', e.target.value)} />
          </Field>
          <Field label="Duration">
            <input className={inputCls} value={draft.duration} onChange={(e) => set('duration', e.target.value)} placeholder="3 Months" />
          </Field>
          <Field label="Live URL" hint="optional">
            <input className={inputCls} value={draft.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="Repository URL" hint="optional">
            <input className={inputCls} value={draft.repoUrl} onChange={(e) => set('repoUrl', e.target.value)} placeholder="https://github.com/…" />
          </Field>
        </div>

        <Field label="Tech stack" hint="comma separated">
          <input
            className={inputCls}
            value={draft.tech.join(', ')}
            onChange={(e) => set('tech', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            placeholder="React.js, Django, MySQL"
          />
        </Field>

        <Field label="Summary" hint="one line, shown on cards">
          <input className={inputCls} value={draft.summary} onChange={(e) => set('summary', e.target.value)} />
        </Field>

        <Field label="Description" hint="full case-study text">
          <textarea rows={5} className={inputCls} value={draft.description} onChange={(e) => set('description', e.target.value)} />
        </Field>

        <Field label="Highlights" hint="one per line">
          <textarea
            rows={5}
            className={inputCls}
            value={draft.highlights.join('\n')}
            onChange={(e) => set('highlights', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
          />
        </Field>

        <Field label="Images" hint="first image is the cover">
          <div className="space-y-2">
            {draft.images.map((img, i) => (
              <div key={img} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-2">
                <img src={img} alt="" className="h-12 w-20 rounded object-cover" />
                <code className="flex-1 truncate text-xs text-muted">{img}</code>
                <button
                  onClick={() => set('images', draft.images.filter((_, j) => j !== i))}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent-soft">
              {uploading ? 'Uploading…' : '+ Upload image'}
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
            </label>
          </div>
        </Field>

        <div className="flex items-center gap-4 border-t border-line pt-5">
          <button onClick={saveDraft} className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white hover:bg-accent-soft">
            Save project
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
        <p className="text-sm text-muted">{projects.length} projects · sorted by rank</p>
        <button
          onClick={() => {
            setDraft({ ...EMPTY })
            setEditIndex(-1)
            setStatus('')
          }}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-soft"
        >
          + Add project
        </button>
      </div>
      <div className="space-y-2">
        {projects.map((p, i) => (
          <div key={p.slug} className="flex items-center gap-4 rounded-lg border border-line bg-surface p-3">
            <img src={p.images[0]} alt="" className="h-12 w-20 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                <span className="mr-2 text-xs text-muted">#{p.rank}</span>
                {p.title}
                {p.featured && <span className="ml-2 text-xs text-accent-soft">★ featured</span>}
              </p>
              <p className="truncate text-xs text-muted">/projects/{p.slug}</p>
            </div>
            <button
              onClick={() => {
                setDraft({ ...EMPTY, ...p })
                setEditIndex(i)
                setStatus('')
              }}
              className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent-soft"
            >
              Edit
            </button>
            <button onClick={() => remove(i)} className="rounded-lg border border-line px-3 py-1.5 text-sm text-red-400 hover:border-red-400">
              Delete
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{status}</p>
    </div>
  )
}
