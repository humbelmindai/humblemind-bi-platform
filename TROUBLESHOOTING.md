# 🔧 HumbleMind BI Platform - Troubleshooting Guide

## 🚀 Quick Start Instructions

### Method 1: Use the Startup Script
```bash
cd /Users/amrishseunarain/humblemindai/humblemind-platform
./start-dev.sh
```

### Method 2: Manual Start
```bash
cd /Users/amrishseunarain/humblemindai/humblemind-platform
npm run dev
```

The server should start on **http://localhost:3000**

## 🔍 Common Issues & Solutions

### Issue 1: "Site can't be reached"

**Possible Causes:**
- Development server not running
- Port conflict
- Firewall blocking the connection
- Wrong URL

**Solutions:**
1. **Check if server is running:**
   ```bash
   lsof -i :3000
   ```

2. **Kill existing processes and restart:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm run dev
   ```

3. **Try different port:**
   ```bash
   npx next dev -p 3001
   ```
   Then visit http://localhost:3001

4. **Check network interface:**
   - Try http://127.0.0.1:3000 instead of localhost
   - Check your hosts file: `cat /etc/hosts`

### Issue 2: Build Errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 3: Environment Variables

**Check .env.local file exists:**
```bash
ls -la .env.local
```

**If missing, create basic .env.local:**
```bash
cat > .env.local << EOF
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PAYFAST_SECURITY_KEY=your_payfast_security_key
EOF
```

### Issue 4: Dependencies Issues

**Reinstall all dependencies:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 🌐 Accessing the Application

Once the server is running, you can access:

### 🏠 **Main Pages**
- **Home**: http://localhost:3000
- **Authentication**: http://localhost:3000/auth
- **Dashboard**: http://localhost:3000/dashboard
- **Billing**: http://localhost:3000/billing
- **Profile**: http://localhost:3000/profile
- **Settings**: http://localhost:3000/settings
- **Store**: http://localhost:3000/store
- **Support**: http://localhost:3000/support

### 🔌 **API Endpoints**
- **PayFast Webhook**: http://localhost:3000/api/payfast/webhook
- **Create Payment**: http://localhost:3000/api/payfast/create-payment

## 🐛 Debug Mode

**Run with verbose logging:**
```bash
DEBUG=* npm run dev
```

**Check server logs:**
The development server will show detailed logs in the terminal including:
- Page compilation status
- API route calls
- Error messages
- Performance metrics

## 📋 System Requirements Check

**Node.js Version:**
```bash
node --version  # Should be 18+ or 20+
```

**NPM Version:**
```bash
npm --version   # Should be 8+ or 9+
```

**Available Memory:**
```bash
free -h  # Ensure you have sufficient RAM
```

## 🔧 Alternative Start Methods

### Method 1: Direct Next.js
```bash
npx next dev
```

### Method 2: Using PM2 (for persistent running)
```bash
npm install -g pm2
pm2 start "npm run dev" --name humblemind-dev
pm2 logs humblemind-dev
```

### Method 3: Production Build Test
```bash
npm run build
npm run start
```

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check the terminal output** for specific error messages
2. **Verify all files are present** in the project directory
3. **Ensure port 3000 is not blocked** by your firewall
4. **Try accessing from a different browser** or incognito mode
5. **Check if antivirus software** is blocking the connection

## ✅ Success Indicators

When everything is working correctly, you should see:

```
✓ Ready in [time]ms
- Local: http://localhost:3000
- Network: http://[your-ip]:3000
```

And the pages should load with:
- Professional HumbleMind branding
- Responsive design
- Interactive dashboard components
- Working navigation between pages

---

**Build Status**: ✅ Complete and Ready
**Last Updated**: 2025-08-04
**Support**: All components functional and tested