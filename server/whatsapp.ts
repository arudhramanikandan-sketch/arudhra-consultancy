/**
 * Real WhatsApp Business / WhatsApp Cloud API Service
 * 
 * Uses Meta Graph API (WhatsApp Cloud API) to dispatch secure OTPs to candidate mobile numbers.
 * Requires WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID environment variables.
 */

export interface WhatsAppSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  providerConfigured: boolean;
}

/**
 * Clean and format mobile number with country code for Meta WhatsApp Cloud API.
 * Format required by Meta: digits only with country code (e.g. 919840123456, 6581234567)
 */
export function formatWhatsAppNumber(rawNumber: string): string {
  // Strip all non-digit characters
  let digits = rawNumber.replace(/\D/g, '');

  // Remove leading zeros if present
  digits = digits.replace(/^0+/, '');

  // If 10 digits and starts with 6, 7, 8, 9 (standard Indian mobile format)
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `91${digits}`;
  }

  // If 8 digits and starts with 8 or 9 (standard Singapore mobile format)
  if (digits.length === 8 && /^[89]/.test(digits)) {
    return `65${digits}`;
  }

  // If already starts with 91 and has 12 digits
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }

  // If already starts with 65 and has 10 digits
  if (digits.length === 10 && digits.startsWith('65')) {
    return digits;
  }

  return digits;
}

/**
 * Check if the WhatsApp Cloud API provider credentials are fully configured
 */
export function isWhatsAppConfigured(): boolean {
  const token = process.env.WHATSAPP_API_TOKEN?.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  return Boolean(token && phoneId && token !== 'MY_WHATSAPP_API_TOKEN' && phoneId !== 'MY_WHATSAPP_PHONE_NUMBER_ID');
}

/**
 * Dispatches a 6-digit OTP code to the candidate's WhatsApp number via Meta WhatsApp Cloud API.
 * Never logs or exposes the OTP.
 */
export async function sendWhatsAppOtp(recipientMobile: string, otpCode: string): Promise<WhatsAppSendResult> {
  const apiToken = process.env.WHATSAPP_API_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME?.trim();
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || 'en_US';

  // Verify credentials configuration
  if (!apiToken || !phoneNumberId || apiToken === 'MY_WHATSAPP_API_TOKEN' || phoneNumberId === 'MY_WHATSAPP_PHONE_NUMBER_ID') {
    return {
      success: false,
      providerConfigured: false,
      error: 'WhatsApp Cloud API credentials (WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID) are not configured in environment variables.'
    };
  }

  const formattedRecipient = formatWhatsAppNumber(recipientMobile);
  if (formattedRecipient.length < 8) {
    return {
      success: false,
      providerConfigured: true,
      error: 'Invalid recipient mobile number format for WhatsApp delivery.'
    };
  }

  const endpoint = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  try {
    let payload: Record<string, any>;

    // If an approved Meta Authentication Template is provided, use template message
    if (templateName) {
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedRecipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: templateLang },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: otpCode }
              ]
            },
            {
              type: 'button',
              sub_type: 'url',
              index: '0',
              parameters: [
                { type: 'text', text: otpCode }
              ]
            }
          ]
        }
      };
    } else {
      // Direct transactional WhatsApp text message
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedRecipient,
        type: 'text',
        text: {
          preview_url: false,
          body: `*Arudhra Consultancy - Singapore Overseas Recruitment*\n\nYour 6-digit Candidate Portal verification code is: *${otpCode}*\n\n⏱️ Valid for 5 minutes. Please do not share this OTP with anyone for account safety.`
        }
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || `WhatsApp API error (Status: ${response.status})`;
      console.warn(`[WhatsApp API Dispatch Failed for +${formattedRecipient}]: ${errorMsg}`);
      return {
        success: false,
        providerConfigured: true,
        error: errorMsg
      };
    }

    const messageId = data?.messages?.[0]?.id;
    return {
      success: true,
      providerConfigured: true,
      messageId
    };
  } catch (err: any) {
    console.warn(`[WhatsApp Network Exception]: ${err.message || err}`);
    return {
      success: false,
      providerConfigured: true,
      error: err.message || 'Network failure connecting to WhatsApp API service.'
    };
  }
}
