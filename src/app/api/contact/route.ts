import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create email message
    const msg = {
      to: process.env.CONTACT_EMAIL!, // Your business email
      from: process.env.SENDGRID_FROM_EMAIL!, // Verified sender email
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send email
    await sgMail.send(msg)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error sending email:", error?.response?.body || error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
