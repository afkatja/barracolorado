interface ErrorData {
  error: string
  message?: string
  stack?: string
  additionalData?: Record<string, any>
  endpoint?: string
  userAgent?: string
  timestamp?: string
}

export async function logError(errorData: ErrorData) {
  try {
    // Only log errors in production
    if (process.env.NODE_ENV !== "production") {
      console.error("🚨 Error (development):", errorData)
      return
    }

    const payload = {
      ...errorData,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "server",
    }

    // Send to Netlify function
    const response = await fetch("/.netlify/functions/error-monitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Failed to send error to monitor:", response.statusText)
    }
  } catch (error) {
    // Fallback to console if error monitoring fails
    console.error("Error monitoring failed:", error)
    console.error("Original error:", errorData)
  }
}

// Client-side error handler
export function setupErrorMonitoring() {
  if (typeof window === "undefined") return

  // Catch unhandled promise rejections
  window.addEventListener("unhandledrejection", event => {
    logError({
      error: "Unhandled Promise Rejection",
      message: event.reason?.message || event.reason,
      stack: event.reason?.stack,
      additionalData: {
        type: "unhandledrejection",
        reason: event.reason,
      },
    })
  })

  // Catch JavaScript errors
  window.addEventListener("error", event => {
    logError({
      error: "JavaScript Error",
      message: event.message,
      stack: event.error?.stack,
      additionalData: {
        type: "error",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    })
  })
}
