import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'Please provide English course name'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic course name'],
        trim: true,
      },
    },
    company: {
      type: String,
      required: [true, 'Please provide company/platform name'],
      trim: true,
    },
    location: {
      en: {
        type: String,
        trim: true,
      },
      ar: {
        type: String,
        trim: true,
      },
    },
    date: {
      type: Date,
      required: [true, 'Please provide course completion date'],
    },
    certificateUrl: {
      type: String,
      trim: true,
    },
    certificateImage: {
      type: String,
      trim: true,
    },
    description: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
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

const Course = mongoose.model('Course', courseSchema);

export default Course;
