# 🐙 GitHub Repository Setup Instructions

## 📋 Step-by-Step GitHub Repository Creation

### Step 1: Create Repository on GitHub

1. **Go to GitHub.com and sign in** with your `amrish@humblemindai.com` account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in repository details:**
   - **Repository name**: `humblemind-bi-platform`
   - **Description**: `Complete AI-powered Business Intelligence platform for the South African market with PayFast integration, interactive dashboards, and multi-tenant architecture`
   - **Visibility**: `Public` (or Private if preferred)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

5. **Click "Create repository"**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you the commands. Use these exact commands in your terminal:

```bash
# Navigate to your project directory (if not already there)
cd /Users/amrishseunarain/humblemindai/humblemind-platform

# Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/humblemind-bi-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Alternative with SSH (if you have SSH keys set up):**
```bash
git remote add origin git@github.com:YOUR_USERNAME/humblemind-bi-platform.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Upload

After pushing, you should see all your files on GitHub including:
- ✅ 50+ files uploaded
- ✅ Complete application structure
- ✅ Documentation files
- ✅ Configuration files

## 🚀 Deploy to Vercel (After GitHub Setup)

### Option 1: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** (preferably with your GitHub account)
3. **Click "New Project"**
4. **Import from GitHub:**
   - Select your `humblemind-bi-platform` repository
   - Vercel will automatically detect it's a Next.js project

5. **Configure deployment:**
   - **Project Name**: `humblemind-bi-platform`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

6. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_SITE_URL=https://humblemind-bi-platform.vercel.app
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_PAYFAST_MERCHANT_ID=your_merchant_id
   NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=your_merchant_key
   PAYFAST_SECURITY_KEY=your_security_key
   NODE_ENV=production
   ```

7. **Click "Deploy"**

### Option 2: Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: humblemind-bi-platform
# - In which directory is your code located? ./
```

## 🔧 Post-Deployment Setup

### 1. Update Environment Variables

In your Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add all required environment variables
4. Redeploy if needed

### 2. Configure Custom Domain (Optional)

1. In Vercel dashboard → "Settings" → "Domains"
2. Add your domain (e.g., `bi.humblemindai.com`)
3. Configure DNS settings as instructed

### 3. Set up Supabase

1. Create a new Supabase project
2. Set up the database schema (refer to Documentation/humblemind-bi-database-schema.md)
3. Configure authentication settings
4. Add environment variables to Vercel

### 4. Configure PayFast

1. Set up PayFast merchant account
2. Configure webhook URLs:
   - **Notify URL**: `https://your-domain.vercel.app/api/payfast/webhook`
   - **Return URL**: `https://your-domain.vercel.app/billing?payment=success`
   - **Cancel URL**: `https://your-domain.vercel.app/billing?payment=cancelled`

## ✅ Final Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel project deployed successfully
- [ ] Environment variables configured
- [ ] Supabase project set up
- [ ] PayFast integration configured
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Dashboard displays properly
- [ ] API endpoints respond

## 🌐 Expected URLs

After successful deployment:
- **Production App**: https://humblemind-bi-platform.vercel.app
- **GitHub Repo**: https://github.com/YOUR_USERNAME/humblemind-bi-platform
- **Dashboard**: https://humblemind-bi-platform.vercel.app/dashboard
- **API Health**: https://humblemind-bi-platform.vercel.app/api/payfast/webhook

---

**🎉 Your HumbleMind BI Platform will be live and ready for the South African market!**

**Need help?** Check the TROUBLESHOOTING.md file for common deployment issues.