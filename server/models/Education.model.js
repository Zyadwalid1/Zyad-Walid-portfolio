import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: {
      en: {
        type: String,
        required: [true, 'Please provide English degree'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic degree'],
        trim: true,
      },
    },
    institution: {
      en: {
        type: String,
        required: [true, 'Please provide English institution'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic institution'],
        trim: true,
      },
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
      },
      ar: {
        type: String,
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
    grade: {
      type: String,
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

const Education = mongoose.model('Education', educationSchema);

export default Education;
