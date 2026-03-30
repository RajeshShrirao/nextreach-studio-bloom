"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  googleRating?: number;
  googleReviewCount?: number;
  bookingSystem?: string;
  painPoint?: string;
  status: string;
  planInterest?: string;
  demoSlug?: string;
  trackedLink?: string;
  emailSentAt?: string;
  lastReplyAt?: string;
  demoClickedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadStats {
  total: number;
  new: number;
  inPipeline: number;
  won: number;
  lost: number;
  byStatus: Record<string, number>;
}

const STATUSES = [
  "new",
  "researched",
  "demo_built",
  "email_sent",
  "replied",
  "call_booked",
  "won",
  "lost",
] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-zinc-600/40 text-zinc-300 border-zinc-500/30",
  researched: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  demo_built: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  email_sent: "bg-sky-500/20 text-sky-300 border-sky-400/30",
  replied: "bg-green-500/20 text-green-300 border-green-400/30",
  call_booked: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  won: "bg-emerald-500/30 text-emerald-200 border-emerald-400/40",
  lost: "bg-red-500/15 text-red-300 border-red-400/30",
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "nextreach2026") {
      document.cookie = `admin_token=${password}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
      onLogin(password);
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
      <div className="glass-panel rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo.png" alt="NextReach" width={32} height={32} />
          <span className="text-white font-semibold text-sm uppercase tracking-widest">
            NextReach <span className="text-amber-400">Admin</span>
          </span>
        </div>
        <p className="text-zinc-500 text-sm mb-6 text-center">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition mb-3"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400/90 text-black font-medium hover:bg-amber-400 transition btn-primary-glow"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status] || "bg-zinc-600/40 text-zinc-300 border-zinc-500/30"}`}
    >
      {status}
    </span>
  );
}

function AddLeadModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    website: "",
    instagram: "",
    bookingSystem: "",
    painPoint: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    onAdded();
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-panel rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Add New Lead</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition text-xl">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Business Name *</label>
              <input name="businessName" value={form.businessName} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Owner Name *</label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} required className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">City</label>
              <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">State</label>
              <input name="state" value={form.state} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Website</label>
              <input name="website" value={form.website} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Instagram</label>
              <input name="instagram" value={form.instagram} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Booking System</label>
              <input name="bookingSystem" value={form.bookingSystem} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Pain Point</label>
              <input name="painPoint" value={form.painPoint} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-amber-400/90 text-black font-medium hover:bg-amber-400 transition btn-primary-glow text-sm disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LeadRow({
  lead,
  onStatusChange,
  onDelete,
}: {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition"
      >
        <td className="px-4 py-3 text-sm text-white font-medium">{lead.businessName}</td>
        <td className="px-4 py-3 text-sm text-zinc-400 hidden md:table-cell">{lead.ownerName}</td>
        <td className="px-4 py-3 text-sm text-zinc-400 hidden lg:table-cell">{lead.email}</td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(lead.id, e.target.value)}
            className="text-xs rounded-lg px-2 py-1 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/40 cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-sm hidden md:table-cell">
          {lead.demoSlug ? (
            <a
              href={`/demo/${lead.demoSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-amber-400 hover:text-amber-300 transition underline underline-offset-2"
            >
              Demo
            </a>
          ) : (
            <span className="text-zinc-600">—</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-zinc-500 hidden lg:table-cell">
          {formatDate(lead.emailSentAt)}
        </td>
        <td className="px-4 py-3 text-sm text-zinc-500 hidden xl:table-cell">
          {formatDate(lead.lastReplyAt)}
        </td>
        <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onDelete(lead.id)}
            className="text-zinc-600 hover:text-red-400 transition text-xs"
          >
            Delete
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-white/5">
          <td colSpan={8} className="px-6 py-4 bg-white/[0.015]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-zinc-600 text-xs">Email</span>
                <p className="text-zinc-300">{lead.email}</p>
              </div>
              {lead.phone && (
                <div>
                  <span className="text-zinc-600 text-xs">Phone</span>
                  <p className="text-zinc-300">{lead.phone}</p>
                </div>
              )}
              {(lead.city || lead.state) && (
                <div>
                  <span className="text-zinc-600 text-xs">Location</span>
                  <p className="text-zinc-300">{[lead.city, lead.state].filter(Boolean).join(", ")}</p>
                </div>
              )}
              {lead.website && (
                <div>
                  <span className="text-zinc-600 text-xs">Website</span>
                  <p>
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition">
                      {lead.website}
                    </a>
                  </p>
                </div>
              )}
              {lead.instagram && (
                <div>
                  <span className="text-zinc-600 text-xs">Instagram</span>
                  <p className="text-zinc-300">{lead.instagram}</p>
                </div>
              )}
              {lead.bookingSystem && (
                <div>
                  <span className="text-zinc-600 text-xs">Booking System</span>
                  <p className="text-zinc-300">{lead.bookingSystem}</p>
                </div>
              )}
              {(lead.googleRating !== undefined || lead.googleReviewCount !== undefined) && (
                <div>
                  <span className="text-zinc-600 text-xs">Google Reviews</span>
                  <p className="text-zinc-300">
                    {lead.googleRating !== undefined ? `⭐ ${lead.googleRating}` : ""}
                    {lead.googleReviewCount !== undefined ? ` (${lead.googleReviewCount} reviews)` : ""}
                  </p>
                </div>
              )}
              {lead.planInterest && (
                <div>
                  <span className="text-zinc-600 text-xs">Plan Interest</span>
                  <p className="text-zinc-300 capitalize">{lead.planInterest}</p>
                </div>
              )}
              {lead.trackedLink && (
                <div>
                  <span className="text-zinc-600 text-xs">Tracking Link</span>
                  <p>
                    <a href={lead.trackedLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition">
                      {lead.trackedLink}
                    </a>
                  </p>
                </div>
              )}
              {lead.painPoint && (
                <div>
                  <span className="text-zinc-600 text-xs">Pain Point</span>
                  <p className="text-zinc-300">{lead.painPoint}</p>
                </div>
              )}
              <div>
                <span className="text-zinc-600 text-xs">Created</span>
                <p className="text-zinc-300">{formatDateTime(lead.createdAt)}</p>
              </div>
              <div>
                <span className="text-zinc-600 text-xs">Last Updated</span>
                <p className="text-zinc-300">{formatDateTime(lead.updatedAt)}</p>
              </div>
              {lead.notes && (
                <div className="md:col-span-2 lg:col-span-3">
                  <span className="text-zinc-600 text-xs">Notes</span>
                  <p className="text-zinc-300 mt-1">{lead.notes}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const token = cookies.find((c) => c.startsWith("admin_token="));
    if (token?.split("=")[1] === "nextreach2026") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const url = filter ? `/api/leads?status=${filter}` : "/api/leads";
    const [leadsRes, statsRes] = await Promise.all([fetch(url), fetch("/api/leads/stats")]);
    const leadsData = await leadsRes.json();
    const statsData = await statsRes.json();
    setLeads(leadsData);
    setStats(statsData);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated, fetchLeads]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    fetchLeads();
  };

  if (checking) return null;

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="NextReach" width={28} height={28} />
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight">
                NextReach <span className="text-amber-400">Admin</span>
              </h1>
              <p className="text-xs text-zinc-600 mt-0.5">Lead Tracking Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400/90 text-black text-sm font-medium hover:bg-amber-400 transition btn-primary-glow"
            >
              + Add Lead
            </button>
            <button
              onClick={() => {
                document.cookie = "admin_token=; path=/; max-age=0";
                setAuthenticated(false);
              }}
              className="text-zinc-600 hover:text-zinc-400 transition text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { label: "Total Leads", value: stats.total, color: "text-white" },
              { label: "New", value: stats.new, color: "text-zinc-400" },
              { label: "In Pipeline", value: stats.inPipeline, color: "text-amber-400" },
              { label: "Won", value: stats.won, color: "text-emerald-400" },
              { label: "Lost", value: stats.lost, color: "text-red-400" },
            ].map((card) => (
              <div key={card.label} className="glass-panel rounded-xl p-4">
                <p className={`text-2xl font-semibold ${card.color}`}>{card.value}</p>
                <p className="text-xs text-zinc-600 mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        )}

        {stats && (
          <div className="glass-panel rounded-xl p-5 mb-8">
            <h2 className="text-sm font-medium text-zinc-400 mb-4">Conversion Funnel</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { key: "new", label: "New" },
                { key: "researched", label: "Researched" },
                { key: "demo_built", label: "Demo Built" },
                { key: "email_sent", label: "Email Sent" },
                { key: "replied", label: "Replied" },
                { key: "call_booked", label: "Call Booked" },
                { key: "won", label: "Won" },
              ].map((step, i) => {
                const count = stats.byStatus[step.key] || 0;
                return (
                  <div key={step.key} className="flex items-center gap-2">
                    <div className="glass-panel rounded-lg px-3 py-2 text-center min-w-[80px]">
                      <p className={`font-semibold ${count > 0 ? "text-amber-400" : "text-zinc-600"}`}>
                        {count}
                      </p>
                      <p className="text-zinc-600 mt-0.5">{step.label}</p>
                    </div>
                    {i < 6 && <span className="text-zinc-700">→</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/40 cursor-pointer"
          >
            <option value="" className="bg-zinc-900">All Leads</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s}
              </option>
            ))}
          </select>
          <span className="text-xs text-zinc-600">
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Demo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:table-cell">
                    Email Sent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden xl:table-cell">
                    Last Reply
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-zinc-600 text-sm">
                      Loading...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-zinc-600 text-sm">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && <AddLeadModal onClose={() => setShowModal(false)} onAdded={fetchLeads} />}
    </div>
  );
}
