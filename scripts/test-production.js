#!/usr/bin/env node

// Test script to simulate production environment
require('dotenv').config()

const { spawn } = require('child_process')

console.log('🧪 Testing Production Environment\n')

// Set production environment
process.env.NODE_ENV = 'production'

console.log('📋 Environment Check:')
const requiredVars = [
  'MAILERSEND_API_KEY',
  'FROM_EMAIL', 
  'CONTACT_EMAIL',
  'MAILERSEND_BOOKING_TEMPLATE_ID',
  'GOOGLE_CREDENTIALS',
  'GOOGLE_SHEET_ID',
  'GOOGLE_USER_EMAIL'
]

requiredVars.forEach(varName => {
  const value = process.env[varName]
  const status = value ? '✅' : '❌'
  console.log(`${status} ${varName}: ${value ? 'SET' : 'MISSING'}`)
})

console.log('\n🚀 Starting production-like server...')
console.log('Press Ctrl+C to stop\n')

// Start the development server with production environment
const child = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
})

child.on('close', (code) => {
  console.log(`\n✅ Server stopped with code ${code}`)
})

child.on('error', (error) => {
  console.error('❌ Failed to start server:', error)
}) 