'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Code2,
  FileCheck2,
  FileText,
  Fingerprint,
  GitBranch,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Network,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  UserRound,
  X,
} from 'lucide-react'

const audits = [
  { name: 'Lumen Finance', type: 'DeFi Protocol', chain: 'Ethereum', status: 'Verified', score: 96, findings: 2, updated: '2h ago', color: 'bg-cyan-400' },
  { name: 'Asteria Vaults', type: 'Yield Aggregator', chain: 'Arbitrum', status: 'In review', score: 81, findings: 7, updated: '5h ago', color: 'bg-violet-400' },
  { name: 'Nexus Perps', type: 'Perpetuals', chain: 'Base', status: 'Verified', score: 92, findings: 4, updated: '1d ago', color: 'bg-emerald-400' },
  { name: 'Orbit Bridge', type: 'Infrastructure', chain: 'Polygon', status: 'Needs attention', score: 64, findings: 13, updated: '2d ago', color: 'bg-amber-400' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Audits', icon: FileCheck2, count: '12' },
  { label: 'Code analysis', icon: Code2 },
  { label: 'Threat intelligence', icon: Network },
  { label: 'Reports', icon: FileText },
]

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 31
  const dash = circumference * (score / 100)
  return (
    <div className="relative flex size-20 items-center justify-center">
      <svg className="absolute inset-0 size-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="31" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/8" />
        <circle cx="40" cy="40" r="31" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-cyan-300" strokeDasharray={`${dash} ${circumference}`} />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">{score}</span>
    </div>
  )
}

export default function AuditDashboard() {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => audits.filter((audit) => audit.name.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-200">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/8 bg-[#0b0f18] transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/8 px-6">
          <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-300 text-[#071017] shadow-[0_0_24px_rgba(103,232,249,.25)]"><ShieldCheck className="size-5" /></div>
          <div><p className="text-sm font-semibold tracking-wide text-white">SENTINEL<span className="text-cyan-300">.</span></p><p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Security intelligence</p></div>
          <button className="ml-auto lg:hidden" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X className="size-5" /></button>
        </div>
        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
          <nav className="flex flex-col gap-1" aria-label="Primary navigation">
            {navItems.map(({ label, icon: Icon, count }) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active === label ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon className="size-4" />{label}{count && <span className="ml-auto rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-slate-400">{count}</span>}</button>)}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/8 px-4 py-5">
          <nav className="flex flex-col gap-1"><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><BookOpen className="size-4" />Documentation</button><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><Settings className="size-4" />Settings</button></nav>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.03] p-3"><div className="flex size-8 items-center justify-center rounded-full bg-violet-400/15 text-violet-200"><UserRound className="size-4" /></div><div className="min-w-0"><p className="truncate text-xs font-medium text-white">Alex Morgan</p><p className="truncate text-[11px] text-slate-500">Security team</p></div><ChevronDown className="ml-auto size-3.5 text-slate-500" /></div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-20 items-center justify-between border-b border-white/8 px-5 sm:px-8">
          <div className="flex items-center gap-3"><button className="lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu className="size-5" /></button><div><p className="text-xs text-slate-500">Workspace / <span className="text-slate-300">Overview</span></p><h1 className="mt-1 text-lg font-semibold tracking-tight text-white">Security overview</h1></div></div>
          <div className="flex items-center gap-3"><button className="hidden rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5 sm:block" aria-label="Help"><CircleHelp className="size-4" /></button><button className="relative rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-cyan-300" /></button><button className="hidden items-center gap-2 rounded-lg bg-cyan-300 px-3 py-2 text-xs font-semibold text-[#071017] shadow-[0_0_18px_rgba(103,232,249,.14)] hover:bg-cyan-200 sm:flex"><Plus className="size-4" />New audit</button></div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
          <section className="relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-[#102c3a] via-[#0e1c2a] to-[#101326] p-6 sm:p-8"><div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-cyan-300/10 blur-3xl" /><div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div className="max-w-xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-[11px] font-medium text-cyan-200"><Sparkles className="size-3.5" /> Sentinel intelligence engine <span className="size-1 rounded-full bg-cyan-300" /> Live</div><h2 className="max-w-lg text-2xl font-semibold tracking-tight text-white sm:text-3xl">Security that moves at the speed of Web3.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">Detect vulnerabilities before they become exploits with continuous monitoring, automated analysis, and intelligence trusted by leading protocols.</p><button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-cyan-50">Start an audit <ArrowUpRight className="size-4" /></button></div><div className="flex items-center gap-5 rounded-xl border border-white/10 bg-black/15 p-4 sm:w-fit"><ScoreRing score={94} /><div><p className="text-xs text-slate-400">Portfolio health</p><p className="mt-1 text-lg font-semibold text-white">Excellent</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-300"><ArrowUpRight className="size-3" /> 4.8% this month</p></div></div></div></section>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Total audits" value="128" change="+12.4%" icon={FileCheck2} /><Metric label="Critical findings" value="03" change="-28.6%" positive icon={AlertTriangle} /><Metric label="Contracts monitored" value="2,840" change="+18.2%" icon={Network} /><Metric label="Assets protected" value="$1.24B" change="+9.7%" icon={LockKeyhole} /></section>

          <div className="mt-7 grid gap-7 xl:grid-cols-[1.35fr_.65fr]">
            <section className="rounded-2xl border border-white/8 bg-[#0c111b] p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-white">Risk activity</p><p className="mt-1 text-xs text-slate-500">Findings discovered across your portfolio</p></div><div className="flex items-center gap-3 text-[11px] text-slate-500"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-cyan-300" />Resolved</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-violet-400" />Open</span><button className="ml-2 rounded-lg border border-white/10 p-2 text-slate-400"><SlidersHorizontal className="size-3.5" /></button></div></div><div className="mt-6 flex h-48 items-end gap-2 sm:gap-4">{[44,58,40,72,55,67,49,80,61,52,76,88,64,70,57,84,71,92,73,86,62,78].map((height, i) => <div key={i} className="group flex h-full flex-1 flex-col justify-end gap-1"><div className="relative flex flex-col justify-end gap-1"><div className="w-full rounded-t bg-violet-400/70 transition group-hover:bg-violet-300" style={{ height: `${height * .7}px` }} /><div className="w-full rounded-t bg-cyan-300/80 transition group-hover:bg-cyan-200" style={{ height: `${(100 - height) * .35}px` }} /></div></div>)}</div><div className="mt-3 flex justify-between text-[10px] text-slate-600"><span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 28</span></div></section>
            <section className="rounded-2xl border border-white/8 bg-[#0c111b] p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-white">Severity distribution</p><p className="mt-1 text-xs text-slate-500">Across active audits</p></div><MoreHorizontal className="size-4 text-slate-500" /></div><div className="mt-6 flex items-center justify-center"><div className="relative flex size-40 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#fb7185 0 10%, #fb923c 10% 30%, #facc15 30% 52%, #67e8f9 52% 100%)' }}><div className="flex size-28 flex-col items-center justify-center rounded-full bg-[#0c111b]"><span className="text-2xl font-semibold text-white">42</span><span className="text-[10px] text-slate-500">open findings</span></div></div></div><div className="mt-5 grid grid-cols-2 gap-3 text-xs"><Severity color="bg-rose-400" label="Critical" value="3" /><Severity color="bg-orange-400" label="High" value="8" /><Severity color="bg-yellow-300" label="Medium" value="14" /><Severity color="bg-cyan-300" label="Low" value="17" /></div></section>
          </div>

          <section className="mt-7 rounded-2xl border border-white/8 bg-[#0c111b] p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-white">Recent audits</p><p className="mt-1 text-xs text-slate-500">Monitor the health of your smart contracts</p></div><div className="flex gap-2"><div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.02] px-3 py-2"><Search className="size-3.5 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search audits" className="w-28 bg-transparent text-xs text-white outline-none placeholder:text-slate-600 sm:w-36" /></div><button className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 hover:bg-white/5">View all</button></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-xs"><thead className="border-b border-white/8 text-[10px] uppercase tracking-wider text-slate-600"><tr><th className="pb-3 font-medium">Project</th><th className="pb-3 font-medium">Network</th><th className="pb-3 font-medium">Health score</th><th className="pb-3 font-medium">Findings</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Updated</th><th /></tr></thead><tbody>{filtered.map((audit) => <tr key={audit.name} className="border-b border-white/6 last:border-0"><td className="py-4"><div className="flex items-center gap-3"><div className={`flex size-8 items-center justify-center rounded-lg ${audit.color}/15`}><TerminalSquare className="size-4 text-slate-300" /></div><div><p className="font-medium text-white">{audit.name}</p><p className="mt-0.5 text-[11px] text-slate-600">{audit.type}</p></div></div></td><td className="py-4 text-slate-400">{audit.chain}</td><td className="py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-white/8"><div className={`h-full rounded-full ${audit.score > 90 ? 'bg-cyan-300' : audit.score > 75 ? 'bg-amber-300' : 'bg-rose-400'}`} style={{ width: `${audit.score}%` }} /></div><span className="text-slate-300">{audit.score}</span></div></td><td className="py-4 text-slate-300">{audit.findings} <span className="text-slate-600">open</span></td><td className="py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${audit.status === 'Verified' ? 'bg-emerald-300/10 text-emerald-300' : audit.status === 'In review' ? 'bg-violet-300/10 text-violet-300' : 'bg-amber-300/10 text-amber-300'}`}><span className="size-1.5 rounded-full bg-current" />{audit.status}</span></td><td className="py-4 text-slate-500">{audit.updated}</td><td className="py-4 text-right"><button aria-label={`Open ${audit.name}`} className="rounded p-1 text-slate-600 hover:bg-white/5 hover:text-white"><ArrowUpRight className="size-4" /></button></td></tr>)}</tbody></table></div></section>
        </main>
      </div>
    </div>
  )
}

function Metric({ label, value, change, icon: Icon, positive = false }: { label: string; value: string; change: string; icon: typeof FileCheck2; positive?: boolean }) { return <div className="rounded-2xl border border-white/8 bg-[#0c111b] p-5"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><Icon className="size-4 text-slate-600" /></div><div className="mt-3 flex items-end justify-between"><span className="text-2xl font-semibold tracking-tight text-white">{value}</span><span className={`flex items-center gap-0.5 text-[11px] ${positive ? 'text-emerald-300' : 'text-cyan-300'}`}><ArrowUpRight className="size-3" />{change}</span></div></div> }
function Severity({ color, label, value }: { color: string; label: string; value: string }) { return <div className="flex items-center gap-2"><span className={`size-2 rounded-full ${color}`} /><span className="text-slate-500">{label}</span><span className="ml-auto font-medium text-slate-300">{value}</span></div> }
