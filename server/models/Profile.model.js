import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
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
    bio: {
      en: {
        type: String,
        required: [true, 'Please provide English bio'],
      },
      ar: {
        type: String,
        required: [true, 'Please provide Arabic bio'],
      },
    },
    avatar: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
    },
    phone: {
      en: {
        type: String,
        trim: true,
      },
      ar: {
        type: String,
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
    social: {
      github: String,
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
      youtube: String,
      website: String,
    },
    stats: {
      yearsOfExperience: {
        type: Number,
        default: 0,
      },
      projectsCompleted: {
        type: Number,
        default: 0,
      },
      happyClients: {
        type: Number,
        default: 0,
      },
      awards: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
