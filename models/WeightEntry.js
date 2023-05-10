const mongoose = require('mongoose');

const weightEntrySchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);

module.exports = WeightEntry;
