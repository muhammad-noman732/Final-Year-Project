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
        this.fromEmail = env.FROM_EMAIL || "noreply@gcuf.edu.pk";
        this.appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        this.fromName = 'GCUF Management System';

        if (this.isConfigured) {
            sgMail.setApiKey(env.SENDGRID_API_KEY as string);
            logger.info("SendGrid Service Successfully Initialized");
        } else {
            logger.warn("SendGrid API Key missing — emails will be printed to terminal console instead of sending.");
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
            logger.info({ htmlContent }, "[DEV LOG] Welcome Email Captured (Not sent via SendGrid)");
            return;
        }

        try {
            await withRetry(
                () => withTimeout(
                    sgMail.send({
                        to: params.to,
                        from: { email: this.fromEmail, name: this.fromName },
                        subject: `Welcome to GCUF - Your ${params.role.replace("_", " ")} Account Credentials`,
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
            logger.info({ to: params.to }, "Welcome email securely processed via SendGrid");
        } catch (error: Error | unknown) {
            logger.error({ err: error, to: params.to }, "Failed to send Welcome Email after retries");
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
            logger.info({ htmlContent }, "[DEV LOG] Password Reset Email Captured (Not sent via SendGrid)");
            return;
        }

        try {
            await withRetry(
                () => withTimeout(
                    sgMail.send({
                        to: params.to,
                        from: { email: this.fromEmail, name: this.fromName },
                        subject: 'Action Required: Password Reset - GCUF Management',
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
            logger.info({ to: params.to }, "Password reset email securely processed via SendGrid");
        } catch (error: Error | unknown) {
            logger.error({ err: error, to: params.to }, "Failed to send Password Reset Email after retries");
            throw new InternalServerError(
                `Failed to send password reset email: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }

    }
}
