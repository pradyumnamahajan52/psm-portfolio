// Client for the dev-only admin API (see adminApiPlugin.js at the repo root).

async function handle(res) {
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`)
  return body
}

export function getData(name) {
  return fetch(`/api/admin/data/${name}`).then(handle)
}

export function putData(name, data) {
  return fetch(`/api/admin/data/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)
}

export function uploadImage(folder, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const dataBase64 = String(reader.result).split(',')[1]
      const filename = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
      fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, filename, dataBase64 }),
      })
        .then(handle)
        .then(resolve, reject)
    }
    reader.readAsDataURL(file)
  })
}
