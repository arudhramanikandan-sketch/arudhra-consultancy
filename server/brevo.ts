/**
 * Brevo (formerly Sendinblue) Transactional Email Service
 * 
 * Uses Brevo REST API v3 (/v3/smtp/email) to send secure 6-digit OTP codes
 * for candidate portal authentication and verification.
 */

export interface BrevoSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  providerConfigured: boolean;
}

export interface BrevoStatus {
  isConfigured: boolean;
  senderEmail: string;
  senderName: string;
  maskedApiKey?: string;
  source: 'database' | 'environment' | 'none';
}

/**
 * Check if the Brevo API key is configured (via override/settings or environment)
 */
export function isBrevoConfigured(apiKeyOverride?: string): boolean {
  const apiKey = (apiKeyOverride || process.env.BREVO_API_KEY)?.trim();
  return Boolean(
    apiKey &&
    apiKey !== 'MY_BREVO_API_KEY' &&
    apiKey !== 'xkeysib-your-api-key-here' &&
    apiKey.length > 10
  );
}

/**
 * Get Brevo configuration details with masked API key for safe admin display
 */
export function getBrevoConfig(
  fallbackEmail = 'info@arudhraconsultancy.com',
  fallbackName = 'ARUDHRA CONSULTANCY',
  storedApiKey?: string,
  storedSenderEmail?: string,
  storedSenderName?: string
): BrevoStatus {
  const effectiveKey = storedApiKey?.trim() || process.env.BREVO_API_KEY?.trim() || '';
  const senderEmail = storedSenderEmail?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || fallbackEmail;
  const senderName = storedSenderName?.trim() || process.env.BREVO_SENDER_NAME?.trim() || fallbackName;
  const configured = isBrevoConfigured(effectiveKey);

  let maskedApiKey: string | undefined;
  if (configured && effectiveKey.length >= 8) {
    maskedApiKey = `${effectiveKey.slice(0, 8)}••••••••${effectiveKey.slice(-4)}`;
  }

  const source: 'database' | 'environment' | 'none' = storedApiKey?.trim() && isBrevoConfigured(storedApiKey)
    ? 'database'
    : (process.env.BREVO_API_KEY?.trim() && isBrevoConfigured(process.env.BREVO_API_KEY) ? 'environment' : 'none');

  return {
    isConfigured: configured,
    senderEmail,
    senderName,
    maskedApiKey,
    source
  };
}

/**
 * Generates an accessible, branded HTML email template for Candidate Login OTP
 */
function createOtpEmailHtml(otpCode: string, candidateName: string, senderName: string): string {
  const cleanName = candidateName?.trim() || 'Candidate';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Arudhra Candidate Portal Login Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="560px" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #7f1d1d; padding: 28px 32px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #ffffff; color: #7f1d1d; font-size: 20px; font-weight: 800; width: 44px; height: 44px; line-height: 44px; border-radius: 12px; text-align: center; margin-bottom: 8px;">
                      AC
                    </div>
                    <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 6px 0 2px 0; letter-spacing: 0.5px;">
                      ${senderName}
                    </h1>
                    <p style="color: #fecaca; font-size: 12px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                      🇸🇬 Singapore Overseas Recruitment & Placement Support
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="color: #0f172a; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
                Candidate Portal Login Code
              </h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                Hello <strong>${cleanName}</strong>,<br>
                Use the 6-digit verification code below to securely sign in to your Arudhra Consultancy candidate portal.
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td align="center" style="background-color: #fef2f2; border: 2px dashed #f87171; border-radius: 12px; padding: 24px 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                      Your One-Time Password (OTP)
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #991b1b; padding: 4px 0;">
                      ${otpCode}
                    </div>
                    <div style="font-size: 12px; color: #7f1d1d; margin-top: 8px; font-weight: 500;">
                      ⏱️ Valid for <strong>5 minutes</strong> only
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Advice -->
              <div style="background-color: #f1f5f9; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;">
                <p style="color: #334155; font-size: 12px; line-height: 1.5; margin: 0;">
                  🔒 <strong>Security Warning:</strong> Arudhra Consultancy staff will never call or message you asking for this OTP code. Do not share this OTP with anyone. If you did not initiate this request, you can safely disregard this email.
                </p>
              </div>

              <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
                Once logged in, you can browse verified Singapore vacancies, track your work pass status, and upload candidate bio-data.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center;">
              <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">
                <strong>Arudhra Consultancy</strong> • 1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                Contact: +91 7418845083 • info@arudhraconsultancy.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Dispatch an email OTP to the candidate using Brevo REST API v3
 */
export async function sendBrevoEmailOtp(
  recipientEmail: string,
  otpCode: string,
  recipientName?: string,
  senderOverride?: { name?: string; email?: string; apiKey?: string }
): Promise<BrevoSendResult> {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();

  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: 'Brevo API key is not configured in settings or environment (BREVO_API_KEY).'
    };
  }

  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || 'info@arudhraconsultancy.com';
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || 'ARUDHRA CONSULTANCY';
  const cleanName = recipientName?.trim() || 'Candidate';

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail.trim().toLowerCase(),
        name: cleanName
      }
    ],
    subject: `Your Login OTP Code is ${otpCode} - ${senderName}`,
    htmlContent: createOtpEmailHtml(otpCode, cleanName, senderName),
    textContent: `Your Arudhra Candidate Portal login verification code is: ${otpCode}\n\nValid for 5 minutes. Please do not share this OTP with anyone for account safety.\n\nArudhra Consultancy - Singapore Overseas Recruitment\nPhone: +91 7418845083\nCoimbatore, Tamil Nadu`
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data: any = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      console.warn('[Brevo Error] Primary attempt failed:', errorMsg, data);

      // If sender verification or domain was rejected, try fallback to active verified account sender
      if ((response.status === 400 || errorMsg.toLowerCase().includes('sender')) && senderEmail !== 'manikandan@happyjourneyholidays.com') {
        try {
          console.log('[Brevo] Retrying with verified sender fallback: manikandan@happyjourneyholidays.com');
          const fallbackPayload = {
            ...payload,
            sender: {
              name: `${senderName} (Recruitment)`,
              email: 'manikandan@happyjourneyholidays.com'
            }
          };
          const fallbackRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'api-key': apiKey,
              'content-type': 'application/json'
            },
            body: JSON.stringify(fallbackPayload)
          });
          const fallbackData: any = await fallbackRes.json().catch(() => null);
          if (fallbackRes.ok && fallbackData?.messageId) {
            return {
              success: true,
              messageId: fallbackData.messageId,
              providerConfigured: true
            };
          }
        } catch (fallbackErr) {
          console.warn('[Brevo] Fallback retry also failed:', fallbackErr);
        }
      }

      return {
        success: false,
        providerConfigured: true,
        error: `Brevo email dispatch failed: ${errorMsg}`
      };
    }

    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    const errorMsg = isTimeout ? 'Brevo API request timed out (12s)' : err.message || 'Network error connecting to Brevo';
    console.error('[Brevo Exception]', errorMsg);
    return {
      success: false,
      providerConfigured: true,
      error: errorMsg
    };
  }
}

/**
 * Creates an accessible, branded HTML email for candidate overseas application confirmation
 */
function createApplicationEmailHtml(
  candidateName: string,
  appData: { enquiryId: string; jobTitle: string; location?: string; salary?: string },
  senderName: string,
  contactPhone: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Application Received - Singapore Overseas Placement</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color:#7f1d1d;padding:26px 32px;text-align:center;">
              <div style="display:inline-block;background-color:#ffffff;color:#7f1d1d;font-size:20px;font-weight:800;width:44px;height:44px;line-height:44px;border-radius:12px;margin-bottom:8px;">AC</div>
              <h1 style="color:#ffffff;font-size:20px;font-weight:800;margin:6px 0 2px 0;">${senderName}</h1>
              <p style="color:#fecaca;font-size:12px;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:1px;">🇸🇬 Application Acknowledgment</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="color:#0f172a;font-size:18px;font-weight:700;margin:0 0 12px 0;">Application Successfully Received!</h2>
              <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px 0;">
                Dear <strong>${candidateName}</strong>,<br>
                Thank you for applying through Arudhra Consultancy. Your application for Singapore overseas placement has been registered in our recruitment system.
              </p>
              
              <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:24px;">
                <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">Reference ID: <strong style="color:#7f1d1d;font-family:monospace;font-size:14px;">${appData.enquiryId}</strong></p>
                <p style="margin:0 0 8px 0;font-size:13px;color:#1e293b;"><strong>Role:</strong> ${appData.jobTitle}</p>
                ${appData.location ? `<p style="margin:0 0 8px 0;font-size:13px;color:#1e293b;"><strong>Location:</strong> ${appData.location}</p>` : ''}
                ${appData.salary ? `<p style="margin:0;font-size:13px;color:#1e293b;"><strong>Compensation:</strong> ${appData.salary}</p>` : ''}
              </div>

              <h3 style="color:#1e293b;font-size:14px;font-weight:700;margin:0 0 8px 0;">What Happens Next?</h3>
              <ol style="color:#475569;font-size:13px;line-height:1.6;padding-left:20px;margin:0 0 24px 0;">
                <li>Our Singapore deployment team will review your trade profile and MOM eligibility.</li>
                <li>An overseas coordinator will contact you via WhatsApp / Call at your registered phone number.</li>
                <li>Keep your passport copy, trade certificates, and bio-data ready for verification.</li>
              </ol>

              <div style="background-color:#fef2f2;border:1px solid #fee2e2;border-radius:10px;padding:14px;text-align:center;">
                <p style="color:#991b1b;font-size:13px;font-weight:600;margin:0 0 4px 0;">Need immediate consultation or update?</p>
                <p style="color:#7f1d1d;font-size:13px;margin:0;">Call or WhatsApp our desk at <strong>${contactPhone}</strong></p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 32px;text-align:center;">
              <p style="color:#64748b;font-size:11px;margin:0 0 4px 0;">Arudhra Consultancy • 1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062</p>
              <p style="color:#94a3b8;font-size:11px;margin:0;">Licensed Overseas Manpower Placement & Visa Consulting Support</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Dispatch an application confirmation email via Brevo REST API v3
 */
export async function sendBrevoApplicationEmail(
  recipientEmail: string,
  candidateName: string,
  appData: { enquiryId: string; jobTitle: string; location?: string; salary?: string },
  senderOverride?: { name?: string; email?: string; apiKey?: string; phone?: string }
): Promise<BrevoSendResult> {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();

  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: 'Brevo API key is not configured.'
    };
  }

  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || 'info@arudhraconsultancy.com';
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || 'ARUDHRA CONSULTANCY';
  const contactPhone = senderOverride?.phone?.trim() || '+91 7418845083';
  const cleanName = candidateName?.trim() || 'Candidate';

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail.trim().toLowerCase(),
        name: cleanName
      }
    ],
    subject: `Application Received: ${appData.jobTitle} (Ref: ${appData.enquiryId}) - ${senderName}`,
    htmlContent: createApplicationEmailHtml(cleanName, appData, senderName, contactPhone),
    textContent: `Dear ${cleanName},\n\nYour application for "${appData.jobTitle}" (Reference ID: ${appData.enquiryId}) has been received by ${senderName}.\n\nOur Singapore recruitment team will contact you shortly to review your work pass eligibility.\n\nHotline: ${contactPhone}\nCoimbatore, Tamil Nadu`
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data: any = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      return {
        success: false,
        providerConfigured: true,
        error: `Brevo application email failed: ${errorMsg}`
      };
    }

    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err: any) {
    return {
      success: false,
      providerConfigured: true,
      error: err.name === 'AbortError' ? 'Brevo request timed out' : err.message || 'Error connecting to Brevo'
    };
  }
}

/**
 * Send a test email to verify Brevo API connectivity
 */
export async function sendBrevoTestEmail(
  recipientEmail: string,
  senderOverride?: { name?: string; email?: string; apiKey?: string }
): Promise<BrevoSendResult> {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();

  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: 'Brevo API key is not configured in settings or environment variables.'
    };
  }

  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || 'info@arudhraconsultancy.com';
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || 'ARUDHRA CONSULTANCY';
  const cleanRecipient = recipientEmail.trim().toLowerCase();

  const testOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: cleanRecipient,
        name: 'Arudhra Administrator'
      }
    ],
    subject: `✅ Brevo Test Email Delivery - ${senderName}`,
    htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:24px;background:#f8fafc;">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:12px;padding:30px;border:1px solid #e2e8f0;">
    <div style="background:#059669;color:#fff;padding:12px 20px;border-radius:8px;text-align:center;font-weight:700;font-size:16px;">
      ✅ Brevo API Connection Successful!
    </div>
    <h2 style="color:#0f172a;margin-top:20px;font-size:18px;">Brevo Email Integration is Working</h2>
    <p style="color:#475569;font-size:14px;line-height:1.6;">
      This test message confirms that your Brevo API key and sender address (<strong>${senderEmail}</strong>) are configured correctly for <strong>${senderName}</strong>.
    </p>
    <div style="background:#f1f5f9;padding:14px;border-radius:8px;font-size:13px;color:#334155;">
      <strong>Sample 6-Digit Candidate OTP Code:</strong> <span style="font-family:monospace;font-weight:bold;color:#7f1d1d;font-size:16px;">${testOtp}</span><br>
      <strong>Dispatched at:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
    </div>
    <p style="color:#64748b;font-size:12px;margin-top:20px;">
      All candidate OTP logins, overseas application receipts, and contact inquiries will now dispatch via Brevo automatically.
    </p>
  </div>
</body>
</html>`,
    textContent: `Brevo API Connection Successful!\n\nThis confirms that Brevo API is sending emails correctly from ${senderEmail} for ${senderName}.\nSample OTP: ${testOtp}\nTimestamp: ${new Date().toISOString()}`
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data: any = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      return {
        success: false,
        providerConfigured: true,
        error: `Brevo test failed: ${errorMsg}`
      };
    }

    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err: any) {
    return {
      success: false,
      providerConfigured: true,
      error: err.name === 'AbortError' ? 'Brevo request timed out' : err.message || 'Error connecting to Brevo'
    };
  }
}
