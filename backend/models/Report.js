const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName:   { type: String, required: true },
  reportType: { type: String, default: 'General', enum: ['General', 'Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'ECG', 'Urine Test', 'Other'] },
  notes:      { type: String, default: '' },
  reportDate: { type: Date, default: Date.now },
  extractedText: { type: String, default: '' },
  fileSize:   { type: Number, default: 0 },
  storedFileName: { type: String, default: '' },
  mimeType:   { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema)
