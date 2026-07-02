const express     = require('express')
const router      = express.Router()
const Appointment = require('../models/Appointment')
const auth        = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ date: 1 })
    res.json({ appointments })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', auth, async (req, res) => {
  try {
    const { title, doctorName, location, date, notes } = req.body
    if (!title || !date) return res.status(400).json({ error: 'Title and date are required' })
    const appointment = await Appointment.create({ userId: req.userId, title, doctorName, location, date: new Date(date), notes })
    res.status(201).json({ appointment })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    if (!appointment) return res.status(404).json({ error: 'Not found' })
    res.json({ appointment })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!appointment) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
