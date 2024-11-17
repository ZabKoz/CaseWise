const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'en',
    required: true,
  },
});

module.exports = model('settings', guildSchema);