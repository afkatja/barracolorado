import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
import { NextResponse } from "next/server"

// Initialize MailerSend with API key
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
})

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

    // Create sender and recipient
    const sender = new Sender(process.env.FROM_EMAIL!, "Contact Form")
    const recipient = new Recipient(process.env.CONTACT_EMAIL!)

    // Create email parameters with template
    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo([recipient])
      .setTemplateId(process.env.MAILERSEND_TEMPLATE_ID!)
      .setPersonalization([
        {
          email: process.env.CONTACT_EMAIL!,
          data: {
            name: name,
            email: email,
            message: message,
          },
        },
      ])

    // Send email
    await mailerSend.email.send(emailParams)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
