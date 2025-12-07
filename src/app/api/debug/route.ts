import { NextResponse } from "next/server"

import { appendToSheet } from "@/lib/googleSheets"

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      MAILERSEND_API_KEY: !!process.env.MAILERSEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
      MAILERSEND_BOOKING_TEMPLATE_ID:
        !!process.env.MAILERSEND_BOOKING_TEMPLATE_ID,
      GOOGLE_CREDENTIALS: !!process.env.GOOGLE_CREDENTIALS,
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_USER_EMAIL: !!process.env.GOOGLE_USER_EMAIL,
    }

    // Test Google Sheets connection
    let sheetTest = null
    try {
      await appendToSheet([
        new Date().toISOString(),
        "DEBUG TEST",
        "debug@test.com",
        1,
        "Debug Test Date",
        "Debug Package",
      ])
      sheetTest = {
        success: true,
        message: "Successfully wrote to Google Sheets",
      }
    } catch (error: any) {
      sheetTest = {
        success: false,
        error: error.message,
        details: {
          code: error.code,
          status: error.status,
          response: error.response?.data,
        },
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: envCheck,
      googleSheets: sheetTest,
      nodeEnv: process.env.NODE_ENV,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Debug endpoint failed",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
