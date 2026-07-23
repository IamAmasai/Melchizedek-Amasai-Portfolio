const fs = require('fs');

const appContent = `import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Network, 
  Database, 
  Cpu, 
  Layers, 
  Globe, 
  ArrowRight, 
  GitBranch, 
  Server, 
  Send,
  BookOpen,
  DollarSign,
  HeartHandshake,
  Image as ImageIcon,
  Users,
  Lightbulb,
  CheckCircle2,
  Mail
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
      text: 'Initializing grounding layer...\\nLoading decisions.json...\\nAgent ready. Type a prompt below to query our architecture and governance systems.',
      timestamp: '14:24:01' 
    },
    { 
      id: 2, 
      sender: 'user', 
      text: 'Explain the @ansai/roles primitive-purity violation.', 
      timestamp: '14:24:15' 
    },
    { 
      id: 3, 
      sender: 'agent', 
      text: 'The boundary violation occurred within the \`@ansai/roles\` production role-based access control package. A lower-trust operation successfully reached into a higher-trust function without intermediate verification. This exposure led to the development of the "Constitutional Governance" framework, which enforces mathematical strictness on agent tasks using AST validation and structural constraints.', 
      timestamp: '14:24:16' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
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

    try {
      const response = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMsg,
          history: chatHistory.filter(h => h.sender !== 'system').slice(-5)
        })
      });
      const data = await response.json();
      
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: data.reply || 'No response',
        timestamp: new Date().toTimeString().split(' ')[0]
      }]);
    } catch (error) {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: 'ERR_CONNECTION: Unable to reach processing node.',
        timestamp: new Date().toTimeString().split(' ')[0]
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#1C1D20] font-sans selection:bg-[#FFC83A]/40 selection:text-[#1C1D20]">
      
      {/* NAVIGATION BAR */}
      <nav className="flex justify-between items-center py-6 px-6 md:px-12 max-w-[90rem] mx-auto">
        <div className="font-black text-3xl tracking-tighter italic text-[#1C1D20]">Ansai.</div>
        
        <div className="hidden md:flex gap-10 text-sm font-bold text-neutral-600 border border-neutral-200/60 rounded-full px-10 py-4 bg-white/60 backdrop-blur-md shadow-sm">
          <a href="#about" className="hover:text-[#FFC83A] transition-colors">Philosophy</a>
          <a href="#experience" className="hover:text-[#FFC83A] transition-colors">Experience</a>
          <a href="#works" className="hover:text-[#FFC83A] transition-colors">Works</a>
          <a href="#terminal" className="hover:text-[#FFC83A] transition-colors">Agent</a>
        </div>

        <a href="mailto:operator@ansai.tech" className="hidden sm:flex items-center gap-2 font-bold text-sm bg-[#1C1D20] text-white px-6 py-4 rounded-full hover:bg-[#1B4B43] transition-colors">
          <Mail className="w-4 h-4" /> Say Hello
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 relative z-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-3">
             <span className="w-10 h-[3px] bg-[#FFC83A]"></span>
             <span className="text-[#FFC83A] font-black text-sm tracking-[0.2em] uppercase">Systems Architecture</span>
          </div>
          
          <h1 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-[0.95] text-[#1C1D20]">
            Data is <br/> <span className="text-[#1B4B43]">static.</span> <br/>
            I build <br/> infra to <br/> <span className="bg-[#FFC83A] px-4 inline-block mt-2 transform -rotate-2">query it.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 max-w-lg font-medium leading-relaxed">
            The next decade belongs to those who can query every corner of their intelligence instantly. Local-first, resilient systems.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <div className="text-6xl font-black text-[#1C1D20]">04</div>
            <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest leading-tight">
              Years <br/> Experience
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[500px] lg:h-[700px] order-1 lg:order-2">
          {/* Brush Stroke / Blob */}
          <BrushStroke />

          {/* Main Image Container */}
          <div className="relative w-[280px] h-[380px] md:w-[380px] md:h-[500px] z-10">
             <div className="absolute inset-0 bg-[#E8E3D9] rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl overflow-hidden border-[12px] border-white shadow-2xl flex flex-col items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <ImageIcon className="w-20 h-20 text-neutral-400 opacity-40 mb-4" />
                <span className="font-bold text-neutral-500 uppercase tracking-widest text-sm">Operator Photo</span>
             </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute -left-4 md:-left-12 bottom-12 md:bottom-24 bg-white p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-5 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
             <div className="w-14 h-14 rounded-full bg-[#FFC83A] flex items-center justify-center text-white shadow-inner">
               <ShieldAlert className="w-7 h-7" />
             </div>
             <div>
               <div className="font-black text-lg uppercase tracking-wider text-[#1C1D20]">Utu Certified</div>
               <div className="text-sm text-neutral-500 font-bold">Infrastructure Engineer</div>
             </div>
          </div>

          <div className="absolute right-0 top-12 md:top-24 bg-white p-4 rounded-2xl shadow-xl z-20 transform rotate-6 hover:rotate-0 transition-transform duration-300">
             <div className="text-sm font-black text-[#1B4B43] flex items-center gap-2 uppercase tracking-wider">
               <Globe className="w-5 h-5 text-[#FFC83A]"/> Built in Nairobi
             </div>
          </div>
        </div>
      </section>

      {/* WHAT DO I HELP? (PARADIGM) */}
      <section id="about" className="bg-white py-32 rounded-t-[4rem] md:rounded-t-[6rem] shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.05)] relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">

          <div className="space-y-6 relative flex flex-col justify-center">
             {/* Stack of Cards */}
             <div className="bg-[#1B4B43] text-white p-8 rounded-3xl shadow-2xl flex items-center gap-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-10 w-[95%]">
               <div className="bg-white/20 p-5 rounded-2xl"><Database className="w-8 h-8"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Local-First Data</h3>
                 <p className="text-base text-white/80 font-medium">Zero-loss sync architecture.</p>
               </div>
             </div>

             <div className="bg-[#FFC83A] text-[#1C1D20] p-8 rounded-3xl shadow-2xl flex items-center gap-6 transform translate-x-8 -rotate-1 hover:rotate-0 transition-transform duration-300 z-20 relative w-[95%]">
               <div className="bg-white/40 p-5 rounded-2xl"><Cpu className="w-8 h-8"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Edge Autonomy</h3>
                 <p className="text-base text-neutral-800 font-medium">Micro-nodes &amp; ZFS storage.</p>
               </div>
             </div>

             <div className="bg-[#FDF9F1] text-[#1C1D20] p-8 rounded-3xl shadow-xl flex items-center gap-6 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative z-10 w-[95%] border border-neutral-200">
               <div className="bg-white p-5 rounded-2xl shadow-sm"><CheckCircle2 className="w-8 h-8 text-teal-600"/></div>
               <div>
                 <h3 className="text-2xl font-black mb-1">Immutable Enforcement</h3>
                 <p className="text-base text-neutral-600 font-medium">Strict constitutional governance.</p>
               </div>
             </div>
          </div>

          <div className="space-y-10 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1C1D20] leading-[1.1]">
              What drives the <span className="text-[#FFC83A] underline decoration-8 underline-offset-4">infrastructure?</span>
            </h2>
            <div className="space-y-6 text-xl text-neutral-600 font-medium leading-relaxed">
              <p>
                I design systems around the inevitability of structural stress, off-line environments, and the limits of physical hardware.
              </p>
              <p className="p-6 bg-[#FDF9F1] rounded-3xl border border-[#FFC83A]/30 text-[#1C1D20]">
                <strong className="text-[#FFC83A] font-black mr-2">"Utu Engineering"</strong> 
                is our operational blueprint: human-centric resilience. We develop with structural empathy—anticipating network loss and physical disruption rather than building for idealized runtime states.
              </p>
            </div>
            
            <div className="flex gap-16 pt-4 border-t border-neutral-100">
               <div>
                 <div className="text-5xl font-black text-[#1C1D20] mb-2">100<span className="text-[#FFC83A]">%</span></div>
                 <div className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Local First</div>
               </div>
               <div>
                 <div className="text-5xl font-black text-[#1C1D20] mb-2">3:2:1</div>
                 <div className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Backup Rule</div>
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
                <span className="text-[#1B4B43] font-black text-sm tracking-[0.2em] uppercase">Experience</span>
                <span className="w-8 h-[3px] bg-[#1B4B43]"></span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-[#1C1D20] tracking-tighter">My Work Timeline</h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-16 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent">

            {/* Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-[#1B4B43] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Founder &amp; CEO</h3>
                    <span className="font-bold text-sm bg-[#FFC83A]/20 text-[#D99A00] px-4 py-1.5 rounded-full uppercase tracking-wider">Present</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-[#1B4B43] mb-5 uppercase tracking-widest">
                   <Globe className="w-4 h-4"/> Ansai Technologies / Labels
                 </div>
                 <p className="text-base text-neutral-600 font-medium leading-relaxed">Building local-first data systems, AI infrastructure, and the EduManage core product. Focusing on immutable enforcement and off-grid durability.</p>
               </div>
            </div>

            {/* Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-[#FFC83A] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Cloud Eng Intern</h3>
                    <span className="font-bold text-sm bg-neutral-100 text-neutral-500 px-4 py-1.5 rounded-full uppercase tracking-wider">Past</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-neutral-500 mb-5 uppercase tracking-widest">
                   <Server className="w-4 h-4"/> Safaricom PLC
                 </div>
                 <p className="text-base text-neutral-600 font-medium leading-relaxed">Hands-on experience with Linux/Windows server environments and enterprise virtualization. Operational scar tissue turned into design principles.</p>
               </div>
            </div>

            {/* Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-[#FDF9F1] bg-teal-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
               <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-2xl text-[#1C1D20]">Community Leader</h3>
                    <span className="font-bold text-sm bg-neutral-100 text-neutral-500 px-4 py-1.5 rounded-full uppercase tracking-wider">Ongoing</span>
                 </div>
                 <div className="flex items-center gap-2 font-bold text-sm text-neutral-500 mb-5 uppercase tracking-widest">
                   <Users className="w-4 h-4"/> GitHub Campus Expert / GDG
                 </div>
                 <p className="text-base text-neutral-600 font-medium leading-relaxed">Leading Christian Union. Building platforms and organizations that let other people innovate and solve real problems over generations.</p>
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
                 <span className="text-[#FFC83A] font-black text-sm tracking-[0.2em] uppercase">Portfolio</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">My Latest Works</h2>
            </div>
            <button className="flex items-center gap-3 font-bold text-lg hover:text-[#FFC83A] transition-colors pb-2 border-b-2 border-transparent hover:border-[#FFC83A]">
              Explore All <ArrowRight className="w-6 h-6"/>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             {/* Card 1 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 shadow-2xl">
               <div className="bg-[#FFC83A] h-64 rounded-3xl mb-8 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <ShieldAlert className="w-24 h-24 text-yellow-800 opacity-40 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-yellow-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Research</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">Constitutional <br/> Governance</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 A governance engine inspired by an access-control boundary violation. Dictates strict runtime boundaries for self-generating systems.
               </p>
               <div className="flex gap-2 flex-wrap">
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">AST Validation</span>
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">Agent Safety</span>
               </div>
             </div>

             {/* Card 2 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 lg:translate-y-12 shadow-2xl">
               <div className="bg-[#1B4B43] h-64 rounded-3xl mb-8 p-6 flex items-center justify-center relative overflow-hidden">
                  <Layers className="w-24 h-24 text-teal-900 opacity-50 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Core Product</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">EduManage <br/> Platform</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 Organizational software enforcing a unified "School DNA" model. Local-first, sync-always architecture compliant with data laws.
               </p>
               <div className="flex gap-2 flex-wrap">
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">Fastify</span>
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">PostgreSQL</span>
               </div>
             </div>

             {/* Card 3 */}
             <div className="bg-[#2A2B2E] rounded-[2.5rem] p-8 group hover:-translate-y-4 transition-transform duration-500 shadow-2xl">
               <div className="bg-rose-500 h-64 rounded-3xl mb-8 p-6 flex items-center justify-center relative overflow-hidden">
                  <Server className="w-24 h-24 text-rose-900 opacity-50 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Hardware</div>
               </div>
               <h3 className="text-3xl font-black mb-4 leading-tight">Physical Edge <br/> Cloud</h3>
               <p className="text-base text-neutral-400 mb-8 font-medium leading-relaxed">
                 Extending software governance to physical server deployments in locations requiring complete off-grid reliability. 3-2-1 backup structures.
               </p>
               <div className="flex gap-2 flex-wrap">
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">ZFS</span>
                 <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">Mesh Net</span>
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
                    <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">ansai-agent -- interactive</span>
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
                      &gt; Processing command...
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
                    placeholder="Query the infrastructure..." 
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
             <h2 className="text-5xl md:text-7xl font-black text-[#1C1D20] leading-[1.05] tracking-tighter">Query the <br/> Agent.</h2>
             <p className="text-xl text-neutral-600 font-medium leading-relaxed">
               Want to know more about the architecture, my background, or the Utu Engineering philosophy? Interact with the live terminal.
             </p>
             <div className="flex flex-col gap-4 pt-6">
               <div className="font-bold text-xs text-neutral-400 uppercase tracking-widest">Quick Commands</div>
               <button onClick={() => setTerminalInput('Detail the 3-tier rule architecture.')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Detail the 3-tier architecture.
               </button>
               <button onClick={() => setTerminalInput('How does EduManage handle offline state?')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Explain EduManage offline state.
               </button>
               <button onClick={() => setTerminalInput('What is the Utu Engineering philosophy?')} className="text-left font-black text-lg text-[#1C1D20] hover:text-[#1B4B43] transition flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md">
                 <ArrowRight className="w-6 h-6 text-[#FFC83A]" /> Utu Engineering philosophy.
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
              <p className="text-2xl font-bold text-yellow-900">Start by saying <a href="mailto:operator@ansai.tech" className="underline decoration-4 underline-offset-4 hover:text-white transition-colors">hello</a>.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 font-black text-lg w-full lg:w-auto">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:-translate-y-2 transition-transform bg-white px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl flex-1 lg:flex-none">
                GitHub <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:-translate-y-2 transition-transform bg-[#1C1D20] text-white px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl flex-1 lg:flex-none">
                LinkedIn <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t-4 border-yellow-500/30 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-black text-yellow-900">
            <div className="flex flex-wrap justify-center gap-6 uppercase tracking-[0.2em]">
              <span>Local-First</span>
              <span>&bull;</span>
              <span>Sync-Always</span>
              <span>&bull;</span>
              <span>Loss-Never</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Ansai Technologies. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/App.tsx', appContent, 'utf8');
console.log('App.tsx updated successfully.');
