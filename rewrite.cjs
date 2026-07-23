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
  Lightbulb
} from 'lucide-react';

const ImagePlaceholder = ({ label, className }: { label: string, className?: string }) => (
  <div className={\`flex flex-col items-center justify-center bg-[#f0eee9] border-2 border-dashed border-[#e3dfd3] text-neutral-400 overflow-hidden \${className}\`}>
    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
    <span className="text-[10px] font-mono uppercase tracking-wider">{label}</span>
  </div>
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
    <div className="min-h-screen bg-[#fdfbf7] text-neutral-900 font-sans selection:bg-[#f6b133]/30 selection:text-neutral-900">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-neutral-200 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f6b133] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f6b133]"></span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-neutral-900">
              Ansai <span className="text-neutral-400 font-normal">/ Infrastructure</span>
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-8 font-medium text-sm overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-start sm:justify-end text-neutral-500">
            <a href="#thesis" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Thesis</a>
            <a href="#case-studies" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Projects</a>
            <a href="#leadership" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Leadership</a>
            <a href="#vision" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Vision</a>
            <a href="#terminal" className="hover:text-[#f6b133] transition-colors whitespace-nowrap">Terminal</a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 md:px-8 space-y-24">

        {/* 2. HERO SECTION */}
        <section id="thesis" className="pt-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#f6b133]/10 border border-[#f6b133]/30 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Globe className="w-3.5 h-3.5" />
                <span>Built in Nairobi. Built for the world.</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-neutral-900">
                Data is static. <br/>
                <span className="text-neutral-400">We build the infra that lets you query it.</span>
              </h1>
              
              <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                The next decade belongs to those who can query every corner of their intelligence instantly. I build reliable, local-first data systems rooted in systems engineering.
              </p>

              <div className="pt-2">
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-3">Systems Operator Profile</p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-neutral-700">
                  <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-sm">Founder &amp; CEO @ Ansai</span>
                  <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-sm">Cloud Eng Intern @ Safaricom</span>
                  <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-sm">GitHub Campus Expert</span>
                  <span className="bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-sm">BTech IT @ Tech Uni Kenya</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              {/* Colorful blob behind image */}
              <div className="absolute top-4 right-4 w-full h-full bg-[#f6b133] rounded-3xl transform rotate-3 scale-105 -z-10 shadow-xl"></div>
              <ImagePlaceholder label="Profile Headshot" className="w-full max-w-[400px] aspect-[4/5] rounded-3xl shadow-2xl bg-white border-none" />
            </div>
          </div>
        </section>

        {/* 3. SPLIT SCREEN / CORE INTERACTIVE AREA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-neutral-200">
          
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-teal-700 font-bold tracking-widest uppercase">
                <span className="w-8 h-[2px] bg-teal-600"></span> AI INFRA &amp; GOVERNANCE
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Specialized in the systems beneath the models.
              </h2>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                Rather than following the conventional machine learning track, the focus is locked on AI infrastructure, GPUs, and the agentic layer—the systems and governance that sit underneath and around models. 
              </p>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                This stems from an infrastructure administration background spanning Linux, Windows server environments, and virtualization. Reliability isn't theoretical; it's operational scar tissue.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-none bg-white shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f6b133]"></div>
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <HeartHandshake className="w-5 h-5 text-[#f6b133]" />
                <span>Utu Engineering Philosophy</span>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">
                "Utu Engineering" is an operational blueprint: human-centric resilience. We develop with structural empathy—anticipating network loss and physical disruption rather than building for idealized runtime states.
              </p>
            </div>
          </div>

          <div id="terminal" className="lg:col-span-7 flex flex-col">
            <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 flex flex-col h-[500px] shadow-2xl relative overflow-hidden">
              <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-[#f6b133]" />
                  <span className="font-mono text-xs text-neutral-400">ansai-agent-v1.0.0 -- interactive-shell</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f6b133]"></span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5 font-mono text-xs scrollbar-thin scrollbar-thumb-neutral-800">
                {chatHistory.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>[{item.timestamp}]</span>
                      <span className="uppercase tracking-wider text-[9px] font-bold">
                        {item.sender === 'system' ? 'System Engine' : item.sender === 'user' ? 'Operator' : 'Agent Response'}
                      </span>
                    </div>
                    
                    {item.sender === 'system' ? (
                      <div className="text-[#f6b133] whitespace-pre-line border-l-2 border-[#f6b133]/50 pl-3 py-1 bg-[#f6b133]/10">
                        {item.text}
                      </div>
                    ) : item.sender === 'user' ? (
                      <div className="text-neutral-100 flex items-start gap-2">
                        <span className="text-neutral-500 select-none">$</span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ) : (
                      <div className="text-neutral-300 whitespace-pre-line pl-3 border-l-2 border-neutral-700 text-sm leading-relaxed">
                        {item.text}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="text-neutral-500 animate-pulse text-[10px] pt-2">
                    &gt; Agent processing command...
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleTerminalSubmit} className="border-t border-neutral-800 bg-neutral-900 p-3 flex items-center gap-3">
                <span className="font-mono text-sm text-[#f6b133] pl-2 select-none">$</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Ask about governance, edumanage, or architectures..." 
                  className="flex-1 bg-transparent border-0 outline-none text-sm font-mono text-neutral-100 placeholder-neutral-600 focus:ring-0 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-[#f6b133] hover:bg-[#eab308] text-neutral-900 p-2 rounded-md transition-all flex items-center justify-center font-bold"
                  aria-label="Execute prompt"
                  disabled={isTyping}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2 items-center justify-start text-[11px] font-semibold text-neutral-500">
              <button 
                onClick={() => setTerminalInput('Detail the 3-tier rule architecture.')} 
                className="bg-white hover:bg-neutral-50 hover:text-neutral-900 px-3 py-1 rounded-full border border-neutral-200 transition shadow-sm"
              >
                Rule Tiers
              </button>
              <button 
                onClick={() => setTerminalInput('How does EduManage handle offline state and local-first data?')} 
                className="bg-white hover:bg-neutral-50 hover:text-neutral-900 px-3 py-1 rounded-full border border-neutral-200 transition shadow-sm"
              >
                EduManage Offline
              </button>
              <button 
                onClick={() => setTerminalInput('Explain the Utu Engineering philosophy.')} 
                className="bg-white hover:bg-neutral-50 hover:text-neutral-900 px-3 py-1 rounded-full border border-neutral-200 transition shadow-sm"
              >
                Utu Philosophy
              </button>
            </div>
          </div>
        </section>

        {/* 4. CASE STUDIES GRID (3 STRUCTURAL CARDS) */}
        <section id="case-studies" className="space-y-10 pt-16 border-t border-neutral-200">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-teal-700 font-bold tracking-widest uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span> ARCHIVES
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Production &amp; Papers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 border border-neutral-100">
              <div className="relative">
                <div className="absolute inset-0 bg-[#f6b133] opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
                <ImagePlaceholder label="Governance Architecture Diagram" className="h-48 w-full rounded-none border-none bg-neutral-100" />
              </div>
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-[#fcfbf7] p-2.5 rounded-full text-[#f6b133]">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest bg-neutral-100 px-2.5 py-1 rounded-full">
                      Technical Paper
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#f6b133] transition-colors leading-tight">
                      Constitutional Governance for Autonomous Agents
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Born from a primitive-purity boundary violation found in a production RBAC system. Dictates strict runtime boundaries for self-generating systems.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">TypeScript</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Agent Safety</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">AST Validation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 border border-neutral-100">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
                <ImagePlaceholder label="EduManage Platform UI" className="h-48 w-full rounded-none border-none bg-neutral-100" />
              </div>
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-[#fcfbf7] p-2.5 rounded-full text-teal-600">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest bg-neutral-100 px-2.5 py-1 rounded-full">
                      Core Product
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-teal-600 transition-colors leading-tight">
                      EduManage: Built to be Governed &amp; Scaled
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Organizational software enforcing a unified "School DNA" model across grading, reporting, and operational structures. Local-first, sync-always.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Fastify</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Prisma</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">React</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Cloudflare</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 border border-neutral-100">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
                <ImagePlaceholder label="Micro Data Center Setup" className="h-48 w-full rounded-none border-none bg-neutral-100" />
              </div>
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-[#fcfbf7] p-2.5 rounded-full text-rose-500">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest bg-neutral-100 px-2.5 py-1 rounded-full">
                      Now Building
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-rose-500 transition-colors leading-tight">
                      Physical Edge Cloud &amp; Micro Data Centers
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Extending software governance frameworks directly to physical server deployments in locations requiring complete off-grid reliability.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">ZFS</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Linux</span>
                    <span className="text-[10px] bg-[#fdfbf7] text-neutral-700 px-2.5 py-1 rounded border border-neutral-200 font-semibold">Edge Hardware</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. ARCHITECTURE PARADIGM - Styled like "What do I help?" */}
        <section className="space-y-12 pt-16 border-t border-neutral-200">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-[#f6b133] font-bold tracking-widest uppercase">
              <span className="w-8 h-[2px] bg-[#f6b133]"></span> BLUEPRINT
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">What drives the infrastructure?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Designing systems around the inevitability of structural stress, off-line environments, and physical limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 space-y-6 hover:shadow-md transition">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-neutral-900">Local-First</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Data pathways operate autonomously on edge nodes. Synchronization scripts execute immediately when a path is re-established.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 space-y-6 hover:shadow-md transition">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-neutral-900">Immutable</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Validation patterns operate symmetrically across boundary endpoints, databases, and structural schemas to block bypasses.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 space-y-6 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-neutral-900">Edge Autonomy</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Utilizing redundant mesh structures and micro-node architecture. Physical hardware operates securely in isolation.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 space-y-6 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-neutral-900">Conformity</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Compliance isn't retrofitted. Data models are designed explicitly around regional privacy structures directly in codebase schemas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. LEADERSHIP & FOUNDATION */}
        <section id="leadership" className="space-y-8 pt-16 border-t border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 flex justify-center relative">
               <div className="absolute -bottom-4 -left-4 w-full h-full bg-teal-600 rounded-3xl -z-10"></div>
               <ImagePlaceholder label="Speaking Engagement" className="w-full aspect-square md:aspect-[4/3] rounded-3xl bg-white border-none shadow-xl" />
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-teal-700 font-bold tracking-widest uppercase">
                  <span className="w-8 h-[2px] bg-teal-600"></span> PERSONAL FOUNDATION
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">Faith, Ethics, and Leadership</h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  My work is grounded in my faith and leadership within the Christian Union. I hold a firm conviction that integrity, stewardship, and service must remain central to technological innovation. Engineering is a service to people, not capability for its own sake.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-900 font-bold">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <span>Communication</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Communication is what allows technical ideas to reach people and create real impact. It's an active interest in storytelling and strategy.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-900 font-bold">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-[#f6b133]" />
                    </div>
                    <span>Entrepreneurial</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Regular practice in researching market opportunities and designing business models directly influences how technical decisions are evaluated.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. VISION: UBUNIFU VILLAGE */}
        <section id="vision" className="space-y-8 pt-16 border-t border-neutral-200 pb-12">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-neutral-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f6b133]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs text-[#f6b133] font-bold tracking-widest uppercase">
                  <span className="w-8 h-[2px] bg-[#f6b133]"></span> THE LONG ARC
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Ubunifu Village Vision</h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  The throughline across all my work is building platforms that let other people innovate and solve real problems over generations. Ubunifu Village is a multidisciplinary innovation ecosystem concept.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4 font-bold text-xs text-neutral-700">
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu Studios</span>
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu Clouds</span>
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu AI</span>
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu Chain</span>
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu Energy</span>
                  <span className="bg-[#fdfbf7] px-4 py-2 rounded-full border border-neutral-200 shadow-sm">Ubunifu Research</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                 <ImagePlaceholder label="Ecosystem Concept" className="w-full aspect-[4/3] rounded-3xl bg-[#fcfbf7] border-none shadow-lg" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#f6b133] text-neutral-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight">Let's build something <br/>resilient together.</h2>
              <p className="font-medium text-yellow-900">Start by saying <a href="mailto:operator@ansai.tech" className="underline hover:text-white transition">hello</a>.</p>
            </div>
            
            <div className="flex flex-col gap-3 font-bold text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:translate-x-2 transition-transform bg-white/20 px-6 py-3 rounded-full">
                GitHub <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:translate-x-2 transition-transform bg-white/20 px-6 py-3 rounded-full">
                LinkedIn <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-yellow-600/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-yellow-900">
            <div className="flex flex-wrap justify-center gap-4 uppercase tracking-widest">
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
