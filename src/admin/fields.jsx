// Shared form primitives for the admin editors.

export const inputCls =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-text focus:border-accent focus:outline-none'

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-text">
        {label} {hint && <span className="font-normal text-muted">— {hint}</span>}
      </span>
      {children}
    </label>
  )
}

export function TextInput({ value, onChange, ...rest }) {
  return (
    <input
      className={inputCls}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

// Textarea where each line becomes one array entry.
export function LinesInput({ value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      rows={rows}
      className={inputCls}
      value={(value || []).join('\n')}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.split('\n'))}
      onBlur={(e) =>
        onChange(
          e.target.value
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
    />
  )
}

// Comma-separated input that maps to an array of strings.
export function TagsInput({ value, onChange, placeholder }) {
  return (
    <input
      className={inputCls}
      value={(value || []).join(', ')}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
    />
  )
}

export function SaveBar({ onSave, status, label = 'Save changes' }) {
  return (
    <div className="sticky bottom-0 -mx-1 mt-8 flex items-center gap-4 border-t border-line bg-bg/95 px-1 py-4 backdrop-blur">
      <button
        onClick={onSave}
        className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white hover:bg-accent-soft"
      >
        {label}
      </button>
      <span className="text-sm text-muted">{status}</span>
    </div>
  )
}

export function RowButtons({ onUp, onDown, onEdit, onDelete }) {
  const btn =
    'rounded-lg border border-line px-2.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent-soft disabled:opacity-30 disabled:hover:border-line disabled:hover:text-muted'
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {onUp && (
        <button className={btn} onClick={onUp} disabled={!onUp.enabled} aria-label="Move up" title="Move up">
          ↑
        </button>
      )}
      {onDown && (
        <button className={btn} onClick={onDown} disabled={!onDown.enabled} aria-label="Move down" title="Move down">
          ↓
        </button>
      )}
      {onEdit && (
        <button className={btn} onClick={onEdit}>
          Edit
        </button>
      )}
      {onDelete && (
        <button
          className="rounded-lg border border-line px-2.5 py-1.5 text-sm text-red-400 transition-colors hover:border-red-400"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  )
}

export function move(arr, from, to) {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
