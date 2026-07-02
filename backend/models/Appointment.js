const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:      { type: String, required: true },
  doctorName: { type: String, default: '' },
  location:   { type: String, default: '' },
  date:       { type: Date, required: true },
  notes:      { type: String, default: '' },
  status:     { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)
