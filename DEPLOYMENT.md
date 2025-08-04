# 🚀 HumbleMind BI Platform - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- GitHub account (amrish@humblemindai.com)
- Vercel account
- Supabase project set up
- PayFast merchant account (for South African payments)

## 🔧 Environment Variables Setup

### Required Environment Variables for Vercel:

1. **NEXT_PUBLIC_SITE_URL** - Your production URL (e.g., https://humblemind-bi.vercel.app)
2. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anonymous key
4. **SUPABASE_SERVICE_ROLE_KEY** - Your Supabase service role key
5. **NEXT_PUBLIC_PAYFAST_MERCHANT_ID** - PayFast merchant ID
6. **NEXT_PUBLIC_PAYFAST_MERCHANT_KEY** - PayFast merchant key
7. **PAYFAST_SECURITY_KEY** - PayFast security passphrase
8. **NODE_ENV** - Set to "production"

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "feat: Complete HumbleMind BI Platform with PayFast integration

- ✅ Complete dashboard with interactive charts
- ✅ Billing management with PayFast integration
- ✅ Authentication system with multi-tenancy
- ✅ Professional UI with responsive design
- ✅ 8 fully functional pages
- ✅ Production-ready with security headers
- ✅ Comprehensive TypeScript coverage"

# Add GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/amrish@humblemindai.com/humblemind-bi-platform.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Project Name: `humblemind-bi-platform`
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)

5. **Add Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all the required environment variables listed above

6. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 3: Configure Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., bi.humblemindai.com)
   - Follow DNS configuration instructions

## 🔒 Security Configuration

### Supabase RLS Policies

Set up Row Level Security policies in your Supabase dashboard:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Example policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);
```

### PayFast Webhook Configuration

1. **In PayFast Dashboard:**
   - Set Notify URL to: `https://your-domain.vercel.app/api/payfast/webhook`
   - Set Return URL to: `https://your-domain.vercel.app/billing?payment=success`
   - Set Cancel URL to: `https://your-domain.vercel.app/billing?payment=cancelled`

2. **Test webhook in PayFast sandbox mode first**

## 📊 Database Setup

### Required Supabase Tables

The application expects these tables in your Supabase database:

1. **profiles** - User profiles
2. **organizations** - Multi-tenant organizations
3. **subscriptions** - Subscription management
4. **subscription_invoices** - Invoice records
5. **activity_log** - Activity tracking
6. **user_notifications** - User notifications

Refer to the database schema in `/Documentation/humblemind-bi-database-schema.md`

## ✅ Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Authentication works (sign up/sign in)
- [ ] Dashboard displays data
- [ ] Billing page loads
- [ ] PayFast test payment works
- [ ] API endpoints respond correctly
- [ ] Environment variables are set
- [ ] HTTPS is working
- [ ] Custom domain configured (if applicable)

## 🔍 Troubleshooting

### Common Deployment Issues:

1. **Build Errors:**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Review build logs in Vercel dashboard

2. **Runtime Errors:**
   - Check Vercel function logs
   - Verify API routes are working
   - Test database connection

3. **PayFast Issues:**
   - Verify webhook URL is accessible
   - Check PayFast credentials
   - Test in sandbox mode first

### Vercel CLI Commands:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel

# Check deployment logs
vercel logs

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

## 📈 Performance Optimization

The application includes:
- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Bundle size optimization
- ✅ Security headers
- ✅ Caching strategies

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 95+

## 🌍 Production URLs

Once deployed, your application will be available at:
- **Main App**: https://humblemind-bi-platform.vercel.app
- **API Endpoints**: https://humblemind-bi-platform.vercel.app/api/*
- **Dashboard**: https://humblemind-bi-platform.vercel.app/dashboard

---

**🚀 Your HumbleMind BI Platform is ready for the South African market!**