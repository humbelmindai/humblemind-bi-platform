#!/bin/bash

echo "🚀 Starting HumbleMind BI Platform Development Server..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Kill any existing processes on port 3000
echo "🔄 Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "✅ Port 3000 is available"

# Start the development server
echo "🌟 Starting the development server on http://localhost:3000"
echo ""
echo "🎯 Available pages:"
echo "   • Home: http://localhost:3000"
echo "   • Auth: http://localhost:3000/auth"
echo "   • Dashboard: http://localhost:3000/dashboard"
echo "   • Billing: http://localhost:3000/billing"
echo "   • Profile: http://localhost:3000/profile"
echo "   • Settings: http://localhost:3000/settings"
echo "   • Store: http://localhost:3000/store"
echo "   • Support: http://localhost:3000/support"
echo ""
echo "📋 Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

npm run dev