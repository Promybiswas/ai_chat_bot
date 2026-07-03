const express = require('express')
const cors    = require('cors')
const fs      = require('fs')
const path    = require('path')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth',           require('./routes/auth'))
app.use('/api/reports',        require('./routes/reports'))
app.use('/api/appointments',   require('./routes/appointments'))
app.use('/api/health-records', require('./routes/health'))
app.use('/api/chat',           require('./routes/chat'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// In production, serve the built React app (single-service deploy).
// The dist folder only exists after `npm run build`, so this is a no-op in dev.
const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' })
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
