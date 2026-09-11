import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageSquare, Mail, MapPin, Navigation, Send, CheckCircle2, Clock, ShieldCheck, Facebook, Instagram, Youtube } from 'lucide-react';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const ContactView: React.FC = () => {
  const { settings, submitEnquiry, showToast } = useApp();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '917418845083';
    return `https://wa.me/${raw}?text=${encodeURIComponent('Hello Arudhra Consultancy, I would like to get in touch regarding Singapore overseas recruitment.')}`;
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) {
      showToast('Please enter your Name and Mobile number', 'error');
      return;
    }

    setLoading(true);
    // Submit as general Singapore recruitment enquiry
    const res = await submitEnquiry({
      jobId: 'SG-GENERAL-ENQ',
      customerName: name,
      mobile,
      email,
      candidateTrade: trade || 'General Singapore Enquiry',
      candidateNotes: message
    });
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    }
  };

  return (
    <div id="contact-view-page" className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Contact Us" fallbackTab="home" />

        {/* Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 text-red-300 text-xs font-bold border border-red-800">
              🇸🇬 Singapore Overseas Recruitment Desk
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Contact Arudhra Consultancy
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Have questions about Singapore job eligibility, visa requirements, or trade testing? Contact our recruitment team in Coimbatore.
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 cols: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Head Office & Recruitment Hub
              </h3>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-50 text-red-900 rounded-xl shrink-0 border border-red-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">Office Address</strong>
                    <p className="leading-relaxed mt-0.5 text-slate-600">{settings.officeAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-50 text-red-900 rounded-xl shrink-0 border border-red-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">Direct Phone Calling</strong>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-red-900 font-bold hover:underline block mt-0.5">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 border border-emerald-100">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">WhatsApp Support</strong>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline block mt-0.5">
                      +{settings.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 border border-blue-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">Official Email</strong>
                    <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-slate-900 block mt-0.5">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0 border border-amber-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">Working Hours</strong>
                    <p className="text-slate-600 mt-0.5">Monday to Saturday: 9:30 AM - 6:30 PM (IST)</p>
                    <p className="text-slate-400 text-[11px]">Sunday: Prior Appointment Only</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  id="contact-whatsapp-direct"
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>

                {settings.googleMapsDirectionUrl && (
                  <a
                    id="contact-get-directions"
                    href={settings.googleMapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                )}
              </div>

              {/* Official Social Media Channels including Facebook */}
              {(settings.facebookUrl || settings.instagramUrl || settings.youtubeUrl) && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Official Social Channels
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {settings.facebookUrl && (
                      <a
                        id="contact-facebook-link"
                        href={settings.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                        title="Follow Arudhra Consultancy on Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                        <span>Facebook Page</span>
                      </a>
                    )}
                    {settings.instagramUrl && (
                      <a
                        id="contact-instagram-link"
                        href={settings.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                        title="Follow on Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {settings.youtubeUrl && (
                      <a
                        id="contact-youtube-link"
                        href={settings.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                        title="Watch on YouTube"
                      >
                        <Youtube className="w-4 h-4" />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 7 cols: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Singapore Recruitment Enquiry</h3>
            <p className="text-xs text-slate-600 mb-6">
              Our team will review your trade profile and contact you on Phone/WhatsApp.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Enquiry Received!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  “Your enquiry has been received. Our team will contact you shortly.”
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setMobile('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form id="contact-page-form" onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Balaji S"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-form-mobile"
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="+91 63745 09488"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Trade / Field of Interest
                    </label>
                    <input
                      id="contact-form-trade"
                      type="text"
                      value={trade}
                      onChange={e => setTrade(e.target.value)}
                      placeholder="e.g. CNC Machinist / 6G Welder / F&B"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message / Experience Summary
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your qualification, previous experience in India/Gulf/Singapore, and passport status..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900 resize-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <span>
                    Your contact information will only be used by Arudhra Consultancy to follow up on your Singapore recruitment enquiry.
                  </span>
                </div>

                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Singapore Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Embed in Contact Page */}
        {settings.googleMapsEmbedUrl && (
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Interactive Location Map</h4>
                <p className="text-xs text-slate-500">{settings.officeAddress}</p>
              </div>
              {settings.googleMapsDirectionUrl && (
                <a
                  href={settings.googleMapsDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-900 hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              )}
            </div>
            <div className="h-80 w-full bg-slate-100">
              <iframe
                src={settings.googleMapsEmbedUrl}
                title="Office Location Map View"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
