import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import def from 'ajv/dist/vocabularies/discriminator';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  details: {
    about: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    streetAddress: { type: String, default: '' },
    region: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    notifications: { type: Boolean, default: false },
  },
  medical: {
    gender: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    bloodType: { type: String, default: '' },
    chronicConditions: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    lifestyleInfo: { type: [String], default: [] },
    pastMedicalConditions: { type: [String], default: [] },
    currentMedications: { type: [String], default: [] },
    additionalDetails: { type: String, default: '' },
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
