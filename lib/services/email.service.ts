// ═══════════════════════════════════════════════════════════════
//  EmailService — SendGrid email delivery
//  In dev without API key: logs email content instead of sending.
// ═══════════════════════════════════════════════════════════════

import sgMail from "@sendgrid/mail"
import { logger } from "@/lib/logger"
import type { WelcomeEmailParams, PasswordResetEmailParams } from "@/types/server/auth.types"

interface EmailServiceConfig {
  apiKey?:    string
  fromEmail:  string
  appUrl:     string
}

export class EmailService {
  private readonly isConfigured: boolean
  private readonly fromEmail: string
  private readonly appUrl: string

  constructor(config: EmailServiceConfig) {
    this.isConfigured = !!config.apiKey
    this.fromEmail = config.fromEmail
    this.appUrl = config.appUrl

    if (this.isConfigured) {
      sgMail.setApiKey(config.apiKey!)
    }
  }

  // ─── Private: core sender ───────────────────────────────────

  private async send(to: string, subject: string, html: string): Promise<boolean> {
    if (!this.isConfigured) {
      logger.warn({ to, subject }, "SendGrid not configured — email skipped (dev mode)")
      logger.info({ html }, "Email content (dev only)")
      return false
    }

    try {
      await sgMail.send({
        to,
        from: { email: this.fromEmail, name: "GCUF Fee Management" },
        subject,
        html,
      })
      logger.info({ to, subject }, "Email sent via SendGrid")
      return true
    } catch (error) {
      logger.error({ err: error, to }, "SendGrid delivery failed")
      return false
    }
  }

  // ─── Welcome / Credential Email ─────────────────────────────

  async sendWelcomeEmail(params: WelcomeEmailParams): Promise<boolean> {
    const loginUrl = `${this.appUrl}/login`
    const roleLabel = params.role.replace("_", " ")

    const html = `
    <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e6edf3;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#d4a843,#b8922e);padding:32px;text-align:center">
        <h1 style="margin:0;color:#0a0e1a;font-size:24px">🎓 Welcome to GCUF Fee Management</h1>
      </div>
      <div style="padding:32px">
        <p>Hello <strong>${params.name}</strong>,</p>
        <p style="color:#8b949e">Your <strong style="color:#d4a843">${roleLabel}</strong> account has been created${params.universityName ? ` for <strong>${params.universityName}</strong>` : ""}.</p>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:20px;margin:24px 0">
          <p style="margin:0 0 12px;color:#8b949e;font-size:13px;text-transform:uppercase;letter-spacing:1px">Login Credentials</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${params.to}</p>
          <p style="margin:4px 0"><strong>Temporary Password:</strong> <code style="background:#0d1117;padding:2px 8px;border-radius:4px;color:#d4a843">${params.tempPassword}</code></p>
        </div>
        <p style="color:#f85149;font-size:14px">⚠️ You must change your password on first login.</p>
        <div style="text-align:center">
          <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#d4a843,#b8922e);color:#0a0e1a;text-decoration:none;padding:14px 40px;border-radius:8px;font-weight:bold">Sign In Now →</a>
        </div>
      </div>
    </div>`

    return this.send(params.to, `Your ${roleLabel} Account — GCUF Fee Management`, html)
  }

  // ─── Password Reset Email ───────────────────────────────────

  async sendPasswordResetEmail(params: PasswordResetEmailParams): Promise<boolean> {
    const resetUrl = `${this.appUrl}/resetpassword?token=${params.resetToken}`

    const html = `
    <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e6edf3;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#d4a843,#b8922e);padding:32px;text-align:center">
        <h1 style="margin:0;color:#0a0e1a;font-size:24px">🔒 Password Reset</h1>
      </div>
      <div style="padding:32px">
        <p>Hello <strong>${params.name}</strong>,</p>
        <p style="color:#8b949e">Click below to reset your password. This link expires in <strong>1 hour</strong>.</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#d4a843,#b8922e);color:#0a0e1a;text-decoration:none;padding:14px 40px;border-radius:8px;font-weight:bold">Reset Password →</a>
        </div>
        <p style="color:#8b949e;font-size:14px">If you didn't request this, ignore this email.</p>
      </div>
    </div>`

    return this.send(params.to, "Password Reset — GCUF Fee Management", html)
  }
}
