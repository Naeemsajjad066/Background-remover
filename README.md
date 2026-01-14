# 🎨 Background Remover

AI-powered background removal tool with React frontend and Node.js backend.

## 📦 Project Structure

This is a monorepo containing:
- `/client` - React + Vite frontend
- `/server` - Node.js + Express backend

## 🚀 Deployment on Vercel

### Client (Frontend)
1. Import this repository in Vercel
2. Create new project for client
3. Set **Root Directory**: `client`
4. Set **Framework Preset**: `Vite`
5. Add environment variables (see client/.env.example)

### Server (Backend)
1. Import this repository again in Vercel
2. Create new project for server
3. Set **Root Directory**: `server`
4. Add environment variables (see server/.env.example)

## 📝 Environment Variables

### Client
```
VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_BACKEND_URL=your_server_url
```

### Server
```
MONGODB_URI=your_mongodb_uri
CLERK_WEBHOOK_SECRET=your_webhook_secret
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 💻 Local Development

See respective README files:
- [Client README](./client/README.md)
- Server README (coming soon)

---

Made with ❤️
