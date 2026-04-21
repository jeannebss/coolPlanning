import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.resolve('./coolplanning-data.json')

function localFilePlugin() {
  return {
    name: 'local-file-storage',
    configureServer(server) {
      server.middlewares.use('/api/load', (req, res) => {
        if (req.method !== 'GET') { res.statusCode = 405; res.end(); return; }
        if (fs.existsSync(DATA_FILE)) {
          res.setHeader('Content-Type', 'application/json')
          res.end(fs.readFileSync(DATA_FILE, 'utf8'))
        } else {
          res.statusCode = 404
          res.end('{}')
        }
      })
      server.middlewares.use('/api/save', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            JSON.parse(body) // validate JSON
            fs.writeFileSync(DATA_FILE, body, 'utf8')
            res.setHeader('Content-Type', 'application/json')
            res.end('{"ok":true}')
          } catch {
            res.statusCode = 400
            res.end('{"error":"invalid json"}')
          }
        })
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), localFilePlugin()],
})
