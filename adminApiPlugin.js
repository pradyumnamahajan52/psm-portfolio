// Dev-only admin API. `apply: 'serve'` means none of this exists in `vite build`
// output or in `vite preview` — the live site never has write endpoints.
import fs from 'node:fs'
import path from 'node:path'

const DATA_FILES = ['profile', 'projects', 'skills', 'experience', 'services']
const NAME_RE = /^[a-z0-9-]+$/
const FILENAME_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function send(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default function adminApi() {
  return {
    name: 'psm-admin-api',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root
      const dataDir = path.join(root, 'src', 'data')
      const uploadRoot = path.join(root, 'public', 'projects')

      server.middlewares.use('/api/admin', async (req, res) => {
        try {
          const url = (req.url || '').split('?')[0]

          // GET/PUT /api/admin/data/<name> — read/write src/data/<name>.json
          const dataMatch = url.match(/^\/data\/([a-z0-9-]+)$/)
          if (dataMatch) {
            const name = dataMatch[1]
            if (!DATA_FILES.includes(name)) return send(res, 404, { error: `Unknown data file: ${name}` })
            const filePath = path.join(dataDir, `${name}.json`)

            if (req.method === 'GET') {
              return send(res, 200, JSON.parse(fs.readFileSync(filePath, 'utf8')))
            }
            if (req.method === 'PUT') {
              let parsed
              try {
                parsed = JSON.parse(await readBody(req))
              } catch {
                return send(res, 400, { error: 'Body is not valid JSON — nothing was saved.' })
              }
              fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n')
              return send(res, 200, { ok: true, file: `src/data/${name}.json` })
            }
            return send(res, 405, { error: 'Method not allowed' })
          }

          // POST /api/admin/upload — { folder, filename, dataBase64 } → public/projects/<folder>/<filename>
          if (url === '/upload' && req.method === 'POST') {
            let body
            try {
              body = JSON.parse(await readBody(req))
            } catch {
              return send(res, 400, { error: 'Invalid JSON body' })
            }
            const { folder, filename, dataBase64 } = body || {}
            if (!NAME_RE.test(folder || '')) return send(res, 400, { error: 'folder must be a lowercase slug (a-z, 0-9, -)' })
            if (!FILENAME_RE.test(filename || '') || filename.includes('..'))
              return send(res, 400, { error: 'Invalid filename' })
            if (!dataBase64) return send(res, 400, { error: 'dataBase64 missing' })

            const dir = path.join(uploadRoot, folder)
            fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(path.join(dir, filename), Buffer.from(dataBase64, 'base64'))
            return send(res, 200, { ok: true, path: `/projects/${folder}/${filename}` })
          }

          return send(res, 404, { error: 'Not found' })
        } catch (err) {
          return send(res, 500, { error: String(err && err.message ? err.message : err) })
        }
      })
    },
  }
}
