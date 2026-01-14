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
