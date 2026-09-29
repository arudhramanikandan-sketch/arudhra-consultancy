import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CVOrder, CVOrderStatus } from '../types';
import { cvOrderService } from '../services/cvOrderService';
import { sortEmploymentChronological } from '../utils/cvDateUtils';
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  Clock,
  MessageSquare,
  Trash2,
  Edit,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  Check,
  X,
  CreditCard,
  User,
  Phone,
  Mail,
  Briefcase,
  Save,
  Loader2,
  RefreshCw,
  Send,
  Building2,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  Wrench,
  Copy,
  Globe,
  BookOpen,
  FileCheck,
  Paperclip
} from 'lucide-react';

export const AdminCVOrdersSection: React.FC = () => {
  const { token } = useAuth();
  const { showToast } = useApp();

  const [orders, setOrders] = useState<CVOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected Order for Modal
  const [selectedOrder, setSelectedOrder] = useState<CVOrder | null>(null);
  const [modalAdminNotes, setModalAdminNotes] = useState('');
  const [modalStatus, setModalStatus] = useState<CVOrderStatus>('paid');
  const [modalDeliveryUrl, setModalDeliveryUrl] = useState('');
  const [modalDeliveryMethod, setModalDeliveryMethod] = useState<'whatsapp' | 'email' | 'both'>('whatsapp');
  const [isUpdating, setIsUpdating] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    const res = await cvOrderService.getAdminOrders(token, {
      status: statusFilter,
      search: searchQuery
    });
    setLoading(false);
    if (res.success && res.orders) {
      setOrders(res.orders);
    } else {
      showToast(res.message || 'Failed to fetch CV orders', 'error');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleOpenModal = (order: CVOrder) => {
    setSelectedOrder(order);
    setModalAdminNotes(order.adminNotes || '');
    setModalStatus(order.orderStatus);
    setModalDeliveryUrl(order.deliveredDocUrl || '');
    setModalDeliveryMethod(order.deliveryMethod || 'whatsapp');
  };

  const handleUpdateStatus = async (orderId: string, newStatus: CVOrderStatus) => {
    if (!token) return;
    const res = await cvOrderService.updateOrderStatus(token, orderId, newStatus);
    if (res.success && res.order) {
      setOrders(prev => prev.map(o => (o.id === orderId ? res.order! : o)));
      showToast(`Order #${orderId} status changed to ${newStatus}`, 'success');
    } else {
      showToast(res.message || 'Failed to update order status', 'error');
    }
  };

  const handleSaveModal = async () => {
    if (!token || !selectedOrder) return;
    setIsUpdating(true);

    const res = await cvOrderService.updateOrderStatus(
      token,
      selectedOrder.id,
      modalStatus,
      modalAdminNotes,
      {
        deliveredDocUrl: modalDeliveryUrl.trim(),
        deliveryMethod: modalDeliveryMethod
      }
    );

    setIsUpdating(false);
    if (res.success && res.order) {
      setOrders(prev => prev.map(o => (o.id === selectedOrder.id ? res.order! : o)));
      setSelectedOrder(res.order);
      showToast('Order details updated successfully', 'success');
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to delete CV Order #${orderId}? This cannot be undone.`)) {
      return;
    }

    const res = await cvOrderService.deleteOrder(token, orderId);
    if (res.success) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      showToast(`Order #${orderId} deleted`, 'info');
    } else {
      showToast(res.message || 'Failed to delete order', 'error');
    }
  };

  const getCustomerWhatsAppUrl = (order: CVOrder) => {
    const raw = order.mobile.replace(/\D/g, '');
    const cleanMobile = raw.length === 10 ? `91${raw}` : raw;
    const text = `Hello ${order.customerName}, regarding your CV Order #${order.id} (${order.cvPackageName}) with Arudhra Consultancy: `;
    return `https://wa.me/${cleanMobile}?text=${encodeURIComponent(text)}`;
  };

  const handleCopyCandidateDetails = (order: CVOrder) => {
    let text = `=================================================\n`;
    text += `ARUDHRA CONSULTANCY - CV DRAFTING WORKSHEET\n`;
    text += `=================================================\n`;
    text += `Order ID: ${order.id}\n`;
    text += `Candidate Name: ${order.customerName}\n`;
    text += `WhatsApp Mobile: ${order.mobile}\n`;
    if (order.email) text += `Email: ${order.email}\n`;
    text += `Job Category: ${order.jobCategory}\n`;
    text += `Experience Level: ${order.experienceLevel}\n`;
    text += `Selected CV Template: ${order.selectedTemplateName || 'Standard Professional'}\n`;
    text += `CV Package: ${order.cvPackageName} (₹${order.amount})\n`;
    if (order.notes) text += `Special Instructions / Notes: ${order.notes}\n`;

    // Demographic Info
    if (order.personalDetails) {
      text += `\n-------------------------------------------------\n`;
      text += `PERSONAL & BIODATA DETAILS:\n`;
      text += `-------------------------------------------------\n`;
      if (order.personalDetails.fatherName) text += `Father / Parent Name: ${order.personalDetails.fatherName}\n`;
      if (order.personalDetails.dob) text += `Date of Birth: ${order.personalDetails.dob}\n`;
      if (order.personalDetails.gender) text += `Gender: ${order.personalDetails.gender}\n`;
      if (order.personalDetails.maritalStatus) text += `Marital Status: ${order.personalDetails.maritalStatus}\n`;
      if (order.personalDetails.nationality) text += `Nationality: ${order.personalDetails.nationality}\n`;
      if (order.personalDetails.currentCity) text += `Current City / State: ${order.personalDetails.currentCity}\n`;
      if (order.personalDetails.country) text += `Country: ${order.personalDetails.country}\n`;
      if (order.personalDetails.communicationAddress) text += `Permanent Address:\n${order.personalDetails.communicationAddress}\n`;
    }

    // Career Objective
    if (order.careerObjective) {
      text += `\n-------------------------------------------------\n`;
      text += `CAREER OBJECTIVE / PROFESSIONAL SUMMARY:\n`;
      text += `-------------------------------------------------\n`;
      text += `${order.careerObjective}\n`;
    }

    // Education List
    if (order.educationList && order.educationList.length > 0) {
      text += `\n-------------------------------------------------\n`;
      text += `EDUCATION & QUALIFICATIONS:\n`;
      text += `-------------------------------------------------\n`;
      order.educationList.forEach((edu, i) => {
        text += `[${i + 1}] ${edu.qualificationLevel} - ${edu.courseDegree}`;
        if (edu.specialization) text += ` (${edu.specialization})`;
        text += `\n    Institution: ${edu.schoolCollege}`;
        if (edu.boardUniversity) text += ` | Board/Univ: ${edu.boardUniversity}`;
        if (edu.location) text += ` (${edu.location})`;
        text += `\n    Year: ${edu.yearJoining ? `${edu.yearJoining} – ` : ''}${edu.yearPassing}`;
        if (edu.percentageCgpa) text += ` | Grade: ${edu.percentageCgpa}`;
        if (edu.notes) text += ` | Notes: ${edu.notes}`;
        text += `\n\n`;
      });
    }

    // Work Experience
    if (order.employmentHistory && order.employmentHistory.length > 0) {
      text += `-------------------------------------------------\n`;
      text += `WORK EXPERIENCE (Chronological Order - Most Recent First):\n`;
      text += `-------------------------------------------------\n`;
      const sorted = sortEmploymentChronological(order.employmentHistory, 'desc');
      sorted.forEach((emp, i) => {
        text += `\n[${i + 1}] ${emp.jobTitle.toUpperCase()} at ${emp.companyName} (${emp.location})\n`;
        text += `Period: ${emp.startDate} to ${emp.isCurrentlyWorking ? 'Present (Currently Working)' : (emp.endDate || 'N/A')}\n`;
        text += `Main Responsibilities:\n${emp.responsibilities}\n`;
        text += `Key Skills Used: ${emp.keySkills}\n`;
        if (emp.achievements) text += `Achievements: ${emp.achievements}\n`;
      });
    } else if (order.fresherDetails) {
      text += `\n-------------------------------------------------\n`;
      text += `FRESHER ACADEMIC & TECHNICAL PROFILE:\n`;
      text += `-------------------------------------------------\n`;
      text += `Qualification: ${order.fresherDetails.qualification}\n`;
      text += `Course / Degree: ${order.fresherDetails.courseDegree}\n`;
      text += `Institution: ${order.fresherDetails.institution}\n`;
      text += `Year of Passing: ${order.fresherDetails.yearOfPassing}\n`;
      text += `Technical & Practical Skills: ${order.fresherDetails.skills}\n`;
      if (order.fresherDetails.certifications) text += `Certifications: ${order.fresherDetails.certifications}\n`;
      if (order.fresherDetails.internship) text += `Internship / Training: ${order.fresherDetails.internship}\n`;
      if (order.fresherDetails.academicProject) text += `Academic Project: ${order.fresherDetails.academicProject}\n`;
    }

    // Skills & Languages
    if (order.skillsData) {
      text += `\n-------------------------------------------------\n`;
      text += `SKILLS & LANGUAGES KNOWN:\n`;
      text += `-------------------------------------------------\n`;
      if (order.skillsData.technicalSkills?.length > 0) {
        text += `Technical Skills: ${order.skillsData.technicalSkills.join(', ')}\n`;
      }
      if (order.skillsData.softwareTools?.length > 0) {
        text += `Software / Tools: ${order.skillsData.softwareTools.join(', ')}\n`;
      }
      if (order.skillsData.professionalSkills?.length > 0) {
        text += `Professional Skills: ${order.skillsData.professionalSkills.join(', ')}\n`;
      }
      if (order.skillsData.otherSkills?.length > 0) {
        text += `Other Skills: ${order.skillsData.otherSkills.join(', ')}\n`;
      }
      if (order.skillsData.languagesKnown?.length > 0) {
        text += `Languages Known:\n`;
        order.skillsData.languagesKnown.forEach(l => {
          text += `  - ${l.name} (${l.proficiency})\n`;
        });
      }
    }

    // Projects
    if (order.projects && order.projects.length > 0) {
      text += `\n-------------------------------------------------\n`;
      text += `ACADEMIC & INDUSTRIAL PROJECTS:\n`;
      text += `-------------------------------------------------\n`;
      order.projects.forEach((p, idx) => {
        text += `[${idx + 1}] ${p.title}\n`;
        if (p.toolsUsed) text += `    Tools/Tech: ${p.toolsUsed}\n`;
        if (p.role) text += `    Role: ${p.role}\n`;
        if (p.duration) text += `    Duration: ${p.duration}\n`;
        if (p.description) text += `    Description: ${p.description}\n`;
        if (p.outcome) text += `    Outcome: ${p.outcome}\n\n`;
      });
    }

    // Internships / Training
    if (order.internships && order.internships.length > 0) {
      text += `-------------------------------------------------\n`;
      text += `INTERNSHIPS & INDUSTRIAL TRAINING:\n`;
      text += `-------------------------------------------------\n`;
      order.internships.forEach((int, idx) => {
        text += `[${idx + 1}] ${int.position} at ${int.company}\n`;
        if (int.startDate || int.endDate) text += `    Duration: ${int.startDate || ''} – ${int.endDate || ''}\n`;
        if (int.responsibilities) text += `    Responsibilities: ${int.responsibilities}\n`;
        if (int.skillsLearned) text += `    Skills Learned: ${int.skillsLearned}\n\n`;
      });
    }

    // Certifications & Seminars
    if ((order.certifications && order.certifications.length > 0) || (order.seminars && order.seminars.length > 0)) {
      text += `-------------------------------------------------\n`;
      text += `CERTIFICATIONS & SEMINARS:\n`;
      text += `-------------------------------------------------\n`;
      order.certifications?.forEach((c, idx) => {
        text += `Cert [${idx + 1}] ${c.name} by ${c.issuingOrganization} (${c.yearDate || 'N/A'})\n`;
        if (c.certificateId) text += `    ID: ${c.certificateId}\n`;
        if (c.description) text += `    Description: ${c.description}\n`;
      });
      order.seminars?.forEach((s, idx) => {
        text += `Seminar [${idx + 1}] ${s.title} at ${s.organization || 'N/A'} (${s.dateYear || 'N/A'})\n`;
      });
      text += `\n`;
    }

    // Activities & Achievements
    if ((order.activities && order.activities.length > 0) || (order.achievements && order.achievements.length > 0)) {
      text += `-------------------------------------------------\n`;
      text += `ACTIVITIES & AWARDS:\n`;
      text += `-------------------------------------------------\n`;
      order.achievements?.forEach((ach, idx) => {
        text += `Award [${idx + 1}] 🏆 ${ach.title}`;
        if (ach.dateYear) text += ` (${ach.dateYear})`;
        if (ach.description) text += ` - ${ach.description}`;
        text += `\n`;
      });
      order.activities?.forEach((act, idx) => {
        text += `Activity [${idx + 1}] (${act.category}) ${act.title}\n`;
        if (act.description) text += `    ${act.description}\n`;
      });
      text += `\n`;
    }

    // Overseas Preferences
    if (order.overseasInfo) {
      text += `-------------------------------------------------\n`;
      text += `OVERSEAS & APPLICATION PREFERENCES:\n`;
      text += `-------------------------------------------------\n`;
      if (order.overseasInfo.preferredPosition) text += `Preferred Role: ${order.overseasInfo.preferredPosition}\n`;
      if (order.overseasInfo.preferredCountry) text += `Target Country: ${order.overseasInfo.preferredCountry}\n`;
      if (order.overseasInfo.preferredLocation) text += `Target City: ${order.overseasInfo.preferredLocation}\n`;
      if (order.overseasInfo.passportAvailable) text += `Passport Available: ${order.overseasInfo.passportAvailable}\n`;
      if (order.overseasInfo.passportExpiryDate) text += `Passport Expiry: ${order.overseasInfo.passportExpiryDate}\n`;
      if (order.overseasInfo.visaStatus) text += `Visa / MOM Status: ${order.overseasInfo.visaStatus}\n`;
      if (order.overseasInfo.noticePeriod) text += `Notice Period: ${order.overseasInfo.noticePeriod}\n`;
      if (order.overseasInfo.drivingLicence) text += `Driving Licence: ${order.overseasInfo.drivingLicence}\n`;
      if (order.overseasInfo.linkedinProfile) text += `LinkedIn: ${order.overseasInfo.linkedinProfile}\n`;
      if (order.overseasInfo.portfolioWebsite) text += `Portfolio: ${order.overseasInfo.portfolioWebsite}\n`;
    }

    // Documents
    if (order.documents && order.documents.length > 0) {
      text += `\n-------------------------------------------------\n`;
      text += `ATTACHED DOCUMENTS (${order.documents.length} Files):\n`;
      text += `-------------------------------------------------\n`;
      order.documents.forEach((d, idx) => {
        text += `[${idx + 1}] ${d.name} (${d.fileSize || 'N/A'})\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2500);
    showToast('Comprehensive Candidate CV Worksheet copied to clipboard!', 'success');
  };

  // Metrics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);
  const paidOrdersCount = orders.filter(o => o.paymentStatus === 'paid').length;
  const inPrepCount = orders.filter(o => ['paid', 'in_preparation', 'under_review'].includes(o.orderStatus)).length;
  const completedCount = orders.filter(o => o.orderStatus === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-900" />
            <span>Professional CV Preparation Orders</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage candidate CV orders, update manual drafting progress, and coordinate delivery via WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-900' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Total Orders</span>
          <span className="text-2xl font-black text-stone-900">{orders.length}</span>
        </div>
        <div className="p-4 bg-white border border-emerald-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Confirmed & Paid</span>
          <span className="text-2xl font-black text-emerald-800">{paidOrdersCount}</span>
        </div>
        <div className="p-4 bg-white border border-amber-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">In Preparation</span>
          <span className="text-2xl font-black text-amber-800">{inPrepCount}</span>
        </div>
        <div className="p-4 bg-white border border-red-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Total Revenue</span>
          <span className="text-2xl font-black text-red-900">₹{totalRevenue}</span>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search order ID, candidate, phone..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
          <span className="text-stone-400 font-semibold text-[11px] shrink-0">Filter Status:</span>
          {['All', 'payment_pending', 'paid', 'in_preparation', 'under_review', 'completed'].map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-red-950 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'All' ? 'All' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-stone-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-red-900" />
            <span>Loading CV orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-400">
            <FileText className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            <span className="font-bold text-stone-600 block text-sm">No CV orders found</span>
            <span>Orders will appear here as soon as candidates submit them.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-4">Candidate & Contact</th>
                  <th className="py-3 px-4">Category & Experience</th>
                  <th className="py-3 px-4">Package & Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Order Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-red-950 block">{order.id}</span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-stone-500 font-mono block">WA: {order.mobile}</span>
                      {order.email && <span className="text-[10px] text-stone-400 block">{order.email}</span>}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-800 block">{order.jobCategory}</span>
                      <span className="text-[10px] text-stone-500 block">{order.experienceLevel}</span>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        {order.selectedTemplateName && (
                          <span className="inline-block text-[10px] text-red-950 font-bold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                            Template: {order.selectedTemplateName}
                          </span>
                        )}
                        {order.employmentHistory && order.employmentHistory.length > 0 && (
                          <span className="inline-block text-[10px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            💼 {order.employmentHistory.length} Job{order.employmentHistory.length > 1 ? 's' : ''}
                          </span>
                        )}
                        {order.fresherDetails && (
                          <span className="inline-block text-[10px] text-blue-800 font-semibold bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                            🎓 {order.fresherDetails.courseDegree || 'Fresher Profile'}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-bold text-stone-900 block">{order.cvPackageName}</span>
                      <span className="font-mono font-extrabold text-red-900">₹{order.amount}</span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      {order.paymentId && (
                        <span className="text-[9px] text-stone-400 block font-mono mt-0.5">
                          {order.paymentId}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={order.orderStatus}
                        onChange={e => handleUpdateStatus(order.id, e.target.value as CVOrderStatus)}
                        className="px-2 py-1 bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-red-900 cursor-pointer"
                      >
                        <option value="payment_pending">Payment Pending</option>
                        <option value="paid">Paid</option>
                        <option value="in_preparation">In Preparation</option>
                        <option value="under_review">Under Review</option>
                        <option value="completed">Completed & Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Candidate Direct */}
                        <a
                          href={getCustomerWhatsAppUrl(order)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                          title="Chat with Candidate on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        {/* View & Edit Details */}
                        <button
                          type="button"
                          onClick={() => handleOpenModal(order)}
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                          title="View Details & Notes"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={e => {
            if (e.target === e.currentTarget && !isUpdating) setSelectedOrder(null);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-red-950/40">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  CV Order Details
                </span>
                <h3 className="text-lg font-extrabold text-white font-mono">
                  {selectedOrder.id}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyCandidateDetails(selectedOrder)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy candidate details ready for Word drafting"
                >
                  {copiedDetails ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDetails ? 'Copied Worksheet!' : 'Copy Worksheet'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-stone-700 max-h-[75vh] overflow-y-auto">
              {/* Candidate Info Grid */}
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Candidate Name</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">WhatsApp Mobile</span>
                  <a
                    href={getCustomerWhatsAppUrl(selectedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{selectedOrder.mobile}</span>
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Job Category</span>
                  <span className="font-semibold text-stone-800">{selectedOrder.jobCategory}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Experience</span>
                  <span className="font-semibold text-stone-800">{selectedOrder.experienceLevel}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Selected CV Template</span>
                  <span className="font-bold text-red-950">{selectedOrder.selectedTemplateName || 'Standard Professional'}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Package</span>
                  <span className="font-bold text-red-950">{selectedOrder.cvPackageName} (₹{selectedOrder.amount})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Payment Ref</span>
                  <span className="font-mono text-stone-600">{selectedOrder.paymentId || 'None'}</span>
                </div>
              </div>

              {/* Optional Personal Demographics */}
              {selectedOrder.personalDetails && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <User className="w-4 h-4 text-red-900" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Personal & Biodata Demographics</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-stone-700">
                    {selectedOrder.personalDetails.fatherName && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Father / Parent</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.fatherName}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.dob && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Date of Birth</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.dob}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.gender && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Gender</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.gender}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.maritalStatus && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Marital Status</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.maritalStatus}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.nationality && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Nationality</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.nationality}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.currentCity && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Current City</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.currentCity}</span>
                      </div>
                    )}
                    {selectedOrder.personalDetails.country && (
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase">Country</span>
                        <span className="font-semibold">{selectedOrder.personalDetails.country}</span>
                      </div>
                    )}
                  </div>
                  {selectedOrder.personalDetails.communicationAddress && (
                    <div className="pt-1.5 border-t border-stone-100">
                      <span className="text-[10px] text-stone-400 block uppercase">Permanent / Communication Address:</span>
                      <p className="text-stone-800 text-[11px] whitespace-pre-line">{selectedOrder.personalDetails.communicationAddress}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Career Objective */}
              {selectedOrder.careerObjective && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                  <span className="font-bold text-stone-900 block text-[11px]">Submitted Career Objective / Summary:</span>
                  <p className="text-stone-700 italic leading-relaxed">{selectedOrder.careerObjective}</p>
                </div>
              )}

              {/* EDUCATION & QUALIFICATIONS LIST */}
              {selectedOrder.educationList && selectedOrder.educationList.length > 0 && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-red-900" />
                      <h4 className="font-extrabold text-stone-900 text-xs">Education & Qualifications ({selectedOrder.educationList.length})</h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedOrder.educationList.map((edu, idx) => (
                      <div key={edu.id || idx} className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-xs">
                            {edu.qualificationLevel}: {edu.courseDegree} {edu.specialization ? `(${edu.specialization})` : ''}
                          </span>
                          <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                            {edu.yearPassing}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-600 flex flex-wrap gap-x-3">
                          <span>Inst: <strong>{edu.schoolCollege}</strong></span>
                          {edu.boardUniversity && <span>Board: {edu.boardUniversity}</span>}
                          {edu.location && <span>Loc: {edu.location}</span>}
                          {edu.percentageCgpa && <span className="font-bold text-red-950">Grade: {edu.percentageCgpa}</span>}
                        </div>
                        {edu.notes && <p className="text-[10px] text-stone-500 italic mt-0.5">{edu.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMPLOYMENT HISTORY IN CHRONOLOGICAL ORDER (FOR EXPERIENCED CANDIDATES) */}
              {selectedOrder.employmentHistory && selectedOrder.employmentHistory.length > 0 && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-red-900" />
                      <h4 className="font-extrabold text-stone-900 text-xs">
                        Work Experience History (Chronological Order — Most Recent First)
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {selectedOrder.employmentHistory.length} Employment Record(s)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sortEmploymentChronological(selectedOrder.employmentHistory, 'desc').map((emp, idx) => (
                      <div
                        key={emp.id || idx}
                        className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2 text-xs shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1 border-b border-stone-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-extrabold text-stone-900 text-xs">
                              {emp.jobTitle}
                            </span>
                            <span className="text-stone-500 font-medium">
                              at <strong className="text-stone-700">{emp.companyName}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              <span>{emp.location}</span>
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                              emp.isCurrentlyWorking
                                ? 'bg-emerald-100 text-emerald-800 font-bold'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span>{emp.startDate} – {emp.isCurrentlyWorking ? 'Present (Currently Working)' : (emp.endDate || 'End')}</span>
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase block mb-0.5">Main Job Responsibilities:</span>
                          <p className="text-stone-700 whitespace-pre-line leading-relaxed bg-stone-50 p-2 rounded-lg border border-stone-100">
                            {emp.responsibilities}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block mb-0.5">Key Skills & Tools:</span>
                            <span className="font-medium text-stone-800 bg-stone-100 px-2 py-1 rounded inline-block text-[11px]">
                              {emp.keySkills}
                            </span>
                          </div>
                          {emp.achievements && (
                            <div>
                              <span className="text-[10px] font-bold text-stone-400 uppercase block mb-0.5">Achievements:</span>
                              <span className="text-amber-900 bg-amber-50 border border-amber-200 px-2 py-1 rounded inline-block text-[11px] font-medium">
                                🏆 {emp.achievements}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FRESHER ACADEMIC & TECHNICAL PROFILE */}
              {selectedOrder.fresherDetails && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-red-900" />
                      <h4 className="font-extrabold text-stone-900 text-xs">
                        Fresher Academic & Technical Profile
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                      Fresher Candidate
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-stone-200">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Qualification</span>
                      <span className="font-bold text-stone-900">{selectedOrder.fresherDetails.qualification}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Course / Degree</span>
                      <span className="font-bold text-stone-900">{selectedOrder.fresherDetails.courseDegree}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Institution</span>
                      <span className="font-medium text-stone-800">{selectedOrder.fresherDetails.institution}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Year of Passing</span>
                      <span className="font-bold text-stone-900">{selectedOrder.fresherDetails.yearOfPassing}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Technical & Practical Skills:</span>
                      <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-1 rounded inline-block text-[11px] mt-0.5">
                        {selectedOrder.fresherDetails.skills}
                      </span>
                    </div>

                    {selectedOrder.fresherDetails.certifications && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Certifications & Licenses:</span>
                        <span className="text-stone-800 bg-stone-100 px-2 py-1 rounded inline-block text-[11px] mt-0.5">
                          {selectedOrder.fresherDetails.certifications}
                        </span>
                      </div>
                    )}

                    {selectedOrder.fresherDetails.internship && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Internship / Training:</span>
                        <p className="text-stone-700 bg-stone-50 p-2 rounded-lg text-[11px] border border-stone-100 mt-0.5">
                          {selectedOrder.fresherDetails.internship}
                        </p>
                      </div>
                    )}

                    {selectedOrder.fresherDetails.academicProject && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Academic Project:</span>
                        <p className="text-stone-700 bg-stone-50 p-2 rounded-lg text-[11px] border border-stone-100 mt-0.5">
                          {selectedOrder.fresherDetails.academicProject}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SKILLS & LANGUAGES */}
              {selectedOrder.skillsData && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <Wrench className="w-4 h-4 text-red-900" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Skills & Languages Known</h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {selectedOrder.skillsData.technicalSkills?.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Technical Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedOrder.skillsData.technicalSkills.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded font-semibold text-[11px]">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedOrder.skillsData.softwareTools?.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Software & Tools:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedOrder.skillsData.softwareTools.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-800 rounded text-[11px]">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedOrder.skillsData.languagesKnown?.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Languages:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedOrder.skillsData.languagesKnown.map((l, i) => (
                            <span key={i} className="px-2.5 py-0.5 bg-white border border-stone-300 rounded-md text-[11px]">
                              <strong>{l.name}</strong> ({l.proficiency})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PROJECTS & INTERNSHIPS */}
              {((selectedOrder.projects && selectedOrder.projects.length > 0) || (selectedOrder.internships && selectedOrder.internships.length > 0)) && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <BookOpen className="w-4 h-4 text-red-900" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Projects & Industrial Training</h4>
                  </div>
                  {selectedOrder.projects && selectedOrder.projects.map((p, i) => (
                    <div key={p.id || i} className="bg-white p-2.5 rounded-lg border border-stone-200 text-[11px] space-y-0.5">
                      <span className="font-bold text-stone-900 block">Project: {p.title}</span>
                      {p.toolsUsed && <span className="text-stone-500 block">Tools: {p.toolsUsed}</span>}
                      {p.description && <p className="text-stone-700 italic">{p.description}</p>}
                    </div>
                  ))}
                  {selectedOrder.internships && selectedOrder.internships.map((int, i) => (
                    <div key={int.id || i} className="bg-white p-2.5 rounded-lg border border-stone-200 text-[11px] space-y-0.5">
                      <span className="font-bold text-stone-900 block">Training: {int.position} at {int.company}</span>
                      {int.responsibilities && <p className="text-stone-700 italic">{int.responsibilities}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* CERTIFICATIONS & SEMINARS */}
              {((selectedOrder.certifications && selectedOrder.certifications.length > 0) || (selectedOrder.seminars && selectedOrder.seminars.length > 0)) && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <FileCheck className="w-4 h-4 text-red-900" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Certifications, Licenses & Seminars</h4>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    {selectedOrder.certifications?.map((c, i) => (
                      <div key={c.id || i} className="bg-white p-2 rounded-lg border border-stone-200 flex justify-between">
                        <span><strong>{c.name}</strong> – {c.issuingOrganization}</span>
                        <span className="text-stone-500 font-semibold">{c.yearDate || ''}</span>
                      </div>
                    ))}
                    {selectedOrder.seminars?.map((s, i) => (
                      <div key={s.id || i} className="bg-white p-2 rounded-lg border border-stone-200 flex justify-between">
                        <span>Workshop: <strong>{s.title}</strong> ({s.organization})</span>
                        <span className="text-stone-500 font-semibold">{s.dateYear || ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OVERSEAS PREFERENCES */}
              {selectedOrder.overseasInfo && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <Globe className="w-4 h-4 text-red-900" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Overseas & Application Preferences</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-stone-700 text-[11px]">
                    {selectedOrder.overseasInfo.preferredPosition && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Target Role</span>
                        <span className="font-semibold">{selectedOrder.overseasInfo.preferredPosition}</span>
                      </div>
                    )}
                    {selectedOrder.overseasInfo.preferredCountry && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Target Country</span>
                        <span className="font-semibold text-red-950 font-bold">{selectedOrder.overseasInfo.preferredCountry}</span>
                      </div>
                    )}
                    {selectedOrder.overseasInfo.passportAvailable && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Passport</span>
                        <span className="font-semibold">{selectedOrder.overseasInfo.passportAvailable} {selectedOrder.overseasInfo.passportExpiryDate ? `(Exp: ${selectedOrder.overseasInfo.passportExpiryDate})` : ''}</span>
                      </div>
                    )}
                    {selectedOrder.overseasInfo.visaStatus && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Visa/Pass Status</span>
                        <span className="font-semibold">{selectedOrder.overseasInfo.visaStatus}</span>
                      </div>
                    )}
                    {selectedOrder.overseasInfo.noticePeriod && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Notice Period</span>
                        <span className="font-semibold">{selectedOrder.overseasInfo.noticePeriod}</span>
                      </div>
                    )}
                    {selectedOrder.overseasInfo.drivingLicence && (
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">Driving Licence</span>
                        <span className="font-semibold">{selectedOrder.overseasInfo.drivingLicence}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ATTACHED DOCUMENTS */}
              {selectedOrder.documents && selectedOrder.documents.length > 0 && (
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                    <Paperclip className="w-4 h-4 text-emerald-700" />
                    <h4 className="font-extrabold text-stone-900 text-xs">Attached Documents ({selectedOrder.documents.length})</h4>
                  </div>
                  <div className="space-y-1.5">
                    {selectedOrder.documents.map((doc, idx) => (
                      <div key={doc.id || idx} className="bg-white p-2 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                        <span className="font-medium text-stone-800">{doc.name}</span>
                        <span className="text-stone-400 text-[10px]">{doc.fileSize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Notes */}
              {selectedOrder.notes && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                  <span className="font-bold text-stone-900 block text-[11px]">Customer Special Instructions:</span>
                  <p className="text-stone-600 italic">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Update Status */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900 block">Order Status:</label>
                <select
                  value={modalStatus}
                  onChange={e => setModalStatus(e.target.value as CVOrderStatus)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-900"
                >
                  <option value="payment_pending">Payment Pending</option>
                  <option value="paid">Paid & Ready for Preparation</option>
                  <option value="in_preparation">In Preparation (Drafting)</option>
                  <option value="under_review">Under Review / Revision</option>
                  <option value="completed">Completed & Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-900 block mb-1">Delivery Channel:</label>
                  <select
                    value={modalDeliveryMethod}
                    onChange={e => setModalDeliveryMethod(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  >
                    <option value="whatsapp">WhatsApp (Direct)</option>
                    <option value="email">Email</option>
                    <option value="both">Both WhatsApp & Email</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-900 block mb-1">Delivered Document Link / Drive URL:</label>
                  <input
                    type="text"
                    value={modalDeliveryUrl}
                    onChange={e => setModalDeliveryUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900 block">Internal Admin Notes:</label>
                <textarea
                  rows={3}
                  value={modalAdminNotes}
                  onChange={e => setModalAdminNotes(e.target.value)}
                  placeholder="Notes about candidate communication, draft revisions, specific welder/driver license details..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <a
                  href={getCustomerWhatsAppUrl(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveModal}
                    disabled={isUpdating}
                    className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
