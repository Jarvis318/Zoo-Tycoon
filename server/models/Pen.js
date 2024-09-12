const { Schema, model } = require('mongoose');

const penSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  environment: {
    type: Schema.Types.ObjectId,
    ref: 'Environment',
  },
  animals: [{
    type: Schema.Types.ObjectId,
    ref: 'Animal',
  }],
  unlocked: {
    type: Boolean,
    default: false,
  },
});

const Pen = model('Pen', penSchema);

module.exports = Pen;
