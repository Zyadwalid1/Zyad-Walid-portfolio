# 🚀 Serverless Deployment Guide - Vercel

This guide will help you deploy your portfolio as a serverless application on Vercel, eliminating the 60-second cold start issue from Render.

## 📋 Prerequisites

1. **Vercel Account** (Free): [Sign up here](https://vercel.com/signup)
2. **GitHub Account**: Your code should be on GitHub
3. **MongoDB Atlas**: Already set up ✅

## 🏗️ Architecture Overview

### Before (Render):
```
Render Server (Express) → MongoDB
└─ 60-second cold start ❌
```

### After (Vercel Serverless):
```
Vercel Edge Network
├─ Frontend (Static) → CDN
└─ Backend (Serverless Functions) → MongoDB
   └─ Instant wake up ⚡
```

## 📁 Project Structure

Your portfolio is now configured for serverless:

```
My Portfolio/
├── client/              # Frontend (Vite/React)
│   ├── vercel.json     # Frontend config
│   └── ...
├── server/              # Backend (Express → Serverless)
│   ├── vercel.json     # Backend config
│   ├── server.js       # Now exports app for serverless
│   └── ...
```

## 🚀 Deployment Steps

### Option 1: Deploy Both Separately (Recommended)

#### **Step 1: Deploy Backend API**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   
5. **Add Environment Variables**:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ```

6. Click **Deploy**
7. Copy your API URL (e.g., `https://your-api.vercel.app`)

#### **Step 2: Deploy Frontend**

1. Click **"Add New Project"** again
2. Import the same repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-api.vercel.app/api
   ```

5. Click **Deploy**

### Option 2: Deploy as Monorepo (Advanced)

Create a root `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "client/dist"
      }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

## 🔧 Configuration Files Explained

### Backend (`server/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"  // Converts Express to serverless
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"    // All /api/* routes → serverless function
    }
  ]
}
```

### Frontend (`client/vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"  // SPA routing
    }
  ]
}
```

## 🔐 Environment Variables Setup

### Backend Environment Variables (Vercel Dashboard):

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=production
```

### Frontend Environment Variables:

```env
VITE_API_URL=https://your-backend.vercel.app/api
```

## 📝 Update Your Client API Configuration

After deploying the backend, update your frontend API config:

```javascript
// client/src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://your-api.vercel.app/api';
```

## ✅ Verification Steps

After deployment:

1. **Test Backend**:
   - Visit: `https://your-api.vercel.app/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test API Endpoints**:
   - `GET https://your-api.vercel.app/api/projects`
   - `GET https://your-api.vercel.app/api/skills`
   - `GET https://your-api.vercel.app/api/profile`

3. **Test Frontend**:
   - Visit your frontend URL
   - Check if data loads correctly
   - Test admin login
   - Create/edit content

## 🎯 Benefits You Get

### ⚡ Performance
- **0ms cold start** (vs 60 seconds on Render)
- **Global CDN** for frontend
- **Edge caching** for API responses

### 💰 Cost
- **100% FREE** for your use case
- Generous free tier limits:
  - 100GB bandwidth/month
  - Unlimited requests
  - Unlimited deployments

### 🔄 Auto Deployments
- Push to GitHub → Auto deploy
- Preview deployments for PRs
- Instant rollbacks

### 📊 Monitoring
- Built-in analytics
- Error tracking
- Performance insights

## 🐛 Troubleshooting

### Issue: "Module not found"
**Solution**: Make sure all dependencies are in `package.json`

### Issue: "Database connection failed"
**Solution**: Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue: "CORS errors"
**Solution**: Update CORS config in `server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: "Build failed"
**Solution**: Check build logs in Vercel dashboard

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions Guide](https://vercel.com/docs/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

## 🚀 Quick Deploy Commands

If you prefer CLI deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd server
vercel

# Deploy frontend
cd ../client
vercel
```

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for frontend errors
3. Test API endpoints directly
4. Verify environment variables are set correctly

---

## 🎉 Success!

Once deployed, your portfolio will:
- ✅ Load instantly (no cold start)
- ✅ Scale automatically
- ✅ Be globally distributed
- ✅ Have 99.99% uptime
- ✅ Cost $0 per month

Enjoy your serverless portfolio! 🚀
