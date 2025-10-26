# ✅ Serverless Deployment Checklist

## 📋 Pre-Deployment

- [ ] **MongoDB Atlas Setup**
  - [ ] Database is accessible from anywhere (0.0.0.0/0)
  - [ ] Connection string is ready
  - [ ] Database has initial data (run seeds if needed)

- [ ] **GitHub Repository**
  - [ ] All code is pushed to GitHub
  - [ ] `.env` files are in `.gitignore`
  - [ ] Code is on main/master branch

- [ ] **Environment Variables Ready**
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `VITE_API_URL` (will be set after backend deployment)

## 🚀 Backend Deployment (Step 1)

- [ ] Go to [Vercel Dashboard](https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import your repository
- [ ] **Project Settings:**
  - [ ] Framework Preset: **Other**
  - [ ] Root Directory: **server**
  - [ ] Build Command: **(leave empty)**
  - [ ] Output Directory: **(leave empty)**
  
- [ ] **Add Environment Variables:**
  ```
  MONGODB_URI=mongodb+srv://...
  JWT_SECRET=your-secret-here
  NODE_ENV=production
  ```

- [ ] Click **Deploy**
- [ ] Wait for deployment to complete
- [ ] **Copy your API URL**: `https://your-api.vercel.app`

## ✅ Test Backend

- [ ] Visit: `https://your-api.vercel.app/health`
  - Should see: `{"status":"OK","message":"Server is running"}`
- [ ] Test: `https://your-api.vercel.app/api/projects`
  - Should return your projects array
- [ ] Test: `https://your-api.vercel.app/api/skills`
  - Should return your skills array

## 🎨 Frontend Deployment (Step 2)

- [ ] In Vercel, click "Add New Project" again
- [ ] Import the same repository
- [ ] **Project Settings:**
  - [ ] Framework Preset: **Vite**
  - [ ] Root Directory: **client**
  - [ ] Build Command: **npm run build**
  - [ ] Output Directory: **dist**

- [ ] **Add Environment Variables:**
  ```
  VITE_API_URL=https://your-api.vercel.app/api
  ```
  *(Use the API URL from Step 1)*

- [ ] Click **Deploy**
- [ ] Wait for deployment to complete
- [ ] **Copy your Frontend URL**: `https://your-portfolio.vercel.app`

## ✅ Test Frontend

- [ ] Visit your portfolio URL
- [ ] Check if homepage loads correctly
- [ ] Navigate through all pages:
  - [ ] Home
  - [ ] Projects
  - [ ] About
  - [ ] Contact
- [ ] Test Admin Panel:
  - [ ] Login at `/admin/login`
  - [ ] Create/Edit content
  - [ ] Upload images
  - [ ] Check all CRUD operations

## 🔧 Final Configuration

- [ ] **Update CORS** (if needed):
  - In `server/server.js`, add your frontend URL to CORS whitelist
  - Redeploy backend if changes made

- [ ] **Custom Domain** (Optional):
  - Add custom domain in Vercel project settings
  - Update DNS records
  - Wait for SSL certificate

## 📊 Performance Check

- [ ] Test cold start time (should be < 1 second)
- [ ] Check page load speed
- [ ] Verify API response times
- [ ] Test on mobile devices

## 🎉 Success Indicators

✅ **Backend:**
- Health check returns OK
- All API endpoints work
- No cold start delays
- MongoDB connects successfully

✅ **Frontend:**
- All pages load correctly
- Images display properly
- Admin panel works
- Data fetches from API
- Routing works (SPA)

✅ **Overall:**
- No 60-second delays ⚡
- Portfolio loads instantly
- Admin can create/edit content
- Contact form submits successfully

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to database"
```
Solution: Check MongoDB Atlas allows 0.0.0.0/0
```

### Issue: "CORS error"
```
Solution: Add frontend URL to CORS in server.js
```

### Issue: "404 on page refresh"
```
Solution: Check vercel.json has rewrite rules
```

### Issue: "Environment variables not working"
```
Solution: Redeploy after adding env vars in Vercel
```

### Issue: "Build failed"
```
Solution: Check build logs, ensure all dependencies are in package.json
```

## 📝 Post-Deployment

- [ ] Update README with live URLs
- [ ] Share your portfolio link
- [ ] Monitor Vercel analytics
- [ ] Set up error monitoring (optional)

## 🔄 Future Updates

To update your portfolio:
1. Make changes locally
2. Push to GitHub
3. Vercel auto-deploys ✨

---

**Need Help?** Check `SERVERLESS_DEPLOYMENT_GUIDE.md` for detailed instructions.

**Estimated Time:** 15-20 minutes total 🚀
