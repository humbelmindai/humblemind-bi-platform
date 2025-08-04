# HumbleMind Unified Platform - Deployment Guide

## Vercel Deployment Configuration

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Supabase project configured
- PayFast merchant account

### Environment Variables Setup

#### 1. Local Development (.env.local)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xqlhbqfxpiohafrlmyne.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbGhicWZ4cGlvaGFmcmxteW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzQ3MjcsImV4cCI6MjA2OTgxMDcyN30.NvREgzauhFd_4lpVmd6RMWfdqLqv3G2N0IAOj-vUTlQ

# PayFast Configuration
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=17365187
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=s0am9bnarksn8
PAYFAST_SECURITY_KEY=k0XGylo1g88Bd39BpT9LM

# Environment
NODE_ENV=development

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HumbleMind Unified Platform

# PayFast URLs (Development)
NEXT_PUBLIC_PAYFAST_SANDBOX_URL=https://sandbox.payfast.co.za/eng/process
NEXT_PUBLIC_PAYFAST_PRODUCTION_URL=https://www.payfast.co.za/eng/process
```

#### 2. Vercel Production Environment Variables

**Required Environment Variables for Production:**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xqlhbqfxpiohafrlmyne.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbGhicWZ4cGlvaGFmcmxteW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzQ3MjcsImV4cCI6MjA2OTgxMDcyN30.NvREgzauhFd_4lpVmd6RMWfdqLqv3G2N0IAOj-vUTlQ

# PayFast Configuration (Production)
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=17365187
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=s0am9bnarksn8
PAYFAST_SECURITY_KEY=k0XGylo1g88Bd39BpT9LM

# Environment
NODE_ENV=production

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=HumbleMind Unified Platform

# PayFast URLs (Production)
NEXT_PUBLIC_PAYFAST_SANDBOX_URL=https://sandbox.payfast.co.za/eng/process
NEXT_PUBLIC_PAYFAST_PRODUCTION_URL=https://www.payfast.co.za/eng/process
```

### Deployment Steps

#### 1. Connect Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing the HumbleMind platform

#### 2. Configure Environment Variables
1. In the Vercel project settings, go to "Environment Variables"
2. Add each environment variable from the production list above
3. Set the environment to "Production" for all variables
4. Optionally add "Preview" environment for staging deployments

#### 3. Configure Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 4. Deploy
1. Push your code to the main branch
2. Vercel will automatically trigger a deployment
3. Monitor the build logs for any issues
4. Once deployed, your app will be available at the provided URL

### Security Considerations

#### Environment Variable Security
- ✅ **Public Variables**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- 🔒 **Private Variables**: Variables without `NEXT_PUBLIC_` are only available server-side
- 🔒 **PayFast Security Key**: Never expose the security key to the client

#### PayFast Security
- Use sandbox URLs for development and testing
- Use production URLs only for live deployments
- Always verify webhook signatures server-side
- Implement proper error handling for payment failures

#### Supabase Security
- Use Row Level Security (RLS) policies
- Validate user permissions on all database operations
- Use service role keys only for server-side operations
- Implement proper authentication flows

### Monitoring and Maintenance

#### Health Checks
- Set up uptime monitoring for your Vercel deployment
- Monitor PayFast webhook delivery
- Track Supabase connection status
- Set up error alerting

#### Performance Optimization
- Enable Vercel Edge Functions for global performance
- Use Supabase real-time subscriptions efficiently
- Implement proper caching strategies
- Monitor bundle size and loading times

### Troubleshooting

#### Common Issues
1. **Build Failures**: Check TypeScript errors and missing dependencies
2. **Environment Variables**: Ensure all required variables are set in Vercel
3. **PayFast Integration**: Verify merchant credentials and webhook URLs
4. **Supabase Connection**: Check project URL and API keys

#### Debug Steps
1. Check Vercel build logs for errors
2. Verify environment variables are correctly set
3. Test PayFast integration in sandbox mode
4. Validate Supabase connection and permissions

### Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] PayFast webhook URLs updated to production domain
- [ ] Supabase RLS policies configured
- [ ] SSL certificate verified
- [ ] Domain configured (if using custom domain)
- [ ] Monitoring and alerting set up
- [ ] Performance testing completed
- [ ] Security audit performed
- [ ] Documentation updated

### Support and Maintenance

For ongoing support and maintenance:
1. Monitor application logs in Vercel dashboard
2. Set up automated backups for Supabase data
3. Regularly update dependencies
4. Perform security audits
5. Monitor PayFast transaction logs
6. Keep documentation updated 