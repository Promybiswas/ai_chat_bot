const mongoose = require('mongoose')

const UNITS = {
  blood_pressure: 'mmHg',
  blood_sugar:    'mg/dL',
  weight:         'kg',
  heart_rate:     'bpm',
  temperature:    '°F',
  oxygen_level:   '%',
}

const healthRecordSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:       { type: String, required: true, enum: Object.keys(UNITS) },
  value:      { type: String, required: true },
  unit:       { type: String },
  notes:      { type: String, default: '' },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true })

healthRecordSchema.pre('save', function (next) {
  if (!this.unit) this.unit = UNITS[this.type] || ''
  next()
})

module.exports = mongoose.model('HealthRecord', healthRecordSchema)
