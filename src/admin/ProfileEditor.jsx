import { useEffect, useState } from 'react'
import { getData, putData } from './adminApi.js'
import { Field, TextInput, LinesInput, SaveBar, inputCls } from './fields.jsx'
import RichTextField from './RichTextField.jsx'

export default function ProfileEditor() {
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    getData('profile')
      .then(setProfile)
      .catch((e) => setStatus(`❌ ${e.message}`))
  }, [])

  if (!profile) return <p className="text-muted">Loading profile… {status}</p>

  const set = (key, value) => setProfile((p) => ({ ...p, [key]: value }))
  const setSocial = (key, value) => setProfile((p) => ({ ...p, social: { ...p.social, [key]: value } }))

  async function save() {
    if (!profile.name || !profile.email) {
      setStatus('❌ Name and email are required')
      return
    }
    try {
      const res = await putData('profile', profile)
      setStatus(`✅ Saved to ${res.file}`)
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <TextInput value={profile.name} onChange={(v) => set('name', v)} />
        </Field>
        <Field label="Short name" hint="logo in the navbar">
          <TextInput value={profile.shortName} onChange={(v) => set('shortName', v)} />
        </Field>
        <Field label="Main role" hint="hero title">
          <TextInput value={profile.role} onChange={(v) => set('role', v)} />
        </Field>
        <Field label="Location">
          <TextInput value={profile.location} onChange={(v) => set('location', v)} />
        </Field>
      </div>

      <Field label="Rotating roles" hint="one per line — the hero typewriter cycles these">
        <LinesInput value={profile.roles} onChange={(v) => set('roles', v)} />
      </Field>

      <Field label="Tagline" hint="one line under the hero title">
        <TextInput value={profile.tagline} onChange={(v) => set('tagline', v)} />
      </Field>

      <Field label="Bio" hint="the About section paragraph">
        <RichTextField value={profile.bio} onChange={(v) => set('bio', v)} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email">
          <TextInput type="email" value={profile.email} onChange={(v) => set('email', v)} />
        </Field>
        <Field label="GitHub username" hint="used for the live repos section">
          <TextInput value={profile.githubUsername} onChange={(v) => set('githubUsername', v)} />
        </Field>
        <Field label="GitHub URL">
          <TextInput value={profile.social?.github} onChange={(v) => setSocial('github', v)} />
        </Field>
        <Field label="LinkedIn URL">
          <TextInput value={profile.social?.linkedin} onChange={(v) => setSocial('linkedin', v)} />
        </Field>
        <Field label="Twitter/X URL">
          <TextInput value={profile.social?.twitter} onChange={(v) => setSocial('twitter', v)} />
        </Field>
        <Field label="Google Form URL" hint="contact button appears once this is set">
          <TextInput value={profile.googleFormUrl} onChange={(v) => set('googleFormUrl', v)} placeholder="https://forms.gle/…" />
        </Field>
        <Field label="Resume file" hint="path inside public/">
          <TextInput value={profile.resumeUrl} onChange={(v) => set('resumeUrl', v)} />
        </Field>
      </div>

      <Field label="Open to" hint="one per line, shown in About">
        <LinesInput value={profile.openTo} onChange={(v) => set('openTo', v)} rows={2} />
      </Field>

      <Field label="Stats" hint="value + label pairs shown in the hero">
        <div className="space-y-2">
          {(profile.stats || []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${inputCls} max-w-28`}
                value={s.value}
                placeholder="3+"
                onChange={(e) =>
                  set('stats', profile.stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))
                }
              />
              <input
                className={inputCls}
                value={s.label}
                placeholder="Years building software"
                onChange={(e) =>
                  set('stats', profile.stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                }
              />
              <button
                onClick={() => set('stats', profile.stats.filter((_, j) => j !== i))}
                className="shrink-0 rounded-lg border border-line px-3 text-sm text-red-400 hover:border-red-400"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => set('stats', [...(profile.stats || []), { value: '', label: '' }])}
            className="rounded-lg border border-dashed border-line px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent-soft"
          >
            + Add stat
          </button>
        </div>
      </Field>

      <SaveBar onSave={save} status={status} label="Save profile" />
    </div>
  )
}
