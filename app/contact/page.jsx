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
    company: "", jobTitle: "", message: "",
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

  const WEBHOOK_URL = "https://your-webhook-url.com/webhook"; // 🔁 Replace with your actual webhook URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Landing Page 2",
          submittedAt: new Date().toISOString(),
        }),
      });
      setSubmitStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", message: "" });
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      ), value: "SaaS", label: "Agri Platform" },
    { icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ), value: "360°", label: "Visibility" },
    { icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round">
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
          box-shadow: 0 12px 32px rgba(249,115,22,0.12);
        }
        .stat-pill {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 14px;
          padding: 14px 18px;
          transition: all 0.22s ease;
          display: flex; flex-direction: column; align-items: center; gap: 4;
        }
        .stat-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
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
          border-color: #F97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.13);
          background: white;
        }
        .input-wrap input.err, .input-wrap textarea.err {
          border-color: rgba(239,68,68,0.5);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }
        .submit-btn {
          width: 100%; height: 50px;
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: white; font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.4px;
          border: none; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.22s ease; position: relative; overflow: hidden;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(249,115,22,0.35);
          background: linear-gradient(135deg, #FB923C 0%, #F97316 100%);
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

      <div className={mounted ? "mounted" : ""} style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FFF8F0 0%, #FFF1E0 40%, #FFE8CC 70%, #FDDBB4 100%)", position: "relative", overflow: "hidden" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <FloatingOrb size={420} left="2%" top="8%" delay={0} color="radial-gradient(circle, rgba(255,180,80,0.18) 0%, transparent 70%)" />
          <FloatingOrb size={320} left="68%" top="55%" delay={1.8} color="radial-gradient(circle, rgba(255,140,40,0.12) 0%, transparent 70%)" />
          <FloatingOrb size={260} left="45%" top="2%" delay={2.8} color="radial-gradient(circle, rgba(255,200,100,0.13) 0%, transparent 70%)" />
          <FloatingOrb size={200} left="82%" top="8%" delay={1} color="radial-gradient(circle, rgba(255,160,60,0.14) 0%, transparent 70%)" />
        </div>

        {/* ── Agri Art: Bottom-right wheat field panorama ── */}
        <div style={{ position: "fixed", bottom: 0, right: "-20px", pointerEvents: "none", zIndex: 0 }}>
          <svg width="600" height="380" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="stalkGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BAE48" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#2E7D1F" stopOpacity="0.32"/>
              </linearGradient>
              <linearGradient id="stalkGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7BC96A" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#3A8A28" stopOpacity="0.26"/>
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A9E36" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#2E7D1F" stopOpacity="0.22"/>
              </linearGradient>
            </defs>

            {/* Ground band */}
            <ellipse cx="300" cy="375" rx="340" ry="28" fill="url(#groundGrad)"/>

            {/* Stalk 1 — tallest center */}
            <line x1="295" y1="375" x2="295" y2="110" stroke="url(#stalkGrad1)" strokeWidth="3.5"/>
            <path d="M295 120 C295 120 295 98 295 88" stroke="#4A9E36" strokeWidth="2.5" strokeOpacity="0.25" strokeLinecap="round"/>
            <path d="M295 88 C286 72 270 68 265 55 C278 62 290 70 295 88Z" fill="#5BAE48" fillOpacity="0.28"/>
            <path d="M295 88 C304 72 320 68 325 55 C312 62 300 70 295 88Z" fill="#5BAE48" fillOpacity="0.28"/>
            <path d="M295 108 C280 96 264 94 258 84 C272 90 285 98 295 108Z" fill="#4A9E36" fillOpacity="0.22"/>
            <path d="M295 108 C310 96 326 94 332 84 C318 90 305 98 295 108Z" fill="#4A9E36" fillOpacity="0.22"/>
            <path d="M295 130 C282 120 268 118 263 110 C276 115 287 122 295 130Z" fill="#3A8A28" fillOpacity="0.18"/>
            <path d="M295 130 C308 120 322 118 327 110 C314 115 303 122 295 130Z" fill="#3A8A28" fillOpacity="0.18"/>
            <ellipse cx="295" cy="88" rx="9" ry="22" fill="#5BAE48" fillOpacity="0.3"/>

            {/* Stalk 2 — left */}
            <line x1="180" y1="375" x2="184" y2="148" stroke="url(#stalkGrad2)" strokeWidth="3"/>
            <path d="M183 158 C174 143 158 140 153 128 C167 135 179 143 183 158Z" fill="#6BBF59" fillOpacity="0.24"/>
            <path d="M183 158 C192 143 208 140 213 128 C199 135 187 143 183 158Z" fill="#6BBF59" fillOpacity="0.24"/>
            <path d="M183 178 C175 165 162 163 158 153 C170 158 180 165 183 178Z" fill="#4A9E36" fillOpacity="0.2"/>
            <path d="M183 178 C191 165 204 163 208 153 C196 158 186 165 183 178Z" fill="#4A9E36" fillOpacity="0.2"/>
            <path d="M183 200 C176 189 165 187 161 178 C172 183 181 189 183 200Z" fill="#3A8A28" fillOpacity="0.16"/>
            <path d="M183 200 C190 189 201 187 205 178 C194 183 185 189 183 200Z" fill="#3A8A28" fillOpacity="0.16"/>
            <ellipse cx="183" cy="150" rx="7" ry="18" fill="#6BBF59" fillOpacity="0.26"/>

            {/* Stalk 3 — right */}
            <line x1="415" y1="375" x2="410" y2="130" stroke="url(#stalkGrad1)" strokeWidth="3.2"/>
            <path d="M411 140 C402 125 386 122 381 110 C395 117 408 125 411 140Z" fill="#5BAE48" fillOpacity="0.26"/>
            <path d="M411 140 C420 125 436 122 441 110 C427 117 414 125 411 140Z" fill="#5BAE48" fillOpacity="0.26"/>
            <path d="M411 162 C403 149 390 147 386 137 C398 142 408 149 411 162Z" fill="#4A9E36" fillOpacity="0.2"/>
            <path d="M411 162 C419 149 432 147 436 137 C424 142 414 149 411 162Z" fill="#4A9E36" fillOpacity="0.2"/>
            <path d="M411 184 C404 173 393 171 389 162 C400 167 409 173 411 184Z" fill="#3A8A28" fillOpacity="0.16"/>
            <path d="M411 184 C418 173 429 171 433 162 C422 167 413 173 411 184Z" fill="#3A8A28" fillOpacity="0.16"/>
            <ellipse cx="411" cy="132" rx="8" ry="20" fill="#5BAE48" fillOpacity="0.28"/>

            {/* Stalk 4 — far left short */}
            <line x1="80" y1="375" x2="83" y2="200" stroke="url(#stalkGrad2)" strokeWidth="2.5"/>
            <path d="M82 210 C75 198 63 196 59 187 C70 192 79 198 82 210Z" fill="#6BBF59" fillOpacity="0.2"/>
            <path d="M82 210 C89 198 101 196 105 187 C94 192 85 198 82 210Z" fill="#6BBF59" fillOpacity="0.2"/>
            <path d="M82 228 C76 218 66 216 63 208 C73 212 81 218 82 228Z" fill="#4A9E36" fillOpacity="0.16"/>
            <path d="M82 228 C88 218 98 216 101 208 C91 212 83 218 82 228Z" fill="#4A9E36" fillOpacity="0.16"/>
            <ellipse cx="82" cy="202" rx="6" ry="15" fill="#6BBF59" fillOpacity="0.22"/>

            {/* Stalk 5 — far right short */}
            <line x1="520" y1="375" x2="516" y2="190" stroke="url(#stalkGrad2)" strokeWidth="2.5"/>
            <path d="M517 200 C510 188 498 186 494 177 C505 182 514 188 517 200Z" fill="#5BAE48" fillOpacity="0.2"/>
            <path d="M517 200 C524 188 536 186 540 177 C529 182 520 188 517 200Z" fill="#5BAE48" fillOpacity="0.2"/>
            <path d="M517 218 C511 208 501 206 498 198 C508 202 515 208 517 218Z" fill="#4A9E36" fillOpacity="0.16"/>
            <path d="M517 218 C523 208 533 206 536 198 C526 202 519 208 517 218Z" fill="#4A9E36" fillOpacity="0.16"/>
            <ellipse cx="517" cy="192" rx="6" ry="15" fill="#5BAE48" fillOpacity="0.22"/>

            {/* Horizontal grass blades at base */}
            <path d="M60 370 C80 355 110 360 130 368" stroke="#6BBF59" strokeWidth="1.8" strokeOpacity="0.2" fill="none" strokeLinecap="round"/>
            <path d="M230 368 C255 352 280 357 310 365" stroke="#6BBF59" strokeWidth="1.8" strokeOpacity="0.18" fill="none" strokeLinecap="round"/>
            <path d="M370 369 C395 354 420 359 448 367" stroke="#6BBF59" strokeWidth="1.8" strokeOpacity="0.2" fill="none" strokeLinecap="round"/>
            <path d="M480 370 C500 356 525 362 548 369" stroke="#6BBF59" strokeWidth="1.6" strokeOpacity="0.16" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* ── Agri Art: Top-left elegant leaf sprig ── */}
        <div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 0 }}>
          <svg width="280" height="300" viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A8E063" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#4A9E36" stopOpacity="0.14"/>
              </linearGradient>
              <linearGradient id="leafGrad2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7BC96A" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#3A8A28" stopOpacity="0.12"/>
              </linearGradient>
            </defs>

            {/* Main stem curving from corner */}
            <path d="M0 280 C30 240 45 190 60 140 C72 100 80 60 90 30" stroke="#4A9E36" strokeWidth="2.5" strokeOpacity="0.2" fill="none" strokeLinecap="round"/>

            {/* Leaf pair 1 — large, lower */}
            <path d="M38 210 C20 185 5 160 15 135 C35 150 50 175 38 210Z" fill="url(#leafGrad1)"/>
            <path d="M38 210 C58 188 75 162 62 138 C44 152 35 178 38 210Z" fill="url(#leafGrad2)"/>
            <line x1="38" y1="210" x2="38" y2="150" stroke="#4A9E36" strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round"/>

            {/* Leaf pair 2 — mid */}
            <path d="M55 155 C34 133 20 108 30 85 C50 100 62 126 55 155Z" fill="url(#leafGrad1)"/>
            <path d="M55 155 C76 136 88 110 76 88 C58 102 50 128 55 155Z" fill="url(#leafGrad2)"/>
            <line x1="55" y1="155" x2="53" y2="100" stroke="#4A9E36" strokeWidth="1" strokeOpacity="0.14" strokeLinecap="round"/>

            {/* Leaf pair 3 — upper small */}
            <path d="M72 95 C56 76 48 54 58 36 C74 50 80 72 72 95Z" fill="url(#leafGrad1)"/>
            <path d="M72 95 C90 78 96 56 84 38 C70 52 66 74 72 95Z" fill="url(#leafGrad2)"/>
            <line x1="72" y1="95" x2="71" y2="52" stroke="#4A9E36" strokeWidth="1" strokeOpacity="0.12" strokeLinecap="round"/>

            {/* Small bud tip */}
            <ellipse cx="90" cy="30" rx="6" ry="12" fill="#6BBF59" fillOpacity="0.2" transform="rotate(-15, 90, 30)"/>
          </svg>
        </div>

        {/* MAIN */}
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px", position: "relative", zIndex: 1 }}>

          {/* ── Top bar: Logo + Visit Website ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
            <a
              href="https://digicides.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", borderRadius: 16, padding: "6px 8px", transition: "all 0.22s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <img
                src="https://i.ibb.co/Tqn0Y1wk/Logo.png"
                alt="Digicides"
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                style={{ height: 58, borderRadius: 14, objectFit: "contain" }}
              />
              <div style={{ display: "none", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: "linear-gradient(135deg, #F97316, #EA580C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(249,115,22,0.3)" }}>
                  <div style={{ width: 26, height: 26 }}><LeafIcon /></div>
                </div>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, color: "#1e293b", letterSpacing: "-0.3px" }}>
                  digi<span style={{ color: "#EA580C" }}>cides</span>
                </span>
              </div>
            </a>

            <a
              href="https://digicides.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600, color: "#EA580C", background: "rgba(249,115,22,0.08)", border: "1.5px solid rgba(249,115,22,0.25)", padding: "10px 22px", borderRadius: 100, textDecoration: "none", letterSpacing: "0.2px", transition: "all 0.22s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.15)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.25)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Visit Website
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
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
                <span style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Convert.</span>
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
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: "#EA580C", letterSpacing: "-0.4px", lineHeight: 1 }}>{s.value}</div>
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
                <a href="mailto:connect@digicides.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: "#EA580C", textDecoration: "none" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  connect@digicides.com
                </a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="form-right" style={{ width: "45%" }}>
              <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(18px)", borderRadius: 22, padding: "36px 36px 32px", boxShadow: "0 24px 64px rgba(249,115,22,0.1), 0 4px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(255,255,255,0.95)" }}>

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
                    <button onClick={() => setSubmitStatus("idle")} style={{ marginTop: 22, fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: "#EA580C", background: "rgba(249,115,22,0.08)", border: "1.5px solid rgba(249,115,22,0.2)", padding: "8px 20px", borderRadius: 8, cursor: "pointer" }}>
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
