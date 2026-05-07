import sgMail from '@sendgrid/mail'
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"
import { withRetry } from "@/lib/utils/retry"
import { withTimeout } from "@/lib/utils/timeout"
import { InternalServerError } from "@/lib/utils/AppError"
import { welcomeEmailTemplate, passwordResetEmailTemplate } from "../email/templates"
import type { WelcomeEmailParams, PasswordResetEmailParams } from "@/types/server/auth.types"

export class EmailService {
    private readonly isConfigured: boolean;
    private readonly fromEmail: string;
    private readonly fromName: string;
    private readonly appUrl: string;

    constructor() {
        this.isConfigured = !!env.SENDGRID_API_KEY && env.SENDGRID_API_KEY !== "dummy";
        this.fromEmail = env.FROM_EMAIL || "noreply@unisync.com";
        this.appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        this.fromName = 'UniSync Management System';

        if (this.isConfigured) {
            sgMail.setApiKey(env.SENDGRID_API_KEY as string);
            logger.info({ event: "email.sendgrid.initialized" }, "SendGrid service initialized");
        } else {
            logger.warn(
                { event: "email.sendgrid.not_configured" },
                "SendGrid API key missing; emails will not be sent"
            );
        }
    }

    async sendWelcomeEmail(params: WelcomeEmailParams): Promise<void> {
        const loginUrl = `${this.appUrl}/login`;
        const htmlContent = welcomeEmailTemplate(
            params.name,
            params.role,
            params.tempPassword,
            params.universityName,
            loginUrl
        );

        if (!this.isConfigured) {
            logger.info(
                {
                    event: "email.welcome.skipped_not_configured",
                    to: params.to,
                    role: params.role,
                    universityName: params.universityName,
                },
                "Welcome email skipped because SendGrid is not configured"
            );
            return;
        }

        try {
            await withRetry(
                () => withTimeout(
                    sgMail.send({
                        to: params.to,
                        from: { email: this.fromEmail, name: this.fromName },
                        subject: `Welcome to UniSync - Your ${params.role.replace("_", " ")} Account Credentials`,
                        html: htmlContent,
                    }),
                    10000, // 10s timeout for SendGrid
                    "SendGrid:sendWelcomeEmail"
                ),
                "SendGrid:sendWelcomeEmail",
                {
                    maxAttempts: 3,
                    shouldRetry: (err: unknown) => {
                        // Don't retry if it's a client error (e.g., bad email format)
                        const code = (err as { code?: number })?.code;
                        if (code === 400 || code === 401 || code === 403) return false;
                        return true;
                    }
                }
            );
            logger.info(
                { event: "email.welcome.sent", to: params.to, provider: "sendgrid" },
                "Welcome email sent"
            );
        } catch (error: Error | unknown) {
            logger.error(
                { event: "email.welcome.failed", err: error, to: params.to, provider: "sendgrid" },
                "Failed to send welcome email after retries"
            );
            throw new InternalServerError(
                `Failed to send welcome email: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }


    async sendPasswordResetEmail(params: PasswordResetEmailParams): Promise<void> {
        const htmlContent = passwordResetEmailTemplate(
            params.name,
            params.resetToken,
            this.appUrl
        );

        if (!this.isConfigured) {
            logger.info(
                { event: "email.password_reset.skipped_not_configured", to: params.to },
                "Password reset email skipped because SendGrid is not configured"
            );
            return;
        }

        try {
            await withRetry(
                () => withTimeout(
                    sgMail.send({
                        to: params.to,
                        from: { email: this.fromEmail, name: this.fromName },
                        subject: 'Action Required: Password Reset - UniSync Management',
                        html: htmlContent,
                    }),
                    10000,
                    "SendGrid:sendPasswordResetEmail"
                ),
                "SendGrid:sendPasswordResetEmail",
                {
                    maxAttempts: 3,
                    shouldRetry: (err: unknown) => {
                        const code = (err as { code?: number })?.code;
                        if (code === 400 || code === 401 || code === 403) return false;
                        return true;
                    }
                }
            );
            logger.info(
                { event: "email.password_reset.sent", to: params.to, provider: "sendgrid" },
                "Password reset email sent"
            );
        } catch (error: Error | unknown) {
            logger.error(
                { event: "email.password_reset.failed", err: error, to: params.to, provider: "sendgrid" },
                "Failed to send password reset email after retries"
            );
            throw new InternalServerError(
                `Failed to send password reset email: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }

    }
}
