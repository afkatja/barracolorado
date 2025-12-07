const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend")

// Initialize MailerSend for error notifications
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
})

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const errorData = JSON.parse(event.body)
    
    // Log error to console (will appear in Netlify function logs)
    console.error('🚨 Application Error:', {
      timestamp: new Date().toISOString(),
      ...errorData
    })

    // Send error notification email if configured
    if (process.env.ERROR_NOTIFICATION_EMAIL && process.env.MAILERSEND_API_KEY) {
      try {
        const sender = new Sender(process.env.FROM_EMAIL, "Error Monitor")
        const recipient = new Recipient(process.env.ERROR_NOTIFICATION_EMAIL)

        const emailParams = new EmailParams()
          .setFrom(sender)
          .setTo([recipient])
          .setSubject(`🚨 Application Error: ${errorData.error || 'Unknown Error'}`)
          .setHtml(`
            <h2>Application Error Detected</h2>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'unknown'}</p>
            <p><strong>Error:</strong> ${errorData.error || 'Unknown'}</p>
            <p><strong>Message:</strong> ${errorData.message || 'No message'}</p>
            <p><strong>Stack:</strong></p>
            <pre>${errorData.stack || 'No stack trace'}</pre>
            <p><strong>Additional Data:</strong></p>
            <pre>${JSON.stringify(errorData.additionalData || {}, null, 2)}</pre>
          `)

        await mailerSend.email.send(emailParams)
        console.log('✅ Error notification email sent')
      } catch (emailError) {
        console.error('Failed to send error notification email:', emailError)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Error logged successfully' 
      })
    }
  } catch (error) {
    console.error('Error in error monitor function:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process error log' 
      })
    }
  }
} 