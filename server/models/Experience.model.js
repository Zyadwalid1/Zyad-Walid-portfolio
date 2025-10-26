import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, 'Please provide English title'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic title'],
        trim: true,
      },
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    location: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
    },
    description: {
      en: {
        type: String,
        required: [true, 'Please provide English description'],
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic description'],
      },
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide start date'],
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    certificationImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
