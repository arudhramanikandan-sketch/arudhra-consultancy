import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, MessageSquare, Mail, Navigation, Clock } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings } = useApp();

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '916374509488';
    return `https://wa.me/${raw}?text=${encodeURIComponent('Hello Arudhra Consultancy, I would like to visit your office regarding Singapore job opportunities.')}`;
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-red-900 text-xs font-extrabold uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Office & Consultation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Office
          </h2>
          <p className="text-sm text-slate-600">
            Meet our Singapore overseas recruitment specialists in person for document verification and interview briefing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Office Details Card */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 border border-stone-800">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-red-400 font-bold">
                  Recruitment Office
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{settings.businessName}</h3>
                <p className="text-xs text-stone-400">{settings.tagline}</p>
              </div>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-800 rounded-lg shrink-0 text-red-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Address</span>
                    <p className="leading-relaxed text-stone-300">{settings.officeAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-800 rounded-lg shrink-0 text-red-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Phone Consultation</span>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-white hover:text-red-400 font-bold transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-800 rounded-lg shrink-0 text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">WhatsApp Desk</span>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">
                      +{settings.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-800 rounded-lg shrink-0 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Email</span>
                    <a href={`mailto:${settings.email}`} className="text-stone-300 hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-800 rounded-lg shrink-0 text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Working Hours</span>
                    <p>Monday - Saturday: 9:30 AM - 6:30 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
              {settings.googleMapsDirectionUrl && (
                <a
                  id="get-directions-btn"
                  href={settings.googleMapsDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              )}
              <a
                id="location-whatsapp-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-xl border border-stone-700 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message Desk</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-xs relative min-h-[380px]">
            {settings.googleMapsEmbedUrl ? (
              <iframe
                src={settings.googleMapsEmbedUrl}
                title="Office Location Map"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-slate-500 text-sm space-y-2">
                <MapPin className="w-8 h-8 text-red-900 mb-2 mx-auto" />
                <p className="font-semibold text-slate-800">1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062</p>
                <p className="text-xs text-slate-400">Map location available via Get Directions button</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
