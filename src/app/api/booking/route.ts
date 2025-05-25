import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { appendToSheet } from "@/lib/googleSheets"

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, people, date } = body

    // Validate required fields
    if (!name || !email || !people || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Format date
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Create email message
    const msg = {
      to: process.env.CONTACT_EMAIL!, // Your business email
      from: process.env.SENDGRID_FROM_EMAIL!, // Verified sender email
      subject: `New Booking Request from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Number of People: ${people}
        Date: ${formattedDate}
              `,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number of People:</strong> ${people}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
      `,
    }

    // Send email and write to Google Sheets in parallel
    await Promise.all([
      sgMail.send(msg),
      appendToSheet([
        new Date().toISOString(), // Timestamp
        name,
        email,
        people,
        formattedDate,
      ]),
    ])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing booking:", error?.response?.body || error)
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    )
  }
}
