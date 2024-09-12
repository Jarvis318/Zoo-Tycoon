const { Schema, model } = require('mongoose');

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pen: {
    type: Schema.Types.ObjectId,
    ref: 'Pen',
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
    max: 4,
  },
  unlocked: {
    type: Boolean,
    default: false,
  },
});

const Animal = model('Animal', animalSchema);

module.exports = Animal;
