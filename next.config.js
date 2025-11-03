/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  
  // Expose environment variables to runtime
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TIGER_DATABASE_URL: process.env.TIGER_DATABASE_URL,
  },
  
  // Performance optimizations
  compiler: {
    // Keep console logs for debugging - can be re-enabled later
    removeConsole: false,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Compression
  compress: true,
  
  // Output optimization
  output: 'standalone',
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
