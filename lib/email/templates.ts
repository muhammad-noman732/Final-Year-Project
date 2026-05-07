export function welcomeEmailTemplate(
    userName: string,
    role: string,
    tempPassword: string,
    universityName?: string,
    loginUrl: string = "http://localhost:3000/login"
): string {
    const roleFormatted = role.replace("_", " ")

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to UniSync Management</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <tr>
                                <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Platform Access Granted</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Welcome, ${userName || 'User'}!</h2>
                                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Your <strong>${roleFormatted}</strong> account has been successfully provisioned${universityName ? ` for <strong>${universityName}</strong>` : ""}.
                                    </p>
                                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Please use the following auto-generated temporary password to log in to the portal for the first time:
                                    </p>
                                    
                                    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
                                        <div style="color: #6b7280; font-size: 14px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Temporary Password</div>
                                        <div style="font-size: 24px; font-weight: bold; color: #2563eb; letter-spacing: 4px; font-family: 'Courier New', Courier, monospace; background: #e5e7eb; display: inline-block; padding: 10px 20px; border-radius: 6px;">
                                            ${tempPassword}
                                        </div>
                                    </div>
  
                                    <div style="text-align: center; margin: 30px 0;">
                                        <a href="${loginUrl}" 
                                           target="_blank"
                                           style="display: inline-block; padding: 16px 36px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                            Sign In Now
                                        </a>
                                    </div>
                                    
                                    <p style="color: #dc2626; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center; font-weight: bold;">
                                        ⚠️ You will be required to change your password immediately upon first login.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                        This is an automated system email. Please do not reply.<br>
                                        © ${new Date().getFullYear()} UniSync Management & Registration. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

export function passwordResetEmailTemplate(userName: string, resetToken: string, baseUrl: string): string {
    const resetLink = `${baseUrl}/resetpassword?token=${resetToken}`;

    return `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Request</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                  <tr>
                      <td align="center">
                          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                              <tr>
                                  <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 20px; text-align: center;">
                                      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Password Reset</h1>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 40px 30px;">
                                      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Reset Your Password</h2>
                                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                          Hi ${userName || 'there'},
                                      </p>
                                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                          We received a secure request to instantly reset your password. Click the button below to proceed:
                                      </p>
                                      <div style="text-align: center; margin: 30px 0;">
                                          <a href="${resetLink}" 
                                             target="_blank"
                                             style="display: inline-block; padding: 16px 36px; background-color: #dc2626; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                              Update Password
                                          </a>
                                      </div>
                                      <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 30px 0 0 0; word-break: break-all;">
                                          If the secure button above does not work, copy and paste this link manually into your browser:<br>
                                          <a href="${resetLink}" style="color: #2563eb; text-decoration: underline;">${resetLink}</a>
                                      </p>
                                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                          This encrypted link will physically expire in <strong>60 minutes</strong> for administrative security reasons.
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                                      <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                          This is an automated system email. Please do not reply.<br>
                                          © ${new Date().getFullYear()} UniSync Management & Registration. All rights reserved.
                                      </p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          </html>
      `;
}
