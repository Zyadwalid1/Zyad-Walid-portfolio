import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'Please provide English name'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic name'],
        trim: true,
      },
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
      required: [true, 'Please provide skill category'],
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
