import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'Please provide English category name'],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic category name'],
        trim: true,
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      en: {
        type: String,
        trim: true,
      },
      ar: {
        type: String,
        trim: true,
      },
    },
    color: {
      type: String,
      default: '#6366f1', // Default indigo color
    },
    icon: {
      type: String,
      default: 'Folder', // Lucide icon name
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
