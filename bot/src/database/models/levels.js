const { Schema, model } = require('mongoose');

const levelsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('levels', levelsSchema);