import React from 'react';
import { SubpageBackButton } from '../components/SubpageBackButton';
import {
  Globe,
  Wifi,
  Smartphone,
  ExternalLink,
  Zap,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Plane,
  Clock,
  QrCode
} from 'lucide-react';

export const TravelESimView: React.FC = () => {
  const destinations = [
    {
      country: 'Singapore',
      flag: '🇸🇬',
      popular: true,
      tagline: 'Ideal for Work Permit & S Pass candidate arrivals, interviews & business trips.',
      highlights: ['Instant local high-speed 4G/5G data', 'No roaming charges', 'Zero physical SIM queues at Changi Airport']
    },
    {
      country: 'Malaysia',
      flag: '🇲🇾',
      popular: true,
      tagline: 'Cross-border connectivity between Singapore and Johor / Kuala Lumpur.',
      highlights: ['High-speed regional coverage', 'Keep WhatsApp active', 'Instant QR code setup']
    },
    {
      country: 'Thailand',
      flag: '🇹🇭',
      popular: true,
      tagline: 'Reliable mobile data across Bangkok, Phuket, and all major cities.',
      highlights: ['Affordable prepaid data plans', 'Smooth digital activation', 'Reliable nationwide networks']
    },
    {
      country: 'Worldwide',
      flag: '🌍',
      popular: false,
      tagline: 'Global connectivity across 200+ countries with single and regional eSIMs.',
      highlights: ['Multi-country coverage', 'Top up easily anytime online', '24/7 customer assistance']
    }
  ];

  const steps = [
    {
      step: '01',
      icon: Globe,
      title: 'Choose Destination & Plan',
      desc: 'Select Singapore, Malaysia, Thailand, or Worldwide and pick the data package that fits your duration.'
    },
    {
      step: '02',
      icon: QrCode,
      title: 'Scan QR Code to Install',
      desc: 'Receive your eSIM QR code instantly via email. Scan it in your phone settings within 2 minutes.'
    },
    {
      step: '03',
      icon: Zap,
      title: 'Connect Upon Arrival',
      desc: 'As soon as your flight lands, turn on data roaming on the eSIM profile and connect immediately.'
    }
  ];

  const faqs = [
    {
      q: 'What is a Travel eSIM?',
      a: 'An eSIM (embedded SIM) is a digital SIM profile built directly into your smartphone. You do not need to insert a plastic card; simply scan a QR code to download the mobile data profile.'
    },
    {
      q: 'Can I keep my Indian WhatsApp number while using the eSIM?',
      a: 'Yes! When using an eSIM for data, your existing WhatsApp retains your Indian or home phone number for chatting and calls, so your contacts can reach you seamlessly.'
    },
    {
      q: 'Which destinations are covered?',
      a: 'Full coverage is available for Singapore, Malaysia, Thailand, and Worldwide across more than 200 countries.'
    },
    {
      q: 'Which phones support eSIM?',
      a: 'Most recent smartphones support eSIM, including iPhone XS and newer (iPhone 11, 12, 13, 14, 15, 16), Samsung Galaxy S20/S21/S22/S23/S24/Fold/Flip, and Google Pixel 3 and newer.'
    }
  ];

  return (
    <div id="travel-esim-view" className="py-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Back */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Travel eSIM" fallbackTab="home" />

        {/* Hero Card Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-red-950 text-white border border-stone-800 shadow-2xl p-6 sm:p-10 lg:p-14">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-900/80 border border-red-700 text-red-200 text-xs font-extrabold tracking-wide uppercase">
                <Wifi className="w-3.5 h-3.5 text-red-400" />
                <span>Travel eSIM</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-800/90 border border-stone-700 text-stone-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Powered by Happy Journey Holidays</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Stay Connected Wherever You Go
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              High-speed prepaid digital eSIM data for international candidates, jobseekers, and travelers. Activate seamlessly for <strong>Singapore, Malaysia, Thailand, and Worldwide</strong> before you board your flight.
            </p>

            {/* Coverage Highlight Line */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-stone-300">
              <span className="text-stone-400 uppercase tracking-wider">Coverage:</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-white">🇸🇬 Singapore</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-white">🇲🇾 Malaysia</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-white">🇹🇭 Thailand</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-white">🌍 Worldwide (200+ Countries)</span>
            </div>

            {/* Direct CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                id="esim-page-hero-cta"
                href="https://discover.airalo.com/happyjourneyholidays/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-red-900 hover:bg-red-800 text-white text-sm sm:text-base font-bold rounded-xl shadow-xl hover:shadow-red-950/60 transition-all cursor-pointer group"
                title="Get Travel eSIM powered by Happy Journey Holidays"
              >
                <span>Get Travel eSIM Now</span>
                <ExternalLink className="w-4 h-4 text-red-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-xs text-stone-400 px-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant QR delivery to your email in minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Coverage Cards */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Popular eSIM Destinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Direct mobile connectivity across Singapore, Malaysia, Thailand, and global routes
              </p>
            </div>

            <a
              id="esim-browse-all-link"
              href="https://discover.airalo.com/happyjourneyholidays/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-900 hover:text-red-700 transition-colors"
            >
              <span>View All 200+ Destinations</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.map(d => (
              <div
                key={d.country}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{d.flag}</span>
                    {d.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-50 text-red-900 border border-red-200">
                        Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{d.country}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {d.tagline}
                    </p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    {d.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href="https://discover.airalo.com/happyjourneyholidays/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-red-900 text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Check {d.country} Plans</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works: 3 Simple Steps */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-red-900 text-xs font-extrabold uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Quick 3-Step Setup
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Travel eSIM Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              No physical SIM card required. Everything is activated 100% digitally from your phone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {steps.map(s => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-900 text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-slate-300 font-mono">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Compatibility & Key Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compatibility Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-red-900 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Supported Devices</h3>
                <p className="text-xs text-slate-500">Works with unlocked eSIM-compatible phones</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Apple iPhone</div>
                <p>iPhone XS, XR, 11, 12, 13, 14, 15, 16 and SE (2nd/3rd gen) or newer.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Samsung Galaxy</div>
                <p>Galaxy S20, S21, S22, S23, S24, Z Flip, Z Fold, and selected Note/A-series models.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Google Pixel & Others</div>
                <p>Google Pixel 3, 4, 5, 6, 7, 8, 9, plus compatible Motorola, Xiaomi, and Oppo phones.</p>
              </div>
            </div>
          </div>

          {/* Key Advantages Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Why Choose Digital eSIM?</h3>
                <p className="text-xs text-slate-500">Convenient, secure & transparent</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block">No Airport Queue:</strong>
                  Skip long lines at money changers and physical SIM counters upon landing.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block">Zero Roaming Bill Shock:</strong>
                  Prepaid data with no hidden overages or surprise charges.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block">Dual-SIM Convenience:</strong>
                  Keep your home SIM active for bank OTPs and calls while using eSIM for mobile data.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block">Trusted Travel Partnership:</strong>
                  Powered by Happy Journey Holidays via Airalo, the world's leading eSIM marketplace.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-900" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900">{f.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950 via-stone-900 to-red-950 text-white p-8 sm:p-10 text-center space-y-4 shadow-xl border border-red-900/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-700/50 text-red-200 text-xs font-bold">
            <span>Powered by Happy Journey Holidays</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready for Your Next Trip? Stay Connected Wherever You Go
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Get your digital eSIM for Singapore, Malaysia, Thailand, or 200+ worldwide destinations today.
          </p>
          <div className="pt-2">
            <a
              id="esim-bottom-direct-link-btn"
              href="https://discover.airalo.com/happyjourneyholidays/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-stone-950 hover:bg-stone-100 text-sm font-extrabold rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Order Your Travel eSIM</span>
              <ExternalLink className="w-4 h-4 text-red-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
