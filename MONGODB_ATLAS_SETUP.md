# MongoDB Atlas Setup Guide for CareChat
## Complete Step-by-Step Instructions

**Goal:** Create FREE MongoDB database in the cloud  
**Time:** ~10-15 minutes  
**Cost:** $0

---

## 📋 COMPLETE SETUP WALKTHROUGH

### **STEP 1: Go to MongoDB Atlas Website**

**URL:** https://www.mongodb.com/cloud/atlas

- Click the link
- You'll see "Try Free" or "Sign Up" button
- Click it

---

### **STEP 2: Create Account**

**Option A: Email Signup**
```
1. Enter email address
2. Enter password (make it strong!)
3. Click "Sign Up"
4. Check email for verification link
5. Click verification link
6. Complete security verification if asked
```

**Option B: Google/GitHub Signup** (Easier)
```
1. Click "Sign up with Google" or "Sign up with GitHub"
2. Authorize MongoDB
3. Done automatically
```

**After Email Verification:**
- You'll be taken to account setup
- Fill in company name: "CareChat" (or any name)
- Select use case: "Learning" or "Building an application"
- Click "Finish"

---

### **STEP 3: Create Your First Cluster**

**When you see the dashboard:**

```
1. Click "Create a Deployment" (or "Build a Database")
2. Select "Shared" tier (FREE - default)
3. It shows options:
   ✓ Free Forever
   ✓ 512 MB storage
   ✓ Shared clusters
   (This is what you want!)
4. Click "Create"
```

**Choose Region:**
```
• US East (Northern Virginia) - if in USA
• Europe (Ireland) - if in Europe
• Asia Pacific (closest to you)

Click "Create Cluster"
```

**Wait ~2-3 minutes** for cluster to be created (green checkmark appears)

---

### **STEP 4: Setup Security - IP Whitelist**

**When cluster is ready:**

```
1. On left sidebar, find "Network Access"
2. Click "Network Access"
3. You'll see "IP Whitelist" tab
4. Click "Add IP Address" button
5. Choose option: "Allow access from anywhere"
   (For development - not secure but easier)
   
   OR specify your IP:
   Click "Add only my current IP address"
   
6. Click "Confirm"
7. Wait for it to apply (usually instant)
```

**✅ IP Whitelist is now set!**

---

### **STEP 5: Create Database User**

**Still in Dashboard:**

```
1. On left sidebar, find "Database Access"
2. Click "Database Access"
3. Click "Add New Database User" button
4. Fill in:
   Username: carechat_user
   Password: Click "Generate Secure Password"
              (Use the generated one - it's strong)
   OR type your own (min 8 chars, with special chars)
   
5. Select "Built-in Role": "Atlas Admin" (for now)
6. Click "Add User"
7. Wait for confirmation

Save the password somewhere safe! 🔐
```

**✅ Database user created!**

---

### **STEP 6: Get Connection String**

**This is the most important part!**

```
1. On left sidebar, go to "Clusters"
2. You should see your cluster listed
3. Click "Connect" (or three dots → Connect)
4. A popup appears with options:
   
   Select: "Drivers"
   - Language dropdown: Select "Node.js"
   - Version: "3.12 or later" (default fine)
   
5. Copy the connection string
   (Should look like below)
```

**Example Connection String:**
```
mongodb+srv://carechat_user:YOUR_PASSWORD_HERE@cluster0.mongodb.net/?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD_HERE` with your actual password**

---

## ✅ YOU NOW HAVE:

```
✅ MongoDB Atlas Account
✅ Free Cluster Created (512 MB)
✅ IP Whitelist Configured
✅ Database User Created
✅ Connection String Ready

Connection String: 
mongodb+srv://carechat_user:PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority
```

---

## 🔧 NEXT: SETUP BACKEND TO USE IT

### **Step 7: Create Backend Folder Structure**

**Open Terminal/PowerShell:**

```powershell
# Navigate to your project
cd C:\Users\promy_8ssccf6\ai_chat_bot

# Create backend folder
mkdir backend
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mongoose dotenv cors axios multer bcryptjs
npm install --save-dev nodemon
```

---

### **Step 8: Create .env File**

**Create file:** `backend/.env`

```
# MongoDB
MONGODB_URI=mongodb+srv://carechat_user:YOUR_PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development

# Optional
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
```

**⚠️ IMPORTANT:**
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Never commit this file to GitHub!
- Add to `.gitignore`

---

### **Step 9: Create Main Server File**

**Create file:** `backend/server.js`

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Server is running!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

### **Step 10: Update package.json**

**Edit:** `backend/package.json`

**Find the "scripts" section and change it to:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

---

### **Step 11: Create .gitignore**

**Create file:** `backend/.gitignore`

```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
package-lock.json

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
```

---

### **Step 12: Test the Connection**

**Run the server:**

```powershell
cd C:\Users\promy_8ssccf6\ai_chat_bot\backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB Atlas Connected Successfully!
🚀 Server running on http://localhost:5000
```

**If you see this, YOU'RE CONNECTED!** 🎉

---

### **Step 13: Test API Endpoint**

**Open browser or Postman:**

```
URL: http://localhost:5000/api/health

Response:
{
  "message": "✅ Server is running!"
}
```

---

## 📁 YOUR FOLDER STRUCTURE NOW

```
ai_chat_bot/
├── ai_chat_bot/              (Frontend - React)
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/                  (Backend - Node.js) ✨ NEW
│   ├── node_modules/
│   ├── .env                  (Keep secure!)
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── ...
└── README.md
```

---

## 🎯 QUICK REFERENCE

### **Start Backend**
```bash
cd backend
npm run dev
```

### **Connection Status**
- ✅ Connected: "MongoDB Atlas Connected Successfully!"
- ❌ Error: Check password and IP whitelist

### **MongoDB Credentials**
```
Username: carechat_user
Password: [Your generated password]
Cluster: cluster0.mongodb.net
Database: carechat (auto-created)
```

---

## ⚠️ TROUBLESHOOTING

### **Error: "Authentication failed"**
```
Cause: Wrong password or username
Fix: 
1. Go to MongoDB Atlas
2. Database Access → carechat_user
3. Click "Edit" → "Edit Password"
4. Copy the password in connection string
```

### **Error: "Connection refused"**
```
Cause: IP not whitelisted
Fix:
1. Go to MongoDB Atlas
2. Network Access → Add IP
3. Select "Allow anywhere"
4. Or add your IP: https://whatismyipaddress.com
```

### **Error: "Cluster not found"**
```
Cause: Cluster still loading
Fix: Wait 2-3 minutes for cluster to be ready
Status shown in Clusters page
```

### **Error: "ENOTFOUND"**
```
Cause: No internet or DNS issue
Fix: Check internet connection
Restart terminal and try again
```

---

## ✨ WHAT'S NEXT?

**Now you have:**
- ✅ Backend server running
- ✅ MongoDB connected
- ✅ Ready to build APIs

**Next Steps:**
1. Create database models (User, Report, Chat)
2. Build API endpoints
3. Connect frontend to backend
4. Test end-to-end

---

## 📊 MONGODB ATLAS DASHBOARD OVERVIEW

**Once logged in, you can:**

```
Left Sidebar:
├── Overview - Dashboard
├── Clusters - Your databases
├── Network Access - IP whitelist
├── Database Access - Users & passwords
├── Database Backups - Auto backups
└── Monitoring - Performance metrics
```

**Monitor your database:**
- Collections (tables)
- Storage usage (512 MB max)
- Operation performance
- Connection logs

---

## 🔐 SECURITY REMINDERS

```
✅ DO:
- Use strong passwords
- Keep .env file secret
- Never commit .env to GitHub
- Use HTTPS in production
- Change password periodically

❌ DON'T:
- Share connection string
- Use simple passwords
- Commit .env file
- Use "Allow anywhere" in production
- Leave admin credentials exposed
```

---

## 📞 NEED HELP?

**Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| "Connection timeout" | Whitelist your IP |
| "Auth failed" | Check password |
| "Cluster not ready" | Wait 3 minutes |
| "Command denied" | Check user permissions |
| "No documents found" | Database is empty (OK!) |

---

## 🎉 CONGRATULATIONS!

You now have:
```
✅ MongoDB Atlas account (free)
✅ Live cloud database
✅ Backend server connected
✅ Ready to build APIs
✅ Secure medical data storage
```

**You're ready for Day 2 Backend Development!** 🚀

---

## 📝 SAVE YOUR CONNECTION INFO

```
MongoDB Atlas Login:
Email: [Your email]
Password: [Your account password]

Database User:
Username: carechat_user
Password: [Generated password - save safely!]

Connection String:
mongodb+srv://carechat_user:[PASSWORD]@cluster0.mongodb.net/?retryWrites=true&w=majority

Server:
Running: http://localhost:5000
Health Check: http://localhost:5000/api/health
```

---

**Created:** April 13, 2026  
**Status:** ✅ Complete Setup Guide  
**Next:** Start building APIs! 🚀
