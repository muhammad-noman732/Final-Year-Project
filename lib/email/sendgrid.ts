
import sgMail from "@sendgrid/mail"
import { logger } from "@/lib/logger"

// Initialize SendGrid with API key (only if key is configured)
const SENDGRID_CONFIGURED = !!process.env.SENDGRID_API_KEY
if (SENDGRID_CONFIGURED) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
}

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@gcuf.edu.pk"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// ─── Types ────────────────────────────────────────────────────

interface EmailOptions {
  to: string
  toName?: string
  subject: string
  html: string
}

// ─── Core Send Function ───────────────────────────────────────

async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!SENDGRID_CONFIGURED) {
    // In development without SendGrid, log the email instead of crashing
    logger.warn(
      {
        to: options.to,
        subject: options.subject,
      },
      "SendGrid not configured — email would be sent in production"
    )
    logger.info({ html: options.html }, "Email content (dev only)")
    return false
  }

  try {
    await sgMail.send({
      to: options.to,
      from: { email: FROM_EMAIL, name: "GCUF Fee Management" },
      subject: options.subject,
      html: options.html,
    })

    logger.info({ to: options.to, subject: options.subject }, "Email sent successfully")
    return true
  } catch (error) {
    logger.error({ err: error, to: options.to }, "Failed to send email via SendGrid")
    return false
  }
}

// ─── Template: Welcome / Credential Email ─────────────────────
// Sent when a Super Admin creates an Admin, or Admin creates VC/HOD/Student

export async function sendWelcomeEmail(params: {
  to: string
  name: string
  role: string
  tempPassword: string
  universityName?: string
}): Promise<boolean> {
  const loginUrl = `${APP_URL}/login`
  const roleLabel = params.role.replace("_", " ")

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #d4a843, #b8922e); padding: 32px; text-align: center;">
        <h1 style="margin: 0; color: #0a0e1a; font-size: 24px;">🎓 Welcome to GCUF Fee Management</h1>
      </div>

      <div style="padding: 32px;">
        <p style="font-size: 16px; margin-bottom: 8px;">Hello <strong>${params.name}</strong>,</p>

        <p style="color: #8b949e; line-height: 1.6;">
          Your account has been created as <strong style="color: #d4a843;">${roleLabel}</strong>
          ${params.universityName ? ` for <strong>${params.universityName}</strong>` : ""}.
        </p>

        <div style="background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 12px 0; color: #8b949e; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Login Credentials</p>
          <p style="margin: 4px 0; font-size: 15px;"><strong>Email:</strong> ${params.to}</p>
          <p style="margin: 4px 0; font-size: 15px;"><strong>Temporary Password:</strong> <code style="background: #0d1117; padding: 2px 8px; border-radius: 4px; color: #d4a843;">${params.tempPassword}</code></p>
        </div>

        <p style="color: #f85149; font-size: 14px; margin-bottom: 24px;">
          ⚠️ You will be required to change your password on first login.
        </p>

        <div style="text-align: center;">
          <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4a843, #b8922e); color: #0a0e1a; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: bold; font-size: 15px;">
            Sign In Now →
          </a>
        </div>
      </div>

      <div style="padding: 20px 32px; border-top: 1px solid #21262d; text-align: center;">
        <p style="color: #484f58; font-size: 12px; margin: 0;">
          This is an automated email from GCUF Fee Management System.
          Do not share your credentials with anyone.
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: `Your ${roleLabel} Account — GCUF Fee Management${params.universityName ? ` (${params.universityName})` : ""}`,
    html,
  })
}

// ─── Template: Password Reset Email ───────────────────────────

export async function sendPasswordResetEmail(params: {
  to: string
  name: string
  resetToken: string
}): Promise<boolean> {
  const resetUrl = `${APP_URL}/resetpassword?token=${params.resetToken}`

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #d4a843, #b8922e); padding: 32px; text-align: center;">
        <h1 style="margin: 0; color: #0a0e1a; font-size: 24px;">🔒 Password Reset</h1>
      </div>

      <div style="padding: 32px;">
        <p style="font-size: 16px;">Hello <strong>${params.name}</strong>,</p>
        <p style="color: #8b949e; line-height: 1.6;">
          We received a request to reset your password. Click the button below to set a new password.
          This link expires in <strong>1 hour</strong>.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4a843, #b8922e); color: #0a0e1a; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: bold; font-size: 15px;">
            Reset Password →
          </a>
        </div>

        <p style="color: #8b949e; font-size: 14px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to: params.to,
    toName: params.name,
    subject: "Password Reset — GCUF Fee Management",
    html,
  })
}
