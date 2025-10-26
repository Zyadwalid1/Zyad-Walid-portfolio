# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio to Vercel with a serverless architecture.

## 📋 Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account with a database set up
4. Gemini API key (for AI chatbot)

## 🏗️ Architecture

- **Frontend**: Static React/Vite app on Vercel CDN
- **Backend**: Express.js as serverless functions on Vercel
- **Database**: MongoDB Atlas (cloud database)
- **AI**: Google Gemini API

## 📁 Project Structure

```
My Portfolio/
├── client/           # Frontend (React + Vite)
│   ├── vercel.json   # Frontend Vercel config
│   └── .env.example  # Environment variables template
└── server/           # Backend (Express.js)
    ├── vercel.json   # Backend Vercel config
    └── .env.example  # Environment variables template
```

## 🔧 Step 1: Prepare Your Code

### ✅ Already Configured:

1. **API Configuration** (`client/src/utils/api.js`)
   - Uses `VITE_API_URL` environment variable
   - Falls back to localhost for development

2. **Database Connection** (`server/config/db.js`)
   - Connection caching for serverless
   - Optimized timeouts

3. **Server Export** (`server/server.js`)
   - Exports app for Vercel
   - Conditional local server

4. **Vercel Configs**
   - `client/vercel.json` - Frontend SPA routing
   - `server/vercel.json` - Serverless functions

## 🚀 Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to server folder**
   ```bash
   cd server
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add GEMINI_API_KEY
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   vercel env add ADMIN_EMAIL
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory** to `server`
4. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Random secure string (e.g., use `openssl rand -base64 32`)
   - `GEMINI_API_KEY` - Your Google Gemini API key
   - `EMAIL_USER` - Your email for notifications
   - `EMAIL_PASS` - Your email app password
   - `ADMIN_EMAIL` - Admin email to receive contact form notifications
   - `NODE_ENV` - Set to `production`
5. Click **Deploy**

**Your backend URL will be something like:** `https://your-portfolio-api.vercel.app`

## 🎨 Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. **Navigate to client folder**
   ```bash
   cd ../client
   ```

2. **Set API URL environment variable**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter: `https://your-portfolio-api.vercel.app/api`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository (or create new project)
3. Set **Root Directory** to `client`
4. Add environment variable:
   - `VITE_API_URL` - Your backend URL + `/api` (e.g., `https://your-portfolio-api.vercel.app/api`)
5. Click **Deploy**

**Your frontend URL will be something like:** `https://your-portfolio.vercel.app`

## 🔐 Step 4: Configure Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=your-email@gmail.com
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-portfolio-api.vercel.app/api
```

## 🧪 Step 5: Test Your Deployment

1. **Test Backend Health**
   ```bash
   curl https://your-portfolio-api.vercel.app/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Check if all pages load
   - Test the AI chatbot
   - Try submitting the contact form
   - Test admin login

3. **Test API Endpoints**
   ```bash
   # Get projects
   curl https://your-portfolio-api.vercel.app/api/projects
   
   # Get skills
   curl https://your-portfolio-api.vercel.app/api/skills
   
   # Get profile
   curl https://your-portfolio-api.vercel.app/api/profile
   ```

## 🔄 Step 6: Set Up Auto-Deployment (Optional)

1. In Vercel Dashboard, go to your project settings
2. Connect to GitHub repository
3. Enable auto-deployment on push
4. Choose branch (e.g., `main` or `master`)

Now every push to your repository will automatically deploy!

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function invocations
- Check bandwidth usage
- View error logs

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View connection metrics

## 🐛 Troubleshooting

### Issue: "API not responding"
**Solution:** Check if `VITE_API_URL` is set correctly in frontend environment variables

### Issue: "Database connection timeout"
**Solution:** 
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check if `MONGODB_URI` is correct
- Ensure database user has proper permissions

### Issue: "CORS errors"
**Solution:** Backend already has CORS enabled. If issues persist, check if API URL is correct.

### Issue: "AI chatbot not working"
**Solution:** 
- Verify `GEMINI_API_KEY` is set in backend environment
- Check Vercel function logs for errors
- Ensure rate limiting isn't blocking requests

### Issue: "Cold start delays"
**Solution:** 
- This is normal for serverless functions
- First request may take 1-2 seconds
- Subsequent requests will be faster due to connection caching

## 💰 Pricing

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless function executions
- ✅ Automatic HTTPS
- ✅ Global CDN

### MongoDB Atlas Free Tier Includes:
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Perfect for portfolios

### Google Gemini API:
- ✅ Free tier available
- ✅ Rate limits apply

## 🎯 Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's environment variable system
   - Keep secrets secure

2. **Database**
   - Use connection pooling (already configured)
   - Monitor connection limits
   - Set appropriate timeouts

3. **API Rate Limiting**
   - Already configured in `server.js`
   - Adjust limits based on usage

4. **Monitoring**
   - Check Vercel analytics regularly
   - Monitor MongoDB Atlas metrics
   - Set up error alerts

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Gemini API](https://ai.google.dev/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## ✅ Deployment Checklist

- [ ] MongoDB Atlas database created
- [ ] Gemini API key obtained
- [ ] Email credentials configured
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable set (VITE_API_URL)
- [ ] Health endpoint tested
- [ ] API endpoints tested
- [ ] Frontend loads correctly
- [ ] AI chatbot works
- [ ] Contact form works
- [ ] Admin panel accessible
- [ ] Auto-deployment configured (optional)

## 🎉 You're Done!

Your portfolio is now live with:
- ⚡ Lightning-fast CDN delivery
- 🌍 Global edge network
- 🔒 Automatic HTTPS
- 📈 Auto-scaling
- 💰 100% free hosting

Enjoy your serverless portfolio! 🚀
