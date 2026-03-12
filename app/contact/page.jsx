'use client';

import { useState, useEffect } from "react";

const LeafIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M30 5C30 5 8 18 8 35C8 46.05 17.4 55 30 55C42.6 55 52 46.05 52 35C52 18 30 5 30 5Z" fill="url(#leafGrad)" opacity="0.9"/>
    <path d="M30 55V20" stroke="#6BBF59" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 32C30 32 20 26 16 18" stroke="#6BBF59" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    <path d="M30 40C30 40 40 34 44 26" stroke="#6BBF59" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    <defs>
      <linearGradient id="leafGrad" x1="8" y1="5" x2="52" y2="55" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A8E063"/>
        <stop offset="1" stopColor="#56AB2F"/>
      </linearGradient>
    </defs>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="30" cy="30" r="24" stroke="#4A8CFF" strokeWidth="1.5" fill="#F0F7FF" opacity="0.9"/>
    <ellipse cx="30" cy="30" rx="11" ry="24" stroke="#7FB5FF" strokeWidth="1" fill="none"/>
    <line x1="6" y1="30" x2="54" y2="30" stroke="#7FB5FF" strokeWidth="1"/>
    <line x1="10" y1="19" x2="50" y2="19" stroke="#7FB5FF" strokeWidth="0.8" opacity="0.5"/>
    <line x1="10" y1="41" x2="50" y2="41" stroke="#7FB5FF" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="30" cy="30" r="4" fill="#2E6BFF" opacity="0.7"/>
    <circle cx="30" cy="30" r="2" fill="white"/>
  </svg>
);

const FloatingOrb = ({ size, left, top, delay, color }) => (
  <div style={{
    position: "absolute", width: size, height: size,
    left, top, borderRadius: "50%", background: color,
    filter: "blur(50px)", opacity: 0.7,
    animation: `floatOrb ${5 + delay}s ease-in-out ${delay}s infinite`,
    pointerEvents: "none",
  }} />
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", jobTitle: "", country: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", country: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%", height: 48, padding: "0 16px",
    border: `1.5px solid ${hasError ? "rgba(239,68,68,0.5)" : "rgba(74,140,255,0.2)"}`,
    borderRadius: 10, background: "rgba(255,255,255,0.8)",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1e293b",
    outline: "none", transition: "all 0.2s", boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block", fontFamily: "'Sora', sans-serif",
    fontSize: 11, fontWeight: 600, color: "#334155",
    marginBottom: 6, letterSpacing: "0.4px", textTransform: "uppercase",
  };

  const products = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      bg: "linear-gradient(135deg, #FFD97D, #F4A228)",
      label: "Loyalty Platform", labelColor: "#C07A10", labelBg: "rgba(244,162,40,0.12)",
      title: "Rural Reward",
      desc: "Loyalty, rewards & lucky draws for rural India — with real-time campaign ROI tracking and field-level insights.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          <path d="M14.5 2a6 6 0 016 6" opacity="0.55"/>
          <path d="M14.5 5.5a2.5 2.5 0 012.5 2.5" opacity="0.55"/>
        </svg>
      ),
      bg: "linear-gradient(135deg, #6BBF59, #3A9B2A)",
      label: "Lead Gen", labelColor: "#2E7D1F", labelBg: "rgba(107,191,89,0.12)",
      title: "Missed Call Solution",
      desc: "One missed call → instant capture → auto follow-up via WhatsApp, SMS or IVR in the farmer's regional language.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
          <line x1="2" y1="20" x2="22" y2="20" strokeWidth="1.4"/>
          <polyline points="6,14 10,10 14,13 18,8" strokeWidth="1.4" opacity="0.6"/>
        </svg>
      ),
      bg: "linear-gradient(135deg, #4A8CFF, #2E6BFF)",
      label: "Analytics", labelColor: "#2E6BFF", labelBg: "rgba(74,140,255,0.1)",
      title: "Agri Analytics Platform",
      desc: "Campaign ROI, regional engagement & retail-level product performance — tracked end-to-end in one dashboard.",
    },
  ];

  const stats = [
    { icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A8CFF" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      ), value: "SaaS", label: "Agri Platform" },
    { icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A8CFF" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ), value: "360°", label: "Visibility" },
    { icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A8CFF" strokeWidth="2" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07"/><path d="M11 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6"/><polyline points="16 3 20 3 20 7"/><line x1="10" y1="14" x2="20" y2="3"/>
        </svg>
      ), value: "Multi", label: "Channel Reach" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-22px) scale(1.04); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes spinLoader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mounted .hero-left { animation: fadeRight 0.8s ease 0.05s both; }
        .mounted .badge-anim { animation: fadeUp 0.6s ease 0s both; }
        .mounted .title-anim { animation: fadeUp 0.7s ease 0.12s both; }
        .mounted .desc-anim { animation: fadeUp 0.7s ease 0.25s both; }
        .mounted .stats-anim { animation: fadeUp 0.7s ease 0.38s both; }
        .mounted .cards-anim { animation: fadeUp 0.7s ease 0.48s both; }
        .mounted .form-right { animation: fadeLeft 0.9s ease 0.28s both; }
        .leaf-sway { animation: leafSway 3.5s ease-in-out infinite; }

        .product-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: all 0.28s ease;
          cursor: default;
        }
        .product-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.85);
          box-shadow: 0 12px 32px rgba(74,140,255,0.13);
        }
        .stat-pill {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(74,140,255,0.14);
          border-radius: 14px;
          padding: 14px 18px;
          transition: all 0.22s ease;
          display: flex; flex-direction: column; align-items: center; gap: 4;
        }
        .stat-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(74,140,255,0.13);
          border-color: rgba(74,140,255,0.28);
        }
        .input-wrap input, .input-wrap textarea, .input-wrap select {
          width: 100%; height: 48px; padding: 0 16px;
          border: 1.5px solid rgba(74,140,255,0.2);
          border-radius: 10px; background: rgba(255,255,255,0.82);
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1e293b;
          outline: none; transition: all 0.2s; box-sizing: border-box;
        }
        .input-wrap textarea {
          height: 108px; padding: 13px 16px; resize: none; line-height: 1.6;
        }
        .input-wrap select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 12 12'%3E%3Cpath fill='%234A8CFF' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px;
        }
        .input-wrap input:focus, .input-wrap textarea:focus, .input-wrap select:focus {
          border-color: #4A8CFF;
          box-shadow: 0 0 0 3px rgba(74,140,255,0.13);
          background: white;
        }
        .input-wrap input.err, .input-wrap textarea.err {
          border-color: rgba(239,68,68,0.5);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }
        .submit-btn {
          width: 100%; height: 50px;
          background: linear-gradient(135deg, #4A8CFF 0%, #2E6BFF 100%);
          color: white; font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.4px;
          border: none; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.22s ease; position: relative; overflow: hidden;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(46,107,255,0.38);
          background: linear-gradient(135deg, #6AABFF 0%, #4A8CFF 100%);
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: #334155; text-decoration: none; transition: color 0.18s;
        }
        .nav-link:hover { color: #2E6BFF; }
        @media (max-width: 1020px) {
          .split-wrap { flex-direction: column !important; }
          .hero-left, .form-right { width: 100% !important; }
          .form-right { max-width: 520px; margin: 0 auto; }
        }
        @media (max-width: 580px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <div className={mounted ? "mounted" : ""} style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F7FAFF 0%, #EAF3FF 45%, #DCEAFF 100%)", position: "relative", overflow: "hidden" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <FloatingOrb size={420} left="2%" top="8%" delay={0} color="radial-gradient(circle, rgba(127,181,255,0.22) 0%, transparent 70%)" />
          <FloatingOrb size={320} left="68%" top="55%" delay={1.8} color="radial-gradient(circle, rgba(74,140,255,0.14) 0%, transparent 70%)" />
          <FloatingOrb size={260} left="45%" top="2%" delay={2.8} color="radial-gradient(circle, rgba(107,191,89,0.11) 0%, transparent 70%)" />
          <FloatingOrb size={200} left="82%" top="8%" delay={1} color="radial-gradient(circle, rgba(127,181,255,0.16) 0%, transparent 70%)" />
        </div>

        {/* NAVBAR */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 72, backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(74,140,255,0.1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center" }}>
            <img
              src="https://i.ibb.co/Tqn0Y1wk/Logo.png"
              alt="Digicides"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              style={{ height: 44, borderRadius: 12, objectFit: "contain" }}
            />
            {/* Fallback text logo shown if image fails to load */}
            <div style={{ display: "none", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #4A8CFF, #2E6BFF)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(46,107,255,0.28)", overflow: "hidden" }}>
                <div style={{ width: 24, height: 24 }}><LeafIcon /></div>
              </div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: "#1e293b", letterSpacing: "-0.3px" }}>
                digi<span style={{ color: "#2E6BFF" }}>cides</span>
              </span>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 32px", position: "relative", zIndex: 1 }}>
          <div className="split-wrap" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

            {/* LEFT HERO */}
            <div className="hero-left" style={{ width: "55%", paddingTop: 4 }}>

              {/* Badge */}
              <div className="badge-anim" style={{ marginBottom: 22 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(107,191,89,0.1)", border: "1px solid rgba(107,191,89,0.3)", borderRadius: 100, padding: "6px 14px", fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 600, color: "#3A8A28", letterSpacing: "0.5px" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6BBF59", boxShadow: "0 0 0 3px rgba(107,191,89,0.25)", display: "inline-block" }} />
                  SaaS · Agri Communication Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="title-anim" style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(36px, 4.2vw, 54px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.13, letterSpacing: "-1.5px", marginBottom: 18 }}>
                Discover. Engage.<br />
                <span style={{ background: "linear-gradient(135deg, #4A8CFF 0%, #2E6BFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Convert.</span>
              </h1>

              {/* Description */}
              <p className="desc-anim" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 400, color: "#475569", lineHeight: 1.72, maxWidth: 470, marginBottom: 32 }}>
                Digicides Marketing Services Pvt. Ltd. is a SaaS-driven communication platform built exclusively for the agri industry — empowering agribusinesses with seamless lead generation, targeted farmer engagement, and complete marketing transparency.
              </p>

              {/* Stats */}
              <div className="stats-anim three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36, maxWidth: 470 }}>
                {stats.map(s => (
                  <div key={s.label} className="stat-pill">
                    <div style={{ marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: "#2E6BFF", letterSpacing: "-0.4px", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#64748b", fontWeight: 500, textAlign: "center", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Product Cards */}
              <div className="cards-anim" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 470 }}>
                {products.map(p => (
                  <div key={p.title} className="product-card">
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                      {p.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{p.title}</span>
                        <span style={{ background: p.labelBg, borderRadius: 6, padding: "2px 8px", fontFamily: "'Sora', sans-serif", fontSize: 10, fontWeight: 600, color: p.labelColor, whiteSpace: "nowrap" }}>{p.label}</span>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#64748b", lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact link */}
              <div style={{ marginTop: 32, paddingTop: 22, borderTop: "1px solid rgba(74,140,255,0.12)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>Or reach us directly:</p>
                <a href="mailto:connect@digicides.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: "#2E6BFF", textDecoration: "none" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  connect@digicides.com
                </a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="form-right" style={{ width: "45%" }}>
              <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(18px)", borderRadius: 22, padding: "36px 36px 32px", boxShadow: "0 24px 64px rgba(74,140,255,0.13), 0 4px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(255,255,255,0.95)" }}>

                {/* Form header */}
                <div style={{ marginBottom: 26 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 28, height: 28 }} className="leaf-sway"><LeafIcon /></div>
                    <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 21, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.4px" }}>Let's Talk</h2>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.6, paddingLeft: 38 }}>
                    Our team responds within 24 hours.
                  </p>
                </div>

                {submitStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "44px 16px" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #6BBF59, #3A9B2A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 19, fontWeight: 700, color: "#2E7D1F", marginBottom: 8 }}>Message Received!</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>We'll be in touch within 24 hours.</p>
                    <button onClick={() => setSubmitStatus("idle")} style={{ marginTop: 22, fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: "#2E6BFF", background: "rgba(74,140,255,0.08)", border: "1.5px solid rgba(74,140,255,0.2)", padding: "8px 20px", borderRadius: 8, cursor: "pointer" }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div className="input-wrap">
                          <label style={labelStyle}>First Name <span style={{ color: "#ef4444" }}>*</span></label>
                          <input className={errors.firstName ? "err" : ""} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                          {errors.firstName && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.firstName}</p>}
                        </div>
                        <div className="input-wrap">
                          <label style={labelStyle}>Last Name</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                        </div>
                      </div>

                      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div className="input-wrap">
                          <label style={labelStyle}>Email <span style={{ color: "#ef4444" }}>*</span></label>
                          <input className={errors.email ? "err" : ""} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@farm.com" />
                          {errors.email && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.email}</p>}
                        </div>
                        <div className="input-wrap">
                          <label style={labelStyle}>Phone</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div className="input-wrap">
                          <label style={labelStyle}>Company</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="AgriCo Pvt. Ltd." />
                        </div>
                        <div className="input-wrap">
                          <label style={labelStyle}>Job Title</label>
                          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Marketing Head" />
                        </div>
                      </div>

                      <div className="input-wrap">
                        <label style={labelStyle}>Country</label>
                        <select name="country" value={formData.country} onChange={handleChange}>
                          <option value="">Select your country...</option>
                          {["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "UAE", "South Africa", "Other"].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="input-wrap">
                        <label style={labelStyle}>Message <span style={{ color: "#ef4444" }}>*</span></label>
                        <textarea className={errors.message ? "err" : ""} name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your business goals or how we can help..." />
                        {errors.message && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.message}</p>}
                      </div>

                      <div style={{ marginTop: 4 }}>
                        <button type="submit" disabled={isSubmitting} className="submit-btn">
                          {isSubmitting ? (
                            <>
                              <svg style={{ animation: "spinLoader 0.7s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                              </svg>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                              </svg>
                            </>
                          )}
                        </button>
                      </div>

                      {submitStatus === "error" && (
                        <div style={{ background: "rgba(239,68,68,0.05)", border: "1.5px solid rgba(239,68,68,0.18)", borderRadius: 10, padding: "11px 16px", textAlign: "center" }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#dc2626" }}>Something went wrong. Please try again or email us directly.</p>
                        </div>
                      )}

                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#94a3b8", textAlign: "center", lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                        Your information is secure and never shared.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
