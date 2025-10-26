import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
    shortDescription: {
      en: {
        type: String,
        required: [true, 'Please provide English short description'],
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic short description'],
      },
    },
    image: {
      type: String,
      required: [true, 'Please provide project image'],
    },
    images: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
