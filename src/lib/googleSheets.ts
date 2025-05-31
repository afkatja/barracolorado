import { google } from "googleapis"

const { GoogleAuth } = require("google-auth-library")

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}")

const auth = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key?.replace(/\\n/g, "\n"),
  },
})

export async function create(title: string) {
  const service = google.sheets({ version: "v4", auth })
  const drive = google.drive({ version: "v3", auth })

  try {
    // Create spreadsheet
    const spreadsheet = await service.spreadsheets.create({
      requestBody: {
        properties: { title },
        sheets: [
          {
            properties: {
              title: "Bookings",
              gridProperties: {
                rowCount: 1000,
                columnCount: 5,
              },
            },
          },
        ],
      },
    })

    const spreadsheetId = spreadsheet.data.spreadsheetId
    if (!spreadsheetId) throw new Error("Failed to create spreadsheet")

    // Add headers
    await service.spreadsheets.values.update({
      spreadsheetId,
      range: "Bookings!A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Timestamp", "Name", "Email", "People", "Date"]],
      },
    })

    // Share the spreadsheet with your email
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: process.env.GOOGLE_USER_EMAIL,
      },
    })

    // Set the spreadsheet ID in environment
    process.env.GOOGLE_SHEET_ID = spreadsheetId

    return spreadsheetId
  } catch (err) {
    console.error("Error creating spreadsheet", err)
    throw err
  }
}

const sheets = google.sheets({ version: "v4", auth })

export async function appendToSheet(values: any[]) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Bookings!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    })
    return response.data
  } catch (error) {
    console.error("Error appending to sheet:", error)
    throw error
  }
}
