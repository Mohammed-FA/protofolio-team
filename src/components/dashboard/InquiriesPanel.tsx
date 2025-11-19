"use client";
import { useState } from "react";
import {
  PlusIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { mockInquiries } from "@/data/dashboard";
import DashContainer from "./DashContainer";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
const StatusPill = ({ status }: { status: "Open" | "Closed" }) => {
  const isOpen = status === "Open";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold ${isOpen
        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
        }`}
    >
      {isOpen ? <ClockIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
      {status}
    </span>
  );
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const InquiriesPanel = () => {
  const [inquiries, setInquiries] = useState(
    mockInquiries as Array<{
      id: string;
      subject: string;
      createdAt: string;
      status: "Open" | "Closed";
      messages: number;
      name?: string;
      email?: string;
      message?: string;
    }>
  );

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;

    const newItem = {
      id: String(Date.now()),
      subject: name ? `Inquiry from ${name}` : "New inquiry",
      createdAt: formatDate(new Date()),
      status: "Open" as const,
      messages: 1,
      name,
      email,
      message,
    };
    setInquiries((list) => [newItem, ...list]);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Inquiries</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create support requests and track responses in one place.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400" type="button">
          <PlusIcon className="h-5 w-5" />
          New inquiry
        </button>
      </div>

      <form
        onSubmit={onSubmit}
      >
        <DashContainer
          className="space-y-4  p-6">

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Name</label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Message</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              placeholder="Describe your request..."
              className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="brand"
              size="sm"
            >
              Submit inquiry
            </Button>
          </div>
        </DashContainer>
      </form>

      <DashContainer className="space-y-3  p-6">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white/60 p-4 transition hover:border-brand-300/60 dark:border-slate-800/80 dark:bg-slate-900/50"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {inq.subject}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Opened {inq.createdAt} • {inq.messages} messages
                </p>
                {inq.name && inq.email && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    From {inq.name} ({inq.email})
                  </p>
                )}
              </div>
            </div>
            <StatusPill status={inq.status} />
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">No inquiries yet.</p>
        )}
      </DashContainer>
    </div>
  );
};

export default InquiriesPanel;