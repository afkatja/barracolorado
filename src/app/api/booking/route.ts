import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
import { NextResponse } from "next/server"

import { appendToSheet } from "@/lib/googleSheets"

// Initialize MailerSend with API key
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, people, date, packageTitle } = body

    // Validate required fields
    if (!name || !email || !people || !date || !packageTitle) {
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

    // Create sender and recipient
    const sender = new Sender(process.env.FROM_EMAIL!, "Booking Form")
    const recipient = new Recipient(process.env.CONTACT_EMAIL!)

    // Create email parameters with template
    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo([recipient])
      .setTemplateId(process.env.MAILERSEND_BOOKING_TEMPLATE_ID!)
      .setPersonalization([
        {
          email: process.env.CONTACT_EMAIL!,
          data: {
            name: name,
            email: email,
            people: people,
            date: formattedDate,
            packageTitle: packageTitle,
          },
        },
      ])

    // Send email and write to Google Sheets in parallel
    await Promise.all([
      mailerSend.email.send(emailParams),
      appendToSheet([
        new Date().toISOString(), // Timestamp
        name,
        email,
        people,
        formattedDate,
        packageTitle,
      ]),
    ])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing booking:", error)
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    )
  }
}
