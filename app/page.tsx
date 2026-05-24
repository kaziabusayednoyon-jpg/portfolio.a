"use client";

import { useState, useEffect, useRef } from "react";

const terra = "#c4622d";
const terraLight = "#e8845a";
const sage = "#4a6741";
const ink = "#1a1a14";
const ink2 = "#4a4a3a";
const muted = "#8a8a7a";
const bg = "#f7f4ef";
const cream = "#faf7f2";
const border = "#d8d0c4";

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

const sections = ["About", "Education", "Skills", "Hobbies", "Goals", "Contact"];

const hobbies = [
  { icon: "🎨", name: "Painting" },
  { icon: "🤲", name: "Helping Others" },
  { icon: "🛠️", name: "DIY Crafts" },
  { icon: "✈️", name: "Traveling" },
  { icon: "🏏", name: "Cricket" },
  { icon: "📚", name: "Reading Books" },
];

const goals = [
  { num: "01", title: "Achieve IELTS Band 6.5+", desc: "Actively preparing for IELTS — the most critical step toward studying in Europe." },
  { num: "02", title: "Build Certifications", desc: "Completing online courses in Business and Economics basics via Coursera and edX." },
  { num: "03", title: "Gain Volunteer Experience", desc: "Participating in community service and NGO work to demonstrate leadership and social responsibility." },
  { num: "04", title: "Study in Europe", desc: "Applying to universities in Germany, Netherlands, or Finland for International Business / Management." },
  { num: "05", title: "Build a Global Career", desc: "Using my international education and communication skills to build a meaningful career in global business." },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: bg, color: ink, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .skill-tag:hover { background: ${terra} !important; color: white !important; border-color: ${terra} !important; }
        .hobby-card:hover { border-color: ${terra} !important; transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(26,26,20,0.12) !important; }
        .goal-item:hover { border-color: ${terra} !important; transform: translateX(8px) !important; }
        .contact-card:hover { border-color: ${terra} !important; transform: translateY(-4px) !important; box-shadow: 0 12px 32px rgba(26,26,20,0.1) !important; }
        .nav-link:hover { color: ${terra} !important; }
        .edu-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(26,26,20,0.12) !important; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .hero-anim { animation: fadeIn 1s ease both; }
        .hero-anim-2 { animation: fadeIn 1s 0.2s ease both; }
        .hero-anim-3 { animation: fadeIn 1s 0.4s ease both; }
        .hero-anim-4 { animation: fadeIn 1s 0.6s ease both; }
        .blink { animation: blink 1.5s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 2.5rem",
        background: scrolled ? "rgba(247,244,239,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
        transition: "all 0.4s ease",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: `1px solid ${terra}`, background: "#fff" }}>
            <img src="/profile.jpg" alt="ASN" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: terra }}>
            Abu Sayed Noyon
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {sections.map(s => (
            <button key={s} className="nav-link"
              onClick={() => scrollTo(s)}
              style={{ background: "none", border: "none", cursor: "pointer", color: ink2, fontSize: "0.8rem", fontFamily: "'Outfit',sans-serif", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", padding: 0 }}>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "7rem 5vw 4rem", gap: "4rem",
        flexWrap: "wrap",
        background: `linear-gradient(135deg, ${bg} 60%, #ede5d8 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: "-1rem", bottom: "-3rem", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(8rem,20vw,18rem)", fontWeight: 700, color: "rgba(196,98,45,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>ASN</div>

        <div style={{ flex: "1 1 340px", maxWidth: 560 }}>
          <div className="hero-anim" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: terra, color: "#fff", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: 100, marginBottom: "1.5rem", fontFamily: "'Outfit',sans-serif" }}>
            <span className="blink" style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
            Open to Opportunities
          </div>

          <h1 className="hero-anim-2" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3.5rem,8vw,6rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 1.5rem" }}>
            Abu Sayed<br />
            <em style={{ color: terra, fontStyle: "italic" }}>Noyon</em>
          </h1>

          <p className="hero-anim-3" style={{ fontFamily: "'Outfit',sans-serif", color: ink2, lineHeight: 1.9, fontSize: "1rem", fontWeight: 300, marginBottom: "2rem" }}>
            A passionate student from <strong style={{ color: ink, fontWeight: 600 }}>Sylhet, Bangladesh</strong> — aspiring International Business professional, IELTS candidate, and creative soul. Driven by curiosity, empathy, and a desire to grow globally.
          </p>

          <div className="hero-anim-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")} style={{ background: terra, color: "#fff", border: "none", borderRadius: 100, padding: "0.8rem 2rem", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>
              Get In Touch
            </button>
            <button onClick={() => scrollTo("Goals")} style={{ background: "transparent", color: ink2, border: `1.5px solid ${border}`, borderRadius: 100, padding: "0.8rem 2rem", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>
              My Goals →
            </button>
          </div>
        </div>

        {/* HERO IMAGE CONTAINER */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <div className="hero-anim-2" style={{ width: "260px", height: "260px", borderRadius: "50%", overflow: "hidden", border: `4px solid ${terra}`, boxShadow: "0 12px 36px rgba(26,26,20,0.15)", background: cream, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src="/profile.jpg" alt="Abu Sayed Noyon" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/260?text=ASN"; }} />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {[
              { icon: "🎓", val: "HSC 2025", label: "Humanities · Dakshin Surma Govt. College, Sylhet", color: "rgba(196,98,45,0.1)" },
              { icon: "🌍", val: "Europe Bound", label: "Targeting International Business / Management", color: "rgba(74,103,65,0.1)" },
              { icon: "📝", val: "IELTS Prep", label: "Actively preparing · Target Band 6.5+", color: "rgba(74,108,200,0.1)" },
            ].map((s, i) => (
              <div key={i} className={`hero-anim-${i + 2}`} style={{ background: cream, border: `1px solid ${border}`, borderRadius: 20, padding: "1.3rem 1.8rem", display: "flex", alignItems: "center", gap: "1.2rem", boxShadow: "0 2px 12px rgba(26,26,20,0.06)", transition: "transform 0.3s" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, display: "grid", placeItems: "center", fontSize: "1.3rem", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", color: muted, marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>01 — About Me</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem" }}>Who I Am</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: "'Outfit',sans-serif", color: ink2, lineHeight: 1.9, fontSize: "1rem", fontWeight: 300 }}>
              <p>My name is <strong style={{ color: ink, fontWeight: 600 }}>Abu Sayed Noyon</strong>, and I am a young, motivated student from <strong style={{ color: ink, fontWeight: 600 }}>Sylhet, Bangladesh</strong>. I completed my Higher Secondary Certificate (HSC) from Dakshin Surma Government College, Sylhet, under the Humanities group.</p>
              <p style={{ marginTop: "1.2rem" }}>I am deeply passionate about <strong style={{ color: ink, fontWeight: 600 }}>International Business and Management</strong> and am working toward pursuing this degree in Europe. My Humanities background has given me strong communication and cultural understanding skills — genuine strengths in the global business world.</p>
              <p style={{ marginTop: "1.2rem" }}>Beyond academics, I love <strong style={{ color: ink, fontWeight: 600 }}>painting, crafting, traveling, cricket, and helping others</strong>. These interests have shaped me into a curious, empathetic, and creative individual who is always eager to learn something new.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: ink, borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-1rem", left: "0.8rem", fontFamily: "'Cormorant Garamond',serif", fontSize: "8rem", fontWeight: 700, color: terra, opacity: 0.25, lineHeight: 1, userSelect: "none" }}>"</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontStyle: "italic", color: "#fff", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
                "The secret of getting ahead is getting started."
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginTop: "1rem", letterSpacing: "0.1em" }}>— Mark Twain</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* EDUCATION */}
      <section id="education" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>02 — Education</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem" }}>Academic Background</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1.5rem" }}>
          {[
            { year: "2022", degree: "Secondary School Certificate", inst: "SSC · Science Group · Boroiuri Dadu's Sunna Bohumukhi Alim Madrasha", gpa: "3.89", denom: "/ 5.00 GPA", color: terra },
            { year: "2025", degree: "Higher Secondary Certificate", inst: "HSC · Dakshin Surma Govt. College, Sylhet", gpa: "3.17", denom: "/ 5.00 GPA", color: terra },
            { year: "Upcoming", degree: "International Business / Management", inst: "Target: Germany · Netherlands · Finland", gpa: "Dream", denom: "In Progress", color: sage },
          ].map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="edu-card" style={{ background: cream, border: `1px solid ${border}`, borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden", boxShadow: "0 2px 12px rgba(26,26,20,0.06)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "default" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${e.color}, ${terraLight})` }} />
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: "0.5rem" }}>{e.year}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.4rem" }}>{e.degree}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: ink2, marginBottom: "1.2rem" }}>{e.inst}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 700, color: e.color }}>{e.gpa}</span>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", color: muted }}>{e.denom}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* SKILLS */}
      <section id="skills" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>03 — Skills</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem" }}>What I Bring</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
          {[
            { icon: "💻", title: "Technical Skills", tags: ["AI Automation", "Microsoft Word", "Microsoft PowerPoint", "Basic Internet Research", "Email Writing"], highlight: ["AI Automation"] },
            { icon: "🤝", title: "Soft Skills", tags: ["Communication", "Problem Solving", "Time Management", "Teamwork", "Hardworking Attitude", "Quick Learner"], highlight: ["Communication", "Problem Solving"] },
            { icon: "🌐", title: "Languages", tags: ["Bangla (Native)", "English (Intermediate)"], highlight: ["Bangla (Native)"] },
            { icon: "🎨", title: "Creative Skills", tags: ["Painting", "DIY Crafts", "Craft Making / Handmade Items"], highlight: ["Painting"] },
          ].map((group, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span>{group.icon}</span> {group.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {group.tags.map(tag => (
                  <span key={tag} className="skill-tag" style={{
                    background: group.highlight.includes(tag) ? "rgba(196,98,45,0.08)" : cream,
                    border: `1px solid ${group.highlight.includes(tag) ? "rgba(196,98,45,0.3)" : border}`,
                    borderRadius: 100, padding: "0.45rem 1.1rem",
                    fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", fontWeight: group.highlight.includes(tag) ? 500 : 400,
                    color: group.highlight.includes(tag) ? terra : ink2,
                    transition: "all 0.3s",
                  }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* HOBBIES */}
      <section id="hobbies" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>04 — Hobbies</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem" }}>Beyond the Classroom</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.2rem" }}>
          {hobbies.map((h, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="hobby-card" style={{ background: cream, border: `1px solid ${border}`, borderRadius: 16, padding: "1.8rem 1rem", textAlign: "center", transition: "all 0.3s", boxShadow: "0 2px 8px rgba(26,26,20,0.05)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>{h.icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", fontWeight: 500, color: ink2 }}>{h.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* GOALS */}
      <section id="goals" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>05 — Roadmap</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem" }}>Goals & Journey Ahead</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {goals.map((g, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="goal-item" style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", background: cream, border: `1px solid ${border}`, borderRadius: 16, padding: "1.5rem 2rem", transition: "all 0.3s", boxShadow: "0 2px 8px rgba(26,26,20,0.05)", cursor: "default" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 700, color: "rgba(196,98,45,0.2)", lineHeight: 1, flexShrink: 0, width: "2.8rem" }}>{g.num}</div>
                <div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{g.title}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", color: muted, lineHeight: 1.6 }}>{g.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${border}, transparent)`, margin: "0 3rem" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "5rem 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: terra, marginBottom: "0.6rem" }}>06 — Contact</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>Let's Connect</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", color: muted, lineHeight: 1.8, maxWidth: 480, marginBottom: "2rem" }}>
            Whether you're a fellow student, educator, university representative, or just want to say hello — I'd love to hear from you!
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1.2rem" }}>
          {[
            { icon: "✉️", bg: "rgba(74,108,200,0.1)", label: "EMAIL", value: "kaziabusayednoyon@gmail.com", href: "mailto:kaziabusayednoyon@gmail.com" },
            { icon: "📘", bg: "rgba(24,119,242,0.1)", label: "FACEBOOK", value: "facebook.com/kazis.Noyon", href: "https://www.facebook.com/kazis.Noyon" },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={c.href} target="_blank" rel="noreferrer" className="contact-card" style={{ display: "flex", alignItems: "center", gap: "1.2rem", background: cream, border: `1px solid ${border}`, borderRadius: 16, padding: "1.5rem 2rem", textDecoration: "none", color: ink, transition: "all 0.3s", boxShadow: "0 2px 8px rgba(26,26,20,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: c.bg, display: "grid", placeItems: "center", fontSize: "1.3rem", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", color: muted, marginBottom: "0.2rem" }}>{c.label}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", fontWeight: 500 }}>{c.value}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "2.5rem 2rem", color: muted, fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", borderTop: `1px solid ${border}`, marginTop: "2rem" }}>
        Designed with purpose · <strong style={{ color: terra }}>Abu Sayed Noyon</strong> · Sylhet, Bangladesh · 2025
      </footer>
    </div>
  );
}
