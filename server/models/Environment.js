const { Schema, model } = require('mongoose');

const environmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pens: [{
    type: Schema.Types.ObjectId,
    ref: 'Pen',
  }],
  unlocked: {
    type: Boolean,
    default: false,
  },
});

const Environment = model('Environment', environmentSchema);

module.exports = Environment;
