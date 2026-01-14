<div align="center">
  <h1>🎨 Background Remover</h1>
  <p><strong>AI-Powered Background Removal Tool</strong></p>
  <p>Remove image backgrounds instantly with cutting-edge AI technology</p>
  
  ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

## ✨ Features

- 🖼️ **AI-Powered Removal** - Advanced algorithms for precise background removal
- ⚡ **Lightning Fast** - Process images in seconds
- 🎯 **High Accuracy** - Clean edges and professional results
- 💳 **Credit System** - Flexible pay-as-you-go model with Razorpay integration
- 🔐 **Secure Authentication** - Powered by Clerk
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Interactive UI** - Before/after slider to compare results

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **Multer** - File upload handling
- **JWT** - Token-based authentication
- **Razorpay** - Payment processing
- **Clerk Webhooks** - User synchronization

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Clerk Account
- Razorpay Account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/background-remover.git
cd background-remover
```

2. **Setup Client**
```bash
cd client
npm install
```

3. **Setup Server**
```bash
cd ../server
npm install
```

4. **Environment Variables**

Create `.env` file in the **server** directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create `.env` file in the **client** directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

5. **Run the Application**

Start the server:
```bash
cd server
npm run server
```

Start the client:
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
background-remover/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context for state management
│   │   └── assets/          # Static assets
│   └── package.json
│
└── server/                  # Backend Node.js application
    ├── configs/             # Configuration files
    ├── controllers/         # Request handlers
    ├── middlewares/         # Custom middleware
    ├── models/              # Database models
    ├── routes/              # API routes
    └── server.js            # Entry point
```

---

## 🔑 Key Features Explained

### Credit System
Users purchase credits to remove backgrounds. Each successful removal consumes credits from their account.

### Authentication Flow
- User signup/login handled by Clerk
- Webhooks sync user data to MongoDB
- JWT tokens secure API endpoints

### Image Processing
- Upload images via intuitive interface
- AI processes and removes background
- Download high-quality results instantly

---

## 🚀 Deployment

### Vercel Deployment Instructions

**Important:** This is a monorepo - deploy client and server as **separate projects**.

#### Deploy Backend (Server)
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Project Name**: `background-remover-server` (or your choice)
   - **Root Directory**: `server`
   - **Framework Preset**: Other
4. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NODE_ENV=production
   ```
5. Deploy and copy the deployment URL

#### Deploy Frontend (Client)
1. Import repository again in Vercel
2. Configure project:
   - **Project Name**: `background-remover-client`
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BACKEND_URL=your_server_deployment_url
   ```
4. Deploy

#### Update CORS Settings
After deploying, update the CORS origin in `server/server.js` with your frontend deployment URL.

### Troubleshooting Deployment Errors

#### Error: "Database connection failed"
This is the most common error. Follow these steps:

**1. Check MongoDB Atlas Network Access**
- Go to MongoDB Atlas → Network Access
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

**2. Verify Environment Variable in Vercel**
- Go to Vercel Project → Settings → Environment Variables
- Check `MONGODB_URI` exists and is correct
- Format should be: `mongodb+srv://username:password@cluster.mongodb.net`
- **DO NOT** include the database name in the URI (the code adds it automatically)
- Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net` ✅
- Wrong: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/backgroundRemover` ❌

**3. Test Connection String**
- Copy your MONGODB_URI
- Visit your deployment URL: `https://your-server.vercel.app/health`
- Check if database status shows "connected"

**4. Check MongoDB Atlas Cluster**
- Ensure your cluster is running (not paused)
- Free tier clusters pause after 60 days of inactivity
- Resume the cluster if needed

**5. Verify Password Special Characters**
- If your MongoDB password contains special characters (@, #, %, etc.)
- They must be URL-encoded
- Example: `p@ssw0rd` → `p%40ssw0rd`

**6. Redeploy After Changes**
- After updating environment variables in Vercel
- Go to Deployments tab
- Click "..." menu on latest deployment
- Select "Redeploy"

**Error: FUNCTION_INVOCATION_FAILED**
- ✅ Ensure ALL environment variables are set in Vercel dashboard
- ✅ Check Vercel function logs for specific errors
- ✅ Verify Root Directory is set to `server` (not root folder)
- ✅ Try clearing deployment cache and redeploy

**Error: Build Failed**
- ✅ Verify Root Directory is set correctly
- ✅ Check all dependencies are in package.json
- ✅ Clear deployment cache and redeploy

**Database Connection Issues**
- ✅ Whitelist Vercel IPs in MongoDB Atlas (or allow all: 0.0.0.0/0)
- ✅ Verify MONGODB_URI format: `mongodb+srv://user:pass@cluster.mongodb.net`
- ✅ Check MongoDB Atlas cluster is running

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📧 Contact

For questions or support, please open an issue in the repository.

---

<div align="center">
  <p>Made with ❤️ by Your Name</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
