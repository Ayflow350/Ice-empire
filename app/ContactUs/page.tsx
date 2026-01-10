"use client";

import React, { useState } from "react";
import {
  Send,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
} from "lucide-react";

const ContactPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Toggle FAQ Accordion
  interface FAQ {
    question: string;
    answer: string;
  }

  const toggleAccordion = (index: number): void => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the estimated dispatch time?",
      answer:
        "All orders are processed within 24-48 hours. Domestic shipments arrive within 3-5 business days via armored priority courier. International protocols take 7-14 days.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Affirmative. The Icempire dominion is global. We ship to over 180 countries worldwide. Duties and taxes are calculated at checkout based on your region's regulations.",
    },
    {
      question: "What is your return protocol?",
      answer:
        "Returns are accepted within 30 days of receipt. Items must be unworn, unwashed, and in original armor condition with all tags attached. Initiate a return request via your account dashboard.",
    },
    {
      question: "How do I care for the leather pieces?",
      answer:
        "Do not wash. Do not bleach. Professional leather clean only. Store in a cool, dry environment away from direct solar radiation to maintain material integrity.",
    },
  ];

  return (
    // CHANGED: Selection color to grey
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE (Obsidian Base) ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Zinc Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>

        {/* CHANGED: Storm Glows to Ash/White */}
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-zinc-700/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[100px] rounded-full animate-pulse delay-700"></div>

        {/* Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* ================= HEADER SPACER ================= */}
      <div className="h-30"></div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* LEFT COLUMN: CONTACT FORM */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-4">
                Initiate <br /> Transmission
              </h1>
              <p className="text-zinc-400 text-sm tracking-wide font-light">
                Our support team is online. Expect a response within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {/* CHANGED: Label to Ash Bone (Zinc-400) */}
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    Name
                  </label>
                  <div className="relative group">
                    {/* CHANGED: Focus border/bg to White/Grey */}
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300"
                      placeholder="ENTER NAME"
                    />
                    <div className="absolute inset-0 border border-transparent group-hover:border-white/20 pointer-events-none rounded-lg transition-colors"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300"
                      placeholder="ENTER EMAIL"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                  Subject
                </label>
                <div className="relative group">
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-zinc-300 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300 appearance-none">
                    <option>ORDER STATUS</option>
                    <option>PRODUCT INQUIRY</option>
                    <option>RETURNS / EXCHANGES</option>
                    <option>OTHER</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                  Transmission
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                ></textarea>
              </div>

              {/* Submit Button */}
              {/* CHANGED: Hover state to Zinc-300 instead of Cyan */}
              <button
                type="button"
                className="group relative w-full overflow-hidden bg-white text-black rounded-lg py-4 transition-all hover:bg-zinc-200"
              >
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm">
                  Send Transmission{" "}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            {/* Direct Contacts */}
            <div className="mt-12 flex flex-col md:flex-row gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  {/* CHANGED: Icon to White */}
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-500">
                    General Support
                  </span>
                  <span className="text-sm font-bold text-white">
                    support@icempire.com
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  {/* CHANGED: Icon to White */}
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-500">
                    Live Chat
                  </span>
                  <span className="text-sm font-bold text-white">
                    Offline (09:00 - 18:00 EST)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ ACCORDION */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10 flex items-center gap-3">
              {/* CHANGED: Icon to White */}
              <HelpCircle className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
                FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  // CHANGED: Active border from Cyan to Zinc-400
                  className={`group border rounded-xl overflow-hidden transition-all duration-300 ${
                    activeAccordion === index
                      ? "border-zinc-400 bg-white/[0.05]"
                      : "border-white/10 bg-transparent hover:border-white/30"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span
                      className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                        activeAccordion === index
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>
                    {/* CHANGED: Chevron from Cyan to White */}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeAccordion === index
                          ? "rotate-180 text-white"
                          : "text-zinc-500"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeAccordion === index
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-0 text-sm text-zinc-400 font-light leading-relaxed border-t border-dashed border-white/10 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Box */}
            <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative overflow-hidden group">
              {/* CHANGED: Overlay glow to Zinc */}
              <div className="absolute inset-0 bg-zinc-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="relative z-10 text-lg font-bold uppercase tracking-widest text-white mb-2">
                Need Custom Wears?
              </h3>
              <p className="relative z-10 text-xs text-zinc-400 mb-4">
                We offer bespoke tailoring for elite clientele.
              </p>
              {/* CHANGED: Button from Cyan to Zinc-300/White */}
              <button className="relative z-10 text-xs font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-300 pb-1 hover:text-white hover:border-white transition-all">
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Footer Line */}
      {/* CHANGED: Gradient from Cyan to Zinc */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>
    </div>
  );
};

export default ContactPage;
