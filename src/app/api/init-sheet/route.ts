import { NextResponse } from "next/server"
import { create } from "@/lib/googleSheets"

export async function POST() {
  try {
    const spreadsheetId = await create("Booking Requests")
    console.log("Spreadsheet created successfully with ID:", spreadsheetId)

    return NextResponse.json({
      success: true,
      spreadsheetId,
      message:
        "Spreadsheet created successfully. Please save the spreadsheetId in your .env.local file.",
    })
  } catch (error: any) {
    console.error("Error creating spreadsheet:", error)
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
    })
    return NextResponse.json(
      {
        error: "Failed to create spreadsheet",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
