# 🚀 Full-Stack MERN Portfolio

A powerful, modern portfolio application with admin panel, multi-language support, multiple themes, 3D graphics, and smooth animations.

## ✨ Features

- 🎨 **4+ Theme Options** - Multiple beautiful themes with dark/light mode variants
- 🌍 **Multi-language** - Support for English and Arabic (RTL)
- 🎭 **3D Graphics** - Interactive 3D elements using Three.js
- ✨ **Smooth Animations** - Beautiful animations powered by Framer Motion
- 🔐 **Admin Panel** - Full content management system without code changes
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast & Modern** - Built with React 18, Vite, and ES6+

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Three.js & React Three Fiber
- Framer Motion
- TailwindCSS
- React Router
- i18next
- Zustand (state management)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- ES6+ modules

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🎯 Usage

### Default Admin Credentials
- Email: `admin@portfolio.com`
- Password: `admin123`

**⚠️ Change these credentials after first login!**

### Admin Panel Features
- ➕ Add/Edit/Delete Projects
- 📝 Manage Skills
- 👤 Update Profile Information
- 📧 View Contact Messages
- 🎓 Manage Education & Experience

## 🎨 Themes

The portfolio comes with multiple pre-configured themes:
1. **Ocean Blue** - Professional blue gradient theme
2. **Sunset Orange** - Warm and energetic theme
3. **Forest Green** - Natural and calm theme
4. **Royal Purple** - Creative and bold theme
5. **Rose Gold** - Elegant and modern theme
6. **Cyber Dark** - Futuristic dark theme

Each theme has both light and dark mode variants.

## 🌍 Languages

- English (LTR)
- Arabic (RTL) - Full RTL support

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register (disabled in production)
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile (admin)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)

## 🔒 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation

## 🚀 Deployment

### Backend
- Deploy to: Heroku, Railway, Render, or DigitalOcean
- Set environment variables
- Connect to MongoDB Atlas

### Frontend
- Deploy to: Vercel, Netlify, or Cloudflare Pages
- Update API base URL
- Build command: `npm run build`

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📧 Support

For support, email your-email@example.com or open an issue.
