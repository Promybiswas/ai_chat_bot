const express      = require('express')
const router       = express.Router()
const HealthRecord = require('../models/HealthRecord')
const auth         = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const query = { userId: req.userId }
    if (req.query.type) query.type = req.query.type
    const records = await HealthRecord.find(query).sort({ recordedAt: -1 }).limit(50)
    res.json({ records })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', auth, async (req, res) => {
  try {
    const { type, value, notes, recordedAt } = req.body
    if (!type || !value) return res.status(400).json({ error: 'Type and value are required' })
    const record = await HealthRecord.create({ userId: req.userId, type, value, notes, recordedAt })
    res.status(201).json({ record })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!record) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
