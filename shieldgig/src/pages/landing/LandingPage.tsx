import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, CloudRain, Wind, AlertTriangle, CheckCircle,
  ArrowRight, Star, Users, CreditCard, Activity, ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

const stats = [
  { value: '15,847', label: 'Protected Workers' },
  { value: '₹2.84Cr', label: 'Paid Out Monthly' },
  { value: '12 min', label: 'Avg Payout Time' },
  { value: '99.2%', label: 'Claim Approval' },
];

const features = [
  {
    icon: CloudRain,
    color: 'text-blue-400 bg-blue-500/10',
    title: 'Weather Detection',
    desc: 'IMD alerts auto-trigger payouts during Red/Orange weather warnings. No claim needed.',
  },
  {
    icon: Wind,
    color: 'text-amber-400 bg-amber-500/10',
    title: 'AQI Monitoring',
    desc: 'Real-time air quality index tracking. Payouts fire at AQI > 300 (Very Poor).',
  },
  {
    icon: AlertTriangle,
    color: 'text-red-400 bg-red-500/10',
    title: 'Curfew & Section 144',
    desc: 'Government restrictions auto-detected. Coverage kicks in instantly.',
  },
  {
    icon: Zap,
    color: 'text-purple-400 bg-purple-500/10',
    title: 'Platform Outage',
    desc: 'Zomato/Swiggy downtime monitored 24/7. Get paid when apps go down.',
  },
  {
    icon: Shield,
    color: 'text-emerald-400 bg-emerald-500/10',
    title: 'AI Fraud Protection',
    desc: 'Advanced ML models detect and block fraudulent claims automatically.',
  },
  {
    icon: CreditCard,
    color: 'text-indigo-400 bg-indigo-500/10',
    title: 'Instant UPI Payout',
    desc: 'Money hits your UPI in under 15 minutes. No bank visits, no paperwork.',
  },
];

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'Zomato Partner, Mumbai',
    avatar: 'A',
    text: 'Got ₹1,200 in 8 minutes during the monsoon red alert. Best investment I made.',
    rating: 5,
  },
  {
    name: 'Priya Menon',
    role: 'Swiggy Partner, Bangalore',
    avatar: 'P',
    text: 'AQI was 420 and I couldn\'t work. ShieldGig paid me before I even filed a claim!',
    rating: 5,
  },
  {
    name: 'Mohammed Ali',
    role: 'Both Platforms, Hyderabad',
    avatar: 'M',
    text: 'During section 144 I was worried about rent. ₹2,500 credited within 20 minutes.',
    rating: 5,
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center glow-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ShieldGig</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" icon={<Shield className="w-4 h-4" />}>Get Insured Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(167,139,250,0.08) 0%, transparent 50%)`
        }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-sm text-indigo-300 mb-8">
              <Zap className="w-4 h-4 text-indigo-400" />
              AI-Powered Parametric Insurance for Gig Workers
              <ChevronRight className="w-4 h-4" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-[1.08]">
              Your income,{' '}
              <span className="gradient-text">protected</span>
              <br />automatically.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              ShieldGig detects weather alerts, AQI spikes, curfews, and platform outages —
              and pays you instantly. No forms. No waiting. No BS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="glow px-8" iconRight={<ArrowRight className="w-5 h-5" />}>
                  Start Free — ₹99/month
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="secondary" className="px-8">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-slate-500 text-sm mt-4">No credit card required • Instant activation • Cancel anytime</p>
          </motion.div>
        </div>

        {/* Floating mock payout card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-lg mx-auto mt-16 glass-card p-5 border-indigo-500/20 glow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">LIVE AUTO-PAYOUT TRIGGERED</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 flex-shrink-0">
              <CloudRain className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">IMD Red Alert — Mumbai</p>
              <p className="text-slate-400 text-sm">Extremely heavy rainfall. 247 workers affected in Andheri West.</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-emerald-400 font-bold text-lg">₹1,200 → UPI</span>
                <span className="text-slate-500 text-xs">Credited in 8 min</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-slate-800/60">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl font-black gradient-text mb-1">{value}</p>
              <p className="text-slate-400 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Everything automated. Nothing to claim.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Our AI monitors 6 types of disruptions 24/7 and triggers payouts the moment conditions are met.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card p-5 hover:border-indigo-500/25 transition-colors duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">How ShieldGig Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Pick a Plan', desc: 'Basic (₹99), Plus (₹199), or Pro (₹349). Coverage starts instantly.' },
              { step: '02', title: 'AI Monitors', desc: '24/7 sensors track weather, AQI, curfews, and platform status in your zone.' },
              { step: '03', title: 'Trigger Detected', desc: 'Our AI verifies data from official sources like IMD, CPCB, and APIs.' },
              { step: '04', title: 'Money Arrives', desc: 'UPI payout hits your account in under 15 minutes. Zero action needed.' },
            ].map(({ step, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white font-black text-lg mx-auto mb-4 glow-sm">
                  {step}
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 border-t border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Trusted by delivery partners</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, avatar, text, rating }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic mb-4 leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-12 text-center bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border-indigo-500/30 glow"
        >
          <Shield className="w-14 h-14 text-indigo-400 mx-auto mb-5" />
          <h2 className="text-4xl font-bold text-white mb-4">Start protecting your income today</h2>
          <p className="text-slate-400 mb-8">Join 15,847 delivery partners who never lose a day's earnings to unexpected disruptions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="glow px-10" iconRight={<ArrowRight className="w-5 h-5" />}>
                Get Insured — ₹99/mo
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="px-8">
                See Live Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">ShieldGig</span>
            <span className="text-slate-500 text-xs ml-2">© 2025</span>
          </div>
          <p className="text-slate-500 text-sm">AI-powered parametric income insurance for gig delivery workers</p>
        </div>
      </footer>
    </div>
  );
};
