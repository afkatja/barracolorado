#!/usr/bin/env node

// Debug script to check environment variables and test API endpoints
require('dotenv').config()

console.log('🔍 Environment Variables Debug\n')

const requiredEnvVars = {
  MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  MAILERSEND_BOOKING_TEMPLATE_ID: process.env.MAILERSEND_BOOKING_TEMPLATE_ID,
  GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_USER_EMAIL: process.env.GOOGLE_USER_EMAIL,
}

console.log('📋 Environment Variables Status:')
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌'
  const displayValue = value ? `${value.substring(0, 20)}...` : 'NOT SET'
  console.log(`${status} ${key}: ${displayValue}`)
})

console.log('\n🔧 Google Credentials Check:')
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}')
  const hasClientEmail = !!credentials.client_email
  const hasPrivateKey = !!credentials.private_key
  
  console.log(`✅ Client Email: ${hasClientEmail ? 'Present' : 'Missing'}`)
  console.log(`✅ Private Key: ${hasPrivateKey ? 'Present' : 'Missing'}`)
  
  if (!hasClientEmail || !hasPrivateKey) {
    console.log('❌ Google credentials are incomplete')
  }
} catch (error) {
  console.log('❌ Failed to parse GOOGLE_CREDENTIALS:', error.message)
}

console.log('\n🚀 To test the booking API locally:')
console.log('1. Make sure all environment variables are set')
console.log('2. Run: npm run dev')
console.log('3. Submit a booking form')
console.log('4. Check the console logs for detailed error information')

console.log('\n📝 To simulate production environment:')
console.log('1. Set NODE_ENV=production')
console.log('2. Ensure all environment variables are in your .env.local file')
console.log('3. Run: NODE_ENV=production npm run dev') 