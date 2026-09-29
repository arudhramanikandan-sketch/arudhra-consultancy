import {
  CVOrder,
  CVOrderStatus,
  CVExperienceLevel,
  CVPackageType,
  CVEmploymentRecord,
  CVFresherDetails,
  CVPersonalDetails,
  CVEducationRecord,
  CVSkillsData,
  CVProjectRecord,
  CVInternshipRecord,
  CVCertificationRecord,
  CVSeminarRecord,
  CVActivityRecord,
  CVAchievementRecord,
  CVOverseasInfo,
  CVSupportingDocument
} from '../types';

export interface InitiateOrderPayload {
  customerName: string;
  mobile: string;
  email?: string;
  jobCategory: string;
  customCategory?: string;
  experienceLevel: CVExperienceLevel;
  cvType: CVPackageType;
  cvPackageName: string;
  selectedTemplateId?: string;
  selectedTemplateName?: string;
  amount: number;
  notes?: string;

  // Complete Detailed Profile
  personalDetails?: CVPersonalDetails;
  careerObjective?: string;
  educationList?: CVEducationRecord[];
  employmentHistory?: CVEmploymentRecord[];
  skillsData?: CVSkillsData;
  projects?: CVProjectRecord[];
  internships?: CVInternshipRecord[];
  certifications?: CVCertificationRecord[];
  seminars?: CVSeminarRecord[];
  activities?: CVActivityRecord[];
  achievements?: CVAchievementRecord[];
  overseasInfo?: CVOverseasInfo;
  documents?: CVSupportingDocument[];

  fresherDetails?: CVFresherDetails;
}

export interface VerifyPaymentPayload {
  orderId: string;
  paymentMethod?: 'upi' | 'card' | 'netbanking' | 'qr';
  paymentId?: string;
  utr?: string;
}

export const cvOrderService = {
  async initiateOrder(payload: InitiateOrderPayload): Promise<{ success: boolean; order?: CVOrder; message?: string }> {
    try {
      const res = await fetch('/api/cv-orders/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error while initiating order.' };
    }
  },

  async verifyPayment(payload: VerifyPaymentPayload): Promise<{ success: boolean; order?: CVOrder; message?: string }> {
    try {
      const res = await fetch('/api/cv-orders/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Payment verification failed.' };
    }
  },

  async trackOrder(query: string): Promise<{ success: boolean; count?: number; orders?: any[]; message?: string }> {
    try {
      const res = await fetch(`/api/cv-orders/track/${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to track order.' };
    }
  },

  async getAdminOrders(token: string, filter?: { status?: string; search?: string }): Promise<{ success: boolean; count?: number; orders?: CVOrder[]; message?: string }> {
    try {
      const params = new URLSearchParams();
      if (filter?.status && filter.status !== 'All') params.set('status', filter.status);
      if (filter?.search) params.set('search', filter.search);

      const url = `/api/cv-orders${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to fetch CV orders.' };
    }
  },

  async updateOrderStatus(
    token: string,
    id: string,
    status: CVOrderStatus,
    adminNotes?: string,
    deliveryData?: {
      deliveredPdfUrl?: string;
      deliveredWordUrl?: string;
      deliveredDocUrl?: string;
      deliveryMethod?: 'whatsapp' | 'email' | 'both';
      revisionNotes?: string;
      revisionCount?: number;
    }
  ): Promise<{ success: boolean; order?: CVOrder; message?: string }> {
    try {
      const res = await fetch(`/api/cv-orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          adminNotes,
          deliveredPdfUrl: deliveryData?.deliveredPdfUrl,
          deliveredWordUrl: deliveryData?.deliveredWordUrl,
          deliveredDocUrl: deliveryData?.deliveredDocUrl,
          deliveryMethod: deliveryData?.deliveryMethod,
          revisionNotes: deliveryData?.revisionNotes,
          revisionCount: deliveryData?.revisionCount
        })
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update order status.' };
    }
  },

  async deleteOrder(token: string, id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`/api/cv-orders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to delete order.' };
    }
  }
};
