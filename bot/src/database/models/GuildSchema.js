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
  levelingSystem: {
    // Whether the system is on or off.
    levelingToggle: {
      type: Boolean,
      default: false,
      required: true,
    },
    // Channel to which notifications are to be sent.
    levelChannel: {
      type: String,
      default: 'none',
      required: true
    },
    // Should the recorders behind the left be on or off
    levelRewards: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
});

module.exports = model('guilds', guildSchema);