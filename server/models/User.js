const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: { //Remove later
    type: String,
    required: true,
    minlength: 5,
  },
  currency: {
    type: BigInt,
    default: 500000000000, //Can't go higher than this
  },
  clickAmount: {
    type: Number,
    default: 1,
  },
  unlockedEnvironments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Environment',
    },
  ],
  // unlockedPens: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Pen',
  //   }
  // ],
  // unlockedAnimals: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Animal',
  //   }
  // ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
