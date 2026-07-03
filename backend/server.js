const express = require('express')
const cors    = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth',           require('./routes/auth'))
app.use('/api/reports',        require('./routes/reports'))
app.use('/api/appointments',   require('./routes/appointments'))
app.use('/api/health-records', require('./routes/health'))
app.use('/api/chat',           require('./routes/chat'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
