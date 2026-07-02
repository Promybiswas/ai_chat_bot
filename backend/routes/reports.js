const express = require('express')
const router  = express.Router()
const Report  = require('../models/Report')
const auth    = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json({ reports })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', auth, async (req, res) => {
  try {
    const { fileName, reportType, notes, reportDate } = req.body
    if (!fileName) return res.status(400).json({ error: 'File name is required' })
    const report = await Report.create({ userId: req.userId, fileName, reportType, notes, reportDate })
    res.status(201).json({ report })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!report) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
