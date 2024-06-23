const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  details: {
    name: {
      type: String,
      default: "",
      required: false
    },
    email: {
      type: String,
      required: false,
      unique: false,
      default: "",
      match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    phone: {
      type: String,
      required: false,
      default: "",
      match: [/^\d{10}$/, 'is invalid']
    }
  }
}, { timestamps: false });

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare given password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
