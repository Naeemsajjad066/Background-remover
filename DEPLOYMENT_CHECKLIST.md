# 🚀 Deployment Checklist

## Pre-Deployment Steps

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a cluster
- [ ] Create database user with password
- [ ] **Important:** Go to Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
- [ ] Get connection string (without database name)

### 2. Clerk Setup
- [ ] Create Clerk account
- [ ] Create application
- [ ] Get publishable key
- [ ] Get webhook secret
- [ ] Configure webhook endpoint (will be: `https://your-server.vercel.app/api/user/webhooks`)

### 3. Razorpay Setup
- [ ] Create Razorpay account
- [ ] Get API Key ID
- [ ] Get API Key Secret

---

## Vercel Deployment

### Deploy Backend First

1. **Import Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository

2. **Configure Project**
   - Project Name: `background-remover-server`
   - Root Directory: `server` ⚠️ **CRITICAL**
   - Framework Preset: Other

3. **Add Environment Variables** (Click "Add" for each)
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   JWT_SECRET=your_random_secret_key
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxx
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - **Copy the deployment URL** (e.g., `https://background-remover-server.vercel.app`)

5. **Test Backend**
   - Visit: `https://your-server.vercel.app/health`
   - Should see: `{ "status": "ok", "database": "connected" }`
   - If database shows "disconnected", check MongoDB Atlas Network Access

### Deploy Frontend

1. **Import Repository Again**
   - Go to https://vercel.com/new
   - Import the same repository

2. **Configure Project**
   - Project Name: `background-remover-client`
   - Root Directory: `client` ⚠️ **CRITICAL**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   VITE_BACKEND_URL=https://your-server.vercel.app
   ```
   ⚠️ Use the server URL from step 4 above

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

---

## Post-Deployment Steps

### 1. Update CORS in Backend
- Edit `server/server.js`
- Update the CORS origin array with your frontend URL:
  ```javascript
  origin: [
    "https://your-frontend.vercel.app",
    "http://localhost:5173"
  ]
  ```
- Commit and push changes
- Vercel will auto-redeploy

### 2. Update Clerk Webhook
- Go to Clerk Dashboard → Webhooks
- Add endpoint: `https://your-server.vercel.app/api/user/webhooks`
- Select events: `user.created`, `user.updated`
- Copy webhook secret and update in Vercel if changed

### 3. Test Complete Flow
- [ ] Visit frontend URL
- [ ] Sign up / Login with Clerk
- [ ] Check MongoDB to verify user was created
- [ ] Upload an image
- [ ] Try background removal
- [ ] Check payment flow

---

## Common Issues & Solutions

### Database Connection Failed
✅ **Solution:**
1. MongoDB Atlas → Network Access → Allow 0.0.0.0/0
2. Check MONGODB_URI doesn't include database name
3. URL-encode special characters in password
4. Redeploy after changing environment variables

### CORS Error
✅ **Solution:**
1. Update CORS origins in `server/server.js`
2. Include your frontend Vercel URL
3. Push changes to trigger redeploy

### Webhook Not Working
✅ **Solution:**
1. Verify webhook URL in Clerk dashboard
2. Check CLERK_WEBHOOK_SECRET matches in Vercel
3. View function logs in Vercel for errors

### Environment Variables Not Applied
✅ **Solution:**
1. After adding/changing env vars in Vercel
2. Go to Deployments → Latest → Menu → Redeploy
3. Environment variables only apply on new deployments

---

## Quick Reference

### Health Check Endpoints
- Backend: `https://your-server.vercel.app/health`
- Root: `https://your-server.vercel.app/`

### Vercel Logs
- Project → Deployments → Latest → View Function Logs
- Check for specific error messages

### MongoDB Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net
```
**Note:** Don't include database name or `/backgroundRemover`

---

## Need Help?

1. Check Vercel function logs for errors
2. Visit health endpoint to check DB status
3. Verify all environment variables are set
4. Review MongoDB Atlas network access settings
5. Check this repository's issues for similar problems
