import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Network, 
  Database, 
  Cpu, 
  Layers, 
  Globe, 
  ArrowRight, 
  Server, 
  Send,
  Image as ImageIcon,
  Users,
  CheckCircle2,
  Mail,
  Cloud,
  Code,
  Award,
  ExternalLink,
  Lock
} from 'lucide-react';

const BrushStroke = () => (
  <svg className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] text-[#1B4B43] -z-10 opacity-90" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.7,-76.4C58.9,-69.3,69.2,-55.4,78.2,-41.2C87.1,-27,94.7,-12.5,93.4,1.4C92.1,15.2,81.9,28.3,71.2,39.6C60.5,50.8,49.3,60.1,36.5,67.8C23.7,75.4,9.3,81.3,-5.1,89.5C-19.6,97.7,-34.2,88.1,-46.8,78.7C-59.4,69.4,-70.1,60.3,-77.3,48.4C-84.5,36.5,-88.2,21.8,-87.3,7.9C-86.4,-6.1,-80.8,-19.3,-72.5,-29.8C-64.2,-40.3,-53.2,-48,-41.5,-54.6C-29.8,-61.2,-17.4,-66.6,-2.2,-63.1C13.1,-59.6,26.1,-47.1,45.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
  </svg>
);

export default function App() {
  const [terminalInput, setTerminalInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      sender: 'system', 
      text: 'Initializing grounding layer...\nLoading juma_amasai_profile.json...\nAgent ready. Type a prompt below to query the systems architecture and experience.',
      timestamp: '14:24:01' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const userMsg = terminalInput;
    const timestamp = new Date().toTimeString().split(' ')[0];
    
    const newHistory = [...chatHistory, {
      id: Date.now(),
      sender: 'user',
      text: userMsg,
      timestamp
    }];
    setChatHistory(newHistory);
    setTerminalInput('');
    setIsTyping(true);

    // Client-side processing for instant feedback in static export
    setTimeout(() => {
      let reply = 'Command not recognized. Try: "What is Utu Engineering?", "Explain Ansai Financial Philosophy", or "Data Architecture Standard".';
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('safaricom') || lower.includes('experience')) {
        reply = 'At Safaricom PLC (May-Oct 2025), I served as a Cloud Engineer administering 47 production Linux and Windows servers with 99.99% uptime SLAs. I built Python and Bash automation scripts for system health monitoring and acted as the DRI (Designated Responsible Individual) for cross-functional incident response.';
      } else if (lower.includes('stack') || lower.includes('technologies') || lower.includes('tech')) {
        reply = 'Core Stack:\n- Systems & Virt: Linux, Windows Server, VirtualBox, Active Directory\n- Cloud & Infra: GCP (Cloud Run, BigQuery, IAM), Cloudflare, Render, AWS\n- DevOps: GitHub Actions CI/CD, Python/Bash automation\n- DBs: PostgreSQL, Prisma, Supabase\n- Security: 22-role RBAC, Kenya Data Protection Act 2019 compliance.';
      } else if (lower.includes('edumanage') || lower.includes('architecture')) {
        reply = 'EduManage (live at edumanage.co.ke) is a multi-tenant TypeScript/Fastify/Prisma/PostgreSQL platform. It handles M-PESA fee payments, CBC/CBE grading compliance, and features a strict 22-role RBAC system for secondary schools across Kenya.';
      } else if (lower.includes('philosophy') || lower.includes('utu') || lower.includes('stewardship')) {
        reply = '"Utu Engineering" focuses on structural empathy and stewardship. Engineering is a service to people. Every feature decision starts with a named human being. Complexity is the enemy of the people we serve. If a school administrator needs training to understand a feature, the feature is wrong. Mtu ni utu.';
      } else if (lower.includes('ansai')) {
        reply = 'Ansai Technologies is the operational infrastructure platform for Africa. We build software for the institutions that shape African life — schools, farms, clinics. We build for the actual conditions: offline-first, local-first data architecture. We build infrastructure, not apps.';
      } else if (lower.includes('culture') || lower.includes('pamoja') || lower.includes('mshauri')) {
        reply = 'Pamoja Culture means working horizontally, with shared ownership. Disagreement is a first-class activity. Every person on the team is a "Mshauri Engineer" (trusted adviser). We visit the institutions we serve monthly, acting as a sensor in the field, not to pitch, but to observe and understand.';
      } else if (lower.includes('data architecture') || lower.includes('gep-001') || lower.includes('offline')) {
        reply = 'Ansai Engineering Principle (GEP-001):\n\nLocal-first · Sync-always · Backup-automated · Loss-never.\n\nData is written locally to IndexedDB first. Background sync via Service Workers happens when connectivity exists. This is our compounding advantage for African infrastructure.';
      } else if (lower.includes('financial') || lower.includes('gfp-001') || lower.includes('pricing')) {
        reply = 'Ansai Financial Philosophy (GFP-001):\n\nDepth over breadth. Infrastructure pricing aligns with the institution\'s operating cycles (e.g. termly for schools, seasonally for farms). We price against the cost we replace, aiming to earn deep institutional dependency.';
      } else if (lower.includes('ai') || lower.includes('research') || lower.includes('systems thinking') || lower.includes('charter')) {
        reply = 'Ansai AI Systems Research Charter:\nWe use multi-scale thinking and nine lenses (including Systems Thinking and Biomimicry) to understand intelligence. We favor first principles over fact lists, looking at biology as an engineering reference (immune systems, swarm intelligence) to build resilient digital infrastructure.';
      }

      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toTimeString().split(' ')[0]
      }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#1C1D20] font-sans selection:bg-[#FFC83A]/40 selection:text-[#1C1D20]">
      
      {/* NAVIGATION BAR */}
      <nav className="flex justify-between items-center py-6 px-6 md:px-12 max-w-[90rem] mx-auto">
        <div className="font-black text-2xl tracking-tighter text-[#1C1D20]">Juma Melchizedek.</div>
        
        <div className="hidden md:flex gap-10 text-sm font-bold text-neutral-600 border border-neutral-200/60 rounded-full px-10 py-4 bg-white/60 backdrop-blur-md shadow-sm">
          <a href="#about" className="hover:text-[#FFC83A] transition-colors">Philosophy</a>
          <a href="#experience" className="hover:text-[#FFC83A] transition-colors">Experience</a>
          <a href="#works" className="hover:text-[#FFC83A] transition-colors">Infrastructure</a>
          <a href="#terminal" className="hover:text-[#FFC83A] transition-colors">Terminal</a>
        </div>

        <a href="mailto:amasaimelchizedek@gmail.com" className="hidden sm:flex items-center gap-2 font-bold text-sm bg-[#1C1D20] text-white px-6 py-4 rounded-full hover:bg-[#1B4B43] transition-colors shadow-lg">
          <Mail className="w-4 h-4" /> Connect
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 relative z-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-3">
             <span className="w-10 h-[3px] bg-[#FFC83A]"></span>
             <span className="text-[#FFC83A] font-black text-sm tracking-[0.2em] uppercase">Cloud Engineer &amp; Systems Thinker</span>
          </div>
          
          <h1 className="text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter leading-[0.95] text-[#1C1D20]">
            Building <br/> <span className="text-[#1B4B43]">resilient</span> <br/>
            digital <br/> <span className="bg-[#FFC83A] px-4 inline-block mt-2 transform -rotate-2 text-[3.2rem] md:text-[5rem] lg:text-[5.5rem]">ecosystems.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 max-w-lg font-medium leading-relaxed">
            Systems administrator and cloud engineer building the operational infrastructure for African institutions. We build for the actual conditions, not despite them.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="https://github.com/IamAmasai" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-neutral-200 hover:border-[#FFC83A] font-bold text-sm transition-colors">
              <Code className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/iamamasai" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-neutral-200 hover:border-[#1B4B43] font-bold text-sm transition-colors">
              <Globe className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://ansaitechnologies.co.ke/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-neutral-200 hover:border-[#FFC83A] font-bold text-sm transition-colors">
              <Layers className="w-4 h-4" /> Ansai Tech
            </a>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[500px] lg:h-[700px] order-1 lg:order-2">
          {/* Brush Stroke / Blob */}
          <BrushStroke />

          {/* Main Image Container */}
          <div className="relative w-[280px] h-[380px] md:w-[380px] md:h-[500px] z-10">
             <div className="absolute inset-0 bg-[#E8E3D9] rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl overflow-hidden border-[12px] border-white shadow-2xl flex flex-col items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/photos/red-bow-tie.jpg" alt="Juma in a red bow-tie" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                {/* Fallback Photo Placeholder */}
                <div className="hidden absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop")' }}>
                   <div className="absolute inset-0 bg-[#1B4B43]/10 mix-blend-multiply"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="relative z-10 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-neutral-100 flex items-center gap-2">
                       <ImageIcon className="w-4 h-4 text-[#1C1D20]" />
                       <span className="font-black text-[#1C1D20] uppercase tracking-widest text-[10px]">Upload red-bow-tie.jpg to /public/photos</span>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute -left-4 md:-left-12 bottom-12 md:bottom-24 bg-white p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-5 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
             <div className="w-14 h-14 rounded-full bg-[#FFC83A] flex items-center justify-center text-white shadow-inner">
               <Cloud className="w-7 h-7 text-[#1C1D20]" />
             </div>
             <div>
               <div className="font-black text-lg uppercase tracking-wider text-[#1C1D20]">GCP Certified</div>
               <div className="text-sm text-neutral-500 font-bold">Cloud Developer &amp; DB Engineer</div>
             </div>
          </div>

          <div className="absolute right-0 top-12 md:top-24 bg-white p-4 rounded-2xl shadow-xl z-20 transform rotate-6 hover:rotate-0 transition-transform duration-300">
             <div className="text-sm font-black text-[#1B4B43] flex items-center gap-2 uppercase tracking-wider">
               <Award className="w-5 h-5 text-[#FFC83A]"/> GitHub Campus Expert
             </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & CAPABILITIES */}
      <section id="about" className="bg-white py-32 rounded-t-[4rem] md:rounded-t-[6rem] shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.05)] relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">

          <div className="space-y-6 relative flex flex-col justify-center">
             {/* Stack of Cards */}
             <div className="bg-[#1B4B43] text-white p-8 rounded-3xl shadow-2xl flex items-center gap-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-10 w-[95%]">
               <div className="bg-white/20 p-5 rounded-2xl"><Server className="w-8 h-8"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Infrastructure Ops</h3>
                 <p className="text-base text-white/80 font-medium">Enterprise Linux/Windows &amp; Multi-site management.</p>
               </div>
             </div>

             <div className="bg-[#FFC83A] text-[#1C1D20] p-8 rounded-3xl shadow-2xl flex items-center gap-6 transform translate-x-8 -rotate-1 hover:rotate-0 transition-transform duration-300 z-20 relative w-[95%]">
               <div className="bg-white/40 p-5 rounded-2xl"><Cloud className="w-8 h-8"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Cloud Architecture</h3>
                 <p className="text-base text-neutral-800 font-medium">GCP, AWS, Cloudflare, Multi-tenant schemas.</p>
               </div>
             </div>

             <div className="bg-[#FDF9F1] text-[#1C1D20] p-8 rounded-3xl shadow-xl flex items-center gap-6 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative z-10 w-[95%] border border-neutral-200">
               <div className="bg-white p-5 rounded-2xl shadow-sm"><Lock className="w-8 h-8 text-teal-600"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Security &amp; Compliance</h3>
                 <p className="text-base text-neutral-600 font-medium">RBAC design &amp; Data Protection Act adherence.</p>
               </div>
             </div>
          </div>

          <div className="space-y-10 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1C1D20] leading-[1.1]">
              Infrastructure, not just <span className="text-[#FFC83A] underline decoration-8 underline-offset-4">applications.</span>
            </h2>
            <div className="space-y-6 text-xl text-neutral-600 font-medium leading-relaxed">
              <p>
                My work centers on <strong>Utu Engineering</strong> — building with full awareness of the human being on the other side of every screen. Every human being carries inherent dignity that no algorithm can confer or remove. This conviction is rooted in my worldview, faith, and a deep commitment to stewardship.
              </p>
              <p className="p-6 bg-[#FDF9F1] rounded-3xl border border-[#FFC83A]/30 text-[#1C1D20]">
                As an <strong className="text-[#FFC83A] font-black mr-1">Ecosystem Builder</strong>, 
                I operate under a <em>Pamoja</em> culture (shared ownership). I believe Africa's greatest challenge is not a lack of technology, but a lack of infrastructure designed for its actual conditions. We build for intermittent connectivity, local-first architectures, and absolute data sovereignty.
              </p>
            </div>
            
            <div className="flex gap-12 pt-4 border-t border-neutral-100 flex-wrap">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <Award className="w-6 h-6 text-[#1B4B43]" />
                    <span className="font-bold text-neutral-900 text-lg">Foundations</span>
                 </div>
                 <div className="text-sm text-neutral-500 font-bold uppercase tracking-widest">GitHub Cert.</div>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <Award className="w-6 h-6 text-[#1B4B43]" />
                    <span className="font-bold text-neutral-900 text-lg">Actions</span>
                 </div>
                 <div className="text-sm text-neutral-500 font-bold uppercase tracking-widest">GitHub Cert.</div>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <Database className="w-6 h-6 text-[#FFC83A]" />
                    <span className="font-bold text-neutral-900 text-lg">DB Engineer</span>
                 </div>
                 <div className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Google Cloud</div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXPERIENCE (TIMELINE) */}
      <section id="experience" className="bg-[#FDF9F1] py-32 relative z-10">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
             <div className="inline-flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-[3px] bg-[#1B4B43]"></span>
                <span className="text-[#1B4B43] font-black text-sm tracking-[0.2em] uppercase">Experience &amp; Leadership</span>
                <span className="w-8 h-[3px] bg-[#1B4B43]"></span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-[#1C1D20] tracking-tighter">Professional Timeline</h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-16 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent">

            {/* Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-[#1B4B43] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Founder &amp; CEO</h3>
                    <span className="font-bold text-xs bg-[#FFC83A]/20 text-[#D99A00] px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">2024 - Present</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-[#1B4B43] mb-5 uppercase tracking-widest">
                   <Globe className="w-4 h-4"/> Ansai Technologies
                 </div>
                 <p className="text-base text-neutral-600 font-medium leading-relaxed">
                   Independently architected and maintains the full infrastructure stack for a live multi-tenant production system (Render, Cloudflare Pages, R2). Designed a 22-role RBAC system fully compliant with the Kenya Data Protection Act 2019.
                 </p>
               </div>
            </div>

            {/* Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-[#FFC83A] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Cloud Engineer</h3>
                    <span className="font-bold text-xs bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">May 2025 – Oct 2025</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-neutral-500 mb-5 uppercase tracking-widest">
                   <Cloud className="w-4 h-4"/> Safaricom PLC
                 </div>
                 <p className="text-base text-neutral-600 font-medium leading-relaxed">
                   Administered 47 production Linux/Windows servers (99.99% SLA). Built microcloud test environments (VirtualBox, Ubuntu) and Python/Bash automation for health monitoring. Acted as DRI for incident response coordinating cross-functional teams.
                 </p>
               </div>
            </div>

            {/* Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-teal-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Campus Expert</h3>
                    <span className="font-bold text-xs bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">Feb 2024 - Present</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-neutral-500 mb-5 uppercase tracking-widest">
                   <Users className="w-4 h-4"/> GitHub
                 </div>
                 
                 {/* Photo Placement for GitHub Campus Expert */}
                 <div className="mb-5 h-48 w-full rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                    <img src="/photos/outdoor-speaking.jpg" alt="Outdoor Speaking" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                    <div className="hidden absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop")' }}>
                      <div className="absolute inset-0 bg-[#1B4B43]/10 mix-blend-multiply"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1C1D20] shadow-sm flex items-center gap-2">
                           <ImageIcon className="w-3 h-3" /> Upload outdoor-speaking.jpg to /public/photos
                         </span>
                      </div>
                    </div>
                 </div>

                 <p className="text-base text-neutral-600 font-medium leading-relaxed">
                   Recognised for open source advocacy and developer education. Cultivates a pan-African developer network directly aligned with Greenpeace Africa’s multi-country operational model. Travelled to Kigali, Rwanda for community leadership training.
                 </p>
               </div>
            </div>

            {/* Item 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Community Lead</h3>
                    <span className="font-bold text-xs bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">Oct 2022 – Oct 2023</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-neutral-500 mb-5 uppercase tracking-widest">
                   <Users className="w-4 h-4"/> Google Developer Student Clubs
                 </div>

                 {/* Photo Placement for GDSC / DevFest */}
                 <div className="mb-5 h-48 w-full rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                    <img src="/photos/devfest.jpg" alt="DevFest 2023" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                    <div className="hidden absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop")' }}>
                      <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1C1D20] shadow-sm flex items-center gap-2">
                           <ImageIcon className="w-3 h-3" /> Upload devfest.jpg to /public/photos
                         </span>
                      </div>
                    </div>
                 </div>

                 <p className="text-base text-neutral-600 font-medium leading-relaxed">
                   Led a campus developer community focused on Cloud, AI, and DevOps. Coordinated with regional leads across East Africa for joint events and cross-institutional knowledge transfer.
                 </p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* LATEST WORKS (CASE STUDIES) */}
      <section id="works" className="bg-[#1C1D20] py-32 text-white md:rounded-[6rem] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.5)] relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                 <span className="w-10 h-[3px] bg-[#FFC83A]"></span>
                 <span className="text-[#FFC83A] font-black text-sm tracking-[0.2em] uppercase">Digital Infrastructure</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Projects &amp; Prototypes</h2>
            </div>
            <a href="https://github.com/IamAmasai" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold text-lg hover:text-[#FFC83A] transition-colors pb-2 border-b-2 border-transparent hover:border-[#FFC83A]">
              View All Repos <ArrowRight className="w-6 h-6"/>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             {/* Card 1 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 shadow-2xl relative">
               <div className="bg-[#FFC83A] h-56 rounded-3xl mb-8 p-6 flex items-center justify-center relative overflow-hidden">
                  <Database className="w-24 h-24 text-yellow-800 opacity-40 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-yellow-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Production</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">EduManage <br/> Platform</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 Multi-tenant TypeScript/Fastify/Prisma/PostgreSQL platform with M-PESA payments, CBC/CBE grading, and 22-role RBAC for schools across Kenya.
               </p>
               <div className="flex gap-2 flex-wrap mb-6">
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Fastify</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">PostgreSQL</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">RBAC</span>
               </div>
               <a href="https://edumanage.co.ke/" target="_blank" rel="noreferrer" className="absolute top-12 right-12 bg-white text-[#1C1D20] p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
                 <ExternalLink className="w-5 h-5" />
               </a>
             </div>

             {/* Card 2 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 lg:translate-y-12 shadow-2xl relative">
               <div className="bg-[#1B4B43] h-56 rounded-3xl mb-8 p-6 flex items-center justify-center relative overflow-hidden">
                  <Network className="w-24 h-24 text-teal-900 opacity-50 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Open Source</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">ArdhiX Land <br/> Governance</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 Blockchain-based land registry (Next.js + Supabase on Base) applying Digital Public Infrastructure principles to title deed management in East Africa.
               </p>
               <div className="flex gap-2 flex-wrap mb-6">
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Next.js</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Supabase</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Blockchain</span>
               </div>
             </div>

             {/* Card 3 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 shadow-2xl relative">
               <div className="bg-blue-500 h-56 rounded-3xl mb-8 p-6 flex items-center justify-center relative overflow-hidden">
                  <Server className="w-24 h-24 text-blue-900 opacity-50 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Research</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">Microcloud Lab <br/> Infrastructure</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 Self-hosted private cloud (VirtualBox, Ubuntu, Nextcloud) for prototyping resilient deployment architectures in low-connectivity edge environments.
               </p>
               <div className="flex gap-2 flex-wrap mb-6">
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Ubuntu</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">VirtualBox</span>
                 <span className="bg-white/10 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Nextcloud</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* TERMINAL SECTION */}
      <section id="terminal" className="py-32 bg-[#FDF9F1] relative">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-[#FFC83A] transform -rotate-2 rounded-[3rem] shadow-xl"></div>
             <div className="relative w-full rounded-[2.5rem] border-4 border-white bg-[#1C1D20] flex flex-col h-[600px] shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
               {/* Terminal Header */}
               <div className="bg-[#2A2B2E] border-b border-neutral-700 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TerminalIcon className="w-5 h-5 text-[#FFC83A]" />
                    <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">sysadmin -- interactive</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm"></span>
                  </div>
               </div>

               {/* Terminal Body */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8 font-mono text-sm scrollbar-thin scrollbar-thumb-neutral-700 text-neutral-300">
                  {chatHistory.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>[{item.timestamp}]</span>
                        <span className="uppercase tracking-widest font-black text-[#FFC83A]">
                          {item.sender === 'system' ? 'System Engine' : item.sender === 'user' ? 'Operator' : 'Agent Response'}
                        </span>
                      </div>
                      
                      {item.sender === 'system' ? (
                        <div className="text-[#FFC83A] whitespace-pre-line border-l-4 border-[#FFC83A] pl-4 py-2 bg-[#FFC83A]/10 rounded-r-lg font-bold">
                          {item.text}
                        </div>
                      ) : item.sender === 'user' ? (
                        <div className="text-white flex items-start gap-3">
                          <span className="text-neutral-500 select-none font-bold">$</span>
                          <span className="text-base font-bold">{item.text}</span>
                        </div>
                      ) : (
                        <div className="text-neutral-300 whitespace-pre-line pl-4 border-l-4 border-neutral-700 text-base leading-relaxed bg-neutral-800/30 py-2 rounded-r-lg">
                          {item.text}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="text-[#FFC83A] animate-pulse text-xs font-bold pt-4">
                      &gt; Processing query...
                    </div>
                  )}
                  <div ref={chatEndRef} />
               </div>

               {/* Terminal Input */}
               <form onSubmit={handleTerminalSubmit} className="bg-[#2A2B2E] p-3 flex items-center gap-3 m-4 rounded-2xl">
                  <span className="font-mono text-lg font-bold text-[#FFC83A] pl-4 select-none">$</span>
                  <input 
                    type="text" 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Ask about my stack, experience, or philosophy..." 
                    className="flex-1 bg-transparent border-0 outline-none text-base font-mono text-white placeholder-neutral-500 focus:ring-0"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#FFC83A] hover:bg-yellow-400 text-[#1C1D20] p-4 rounded-xl transition-all flex items-center justify-center font-black shadow-md"
                    disabled={isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </button>
               </form>
             </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-8 flex flex-col justify-center">
             <div className="inline-flex items-center gap-3">
               <span className="w-10 h-[3px] bg-[#1B4B43]"></span>
               <span className="text-[#1B4B43] font-black text-sm tracking-[0.2em] uppercase">Interactive</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-[#1C1D20] leading-[1.05] tracking-tighter">Query the <br/> Profile.</h2>
             <p className="text-xl text-neutral-600 font-medium leading-relaxed">
               Want to know more about the tech stack, my Safaricom experience, or the EduManage architecture? Interact with the live terminal.
             </p>
             <div className="flex flex-col gap-4 pt-6">
               <div className="font-bold text-xs text-neutral-400 uppercase tracking-widest">Quick Commands</div>
               <button onClick={() => setTerminalInput('What is Utu Engineering?')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Utu Engineering
               </button>
               <button onClick={() => setTerminalInput('Explain the Ansai Financial Philosophy (GFP-001)')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Ansai Financial Philosophy
               </button>
               <button onClick={() => setTerminalInput('What is your data architecture standard (GEP-001)?')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Data Architecture
               </button>
               <button onClick={() => setTerminalInput('Detail your experience at Safaricom.')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Safaricom Experience
               </button>
             </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FFC83A] text-[#1C1D20] py-20 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05]">Let's build something <br/>resilient.</h2>
              <p className="text-2xl font-bold text-yellow-900">Start by saying <a href="mailto:amasaimelchizedek@gmail.com" className="underline decoration-4 underline-offset-4 hover:text-white transition-colors">hello</a>.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 font-black text-lg w-full lg:w-auto">
              <a href="https://github.com/IamAmasai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:-translate-y-2 transition-transform bg-white px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl flex-1 lg:flex-none">
                GitHub <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/iamamasai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:-translate-y-2 transition-transform bg-[#1C1D20] text-white px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl flex-1 lg:flex-none">
                LinkedIn <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t-4 border-yellow-500/30 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-black text-yellow-900">
            <div className="flex flex-wrap justify-center gap-6 uppercase tracking-[0.2em]">
              <a href="https://ansaitechnologies.co.ke/" target="_blank" rel="noreferrer" className="hover:text-white transition">Ansai Technologies</a>
              <span>&bull;</span>
              <span>Sysadmin</span>
              <span>&bull;</span>
              <span>Cloud Eng</span>
              <span>&bull;</span>
              <span>Ecosystems</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Ansai Technologies. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
