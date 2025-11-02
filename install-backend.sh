#!/bin/bash

# Fortify Backend Installation Script
# This script installs all required dependencies for the backend

echo "🛡️ Fortify Backend Installation"
echo "================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Installing backend dependencies..."
echo ""

# Core dependencies
echo "Installing database client..."
npm install pg @types/pg

echo "Installing OpenAI client..."
npm install openai

echo "Installing pgvector..."
npm install @pgvector/pg

echo "Installing validation..."
npm install zod

echo "Installing WebSocket support..."
npm install ws @types/ws

echo "Installing UUID generator..."
npm install uuid @types/uuid

# Development dependencies
echo ""
echo "📦 Installing development dependencies..."
npm install -D jest @types/jest
npm install -D @testing-library/react @testing-library/jest-dom

echo ""
echo "✅ All dependencies installed!"
echo ""

# Check if Tiger CLI is installed
echo "🐅 Checking Tiger CLI..."
if ! command -v tiger &> /dev/null; then
    echo "⚠️  Tiger CLI not found."
    echo "Install it with: curl -fsSL https://cli.tigerdata.com | sh"
else
    echo "✅ Tiger CLI is installed"
    tiger --version
fi

echo ""
echo "📋 Next Steps:"
echo "1. Create Tiger Cloud account at https://www.tigerdata.com/"
echo "2. Run: tiger login"
echo "3. Run: tiger service create fortify-main --tier free"
echo "4. Create .env.local with your database URLs"
echo "5. Run: npm run dev"
echo ""
echo "📚 See TIGER-SETUP-GUIDE.md for detailed instructions"
echo ""
