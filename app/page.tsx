"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  Plus,
  Search,
  Bell,
  ChevronRight,
  Filter,
  BarChart3,
  Settings,
  FolderKanban,
  Menu,
  CheckCircle,
  Building,
  MessageSquare,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function ClientProjectManagerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  // Role switcher state: "manager" or "client"
  const [portalRole, setPortalRole] = useState<"manager" | "client">("manager");

  // Sample data
  const metrics = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this month",
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Client Accounts",
      value: "8",
      change: "Active Portfolios",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending Deliverables",
      value: "27",
      change: "5 Due this week",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Total Allocated Budget",
      value: "R 485,000",
      change: "82% Utilized",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const clientMetrics = [
    {
      title: "My Active Projects",
      value: "2",
      change: "On schedule",
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Approvals",
      value: "3",
      change: "Requires sign-off",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Completed Milestones",
      value: "7",
      change: "100% Verified",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Account Balance",
      value: "R 0.00",
      change: "All invoices settled",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const projects = [
    {
      id: "PRJ-001",
      name: "Enterprise ERP Cloud Migration",
      client: "Apex Global Solutions",
      manager: "Musa Masanabo",
      status: "In Progress",
      progress: 75,
      dueDate: "15 Nov 2026",
      budget: "R 150,000",
      health: "Healthy",
    },
    {
      id: "PRJ-002",
      name: "E-Commerce Mobile App Redesign",
      client: "Urban Retail Group",
      manager: "Sarah Jenkins",
      status: "In Progress",
      progress: 40,
      dueDate: "02 Dec 2026",
      budget: "R 85,000",
      health: "At Risk",
    },
    {
      id: "PRJ-003",
      name: "AI Customer Support Integration",
      client: "FinTech Connect",
      manager: "Musa Masanabo",
      status: "Planning",
      progress: 15,
      dueDate: "20 Jan 2027",
      budget: "R 120,000",
      health: "Healthy",
    },
    {
      id: "PRJ-004",
      name: "Security Audit & Compliance",
      client: "DataSanctity Corp",
      manager: "David Ross",
      status: "Completed",
      progress: 100,
      dueDate: "10 Oct 2026",
      budget: "R 60,000",
      health: "Completed",
    },
  ];

  const clientsList = [
    { name: "Apex Global Solutions", contact: "Mark Muwanguzi", projects: 3, status: "Active", revenue: "R 210,000" },
    { name: "Urban Retail Group", contact: "Claire Dane", projects: 2, status: "Active", revenue: "R 95,000" },
    { name: "FinTech Connect", contact: "Thabo Madibane", projects: 2, status: "In Review", revenue: "R 120,000" },
    { name: "DataSanctity Corp", contact: "Xolisa Liwani", projects: 1, status: "Completed", revenue: "R 60,000" },
  ];

  const navItems =
    portalRole === "manager"
      ? [
          { label: "Dashboard", icon: FolderKanban },
          { label: "Projects", icon: Briefcase },
          { label: "Clients", icon: Users },
          { label: "Tasks & Milestones", icon: CheckCircle2 },
          { label: "Budgets & Invoices", icon: DollarSign },
          { label: "Reports & Analytics", icon: BarChart3 },
          { label: "Settings", icon: Settings },
        ]
      : [
          { label: "Dashboard", icon: FolderKanban },
          { label: "My Projects", icon: Briefcase },
          { label: "Deliverables & Approvals", icon: CheckCircle2 },
          { label: "Invoices & Billing", icon: DollarSign },
          { label: "Support & Feedback", icon: MessageSquare },
          { label: "Settings", icon: Settings },
        ];

  const renderContent = () => {
    // CLIENT FACING VIEW
    if (portalRole === "client") {
      switch (activeTab) {
        case "Dashboard":
          return (
            <div className="space-y-6">
              {/* Client Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded">
                    Apex Global Solutions Portal
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">Welcome back, Apex Team</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Your portal is monitored by project manager Musa Masanabo. All milestones are on schedule for the upcoming Q4 deployment cycle.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("Deliverables & Approvals")}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  Review Pending Items (3)
                </button>
              </div>

              {/* Client Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clientMetrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">{m.title}</p>
                        <p className="text-2xl font-bold text-white">{m.value}</p>
                        <p className="text-xs text-slate-400">{m.change}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${m.bgColor} ${m.color}`}>
                        <Icon size={22} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activity & Updates */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Recent Project Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                      <Activity size={16} className="text-blue-400 mt-0.5 shrink-0" />
                      <div className="text-xs">
                        <p className="font-medium text-white">Database architecture schema updated</p>
                        <p className="text-slate-400 mt-0.5">Uploaded by Musa Masanabo • Yesterday at 14:30</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                      <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <div className="text-xs">
                        <p className="font-medium text-white">API Security compliance audit passed</p>
                        <p className="text-slate-400 mt-0.5">Verified by automated test suite • 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Assigned Manager</h4>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
                      MM
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Musa Masanabo</p>
                      <p className="text-[10px] text-slate-400">Senior Technical PM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("Support & Feedback")}
                    className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-lg font-medium transition-colors"
                  >
                    Send Direct Message
                  </button>
                </div>
              </div>
            </div>
          );

        case "My Projects":
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Your Organization Portfolios</h3>
                <p className="text-xs text-slate-400 mt-0.5">Detailed tracking of all active deliverables under your contract.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.slice(0, 2).map((p) => (
                  <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">
                          {p.id}
                        </span>
                        <h4 className="font-semibold text-white mt-1 text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-400">Assigned Manager: {p.manager}</p>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        {p.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Milestone Progress</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                      <span className="text-slate-400">Target Due: {p.dueDate}</span>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        View Deliverables
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case "Deliverables & Approvals":
          return (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">Review pending project milestones and provide sign-offs.</p>
              {["ERP Database Schema Design Phase", "API Gateway Integration Testing", "User Acceptance Testing (UAT) Sign-off"].map(
                (item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white">{item}</p>
                      <p className="text-[10px] text-slate-400">Submitted by Musa Masanabo • Awaiting Client Review</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-lg">
                        Approve
                      </button>
                      <button className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg hover:bg-slate-700">
                        Request Changes
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          );

        case "Invoices & Billing":
          return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h4 className="text-sm font-semibold text-white">Billing & Invoices History</h4>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs">
                <div>
                  <p className="font-medium text-white">Invoice #INV-2026-088</p>
                  <p className="text-slate-400">Issued Oct 1, 2026 • Due Nov 1, 2026</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">R 75,000</p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Paid</span>
                </div>
              </div>
            </div>
          );

        case "Support & Feedback":
          return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 max-w-xl">
              <h4 className="text-sm font-semibold text-white">Contact Your Project Manager</h4>
              <textarea
                placeholder="Type your message or feedback for Musa Masanabo..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              ></textarea>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-medium">
                Send Message
              </button>
            </div>
          );

        case "Settings":
          return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 max-w-md">
              <h4 className="text-sm font-semibold text-white">Client Portal Settings</h4>
              <label className="text-xs text-slate-400 block">Company Name</label>
              <input type="text" defaultValue="Apex Global Solutions" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white" />
            </div>
          );

        default:
          return <div className="text-slate-400 text-xs">Select an option from the sidebar.</div>;
      }
    }

    // MANAGER VIEW (DEFAULT)
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">{m.title}</p>
                      <p className="text-2xl font-bold text-white">{m.value}</p>
                      <p className="text-xs text-slate-400">{m.change}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${m.bgColor} ${m.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-white text-sm">Client Projects Overview</h3>
                  <p className="text-xs text-slate-400">Real-time status and delivery progression</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Filter size={14} /> Filter
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Project & Client</th>
                      <th className="p-3.5">Manager</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Progress</th>
                      <th className="p-3.5">Budget</th>
                      <th className="p-3.5">Due Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {projects.map((p) => {
                      const statusClass =
                        p.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : p.status === "In Progress"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-slate-800 text-slate-300";

                      return (
                        <tr key={p.id} className="hover:bg-slate-800/30">
                          <td className="p-3.5">
                            <p className="font-medium text-white">{p.name}</p>
                            <p className="text-slate-400">{p.client}</p>
                          </td>
                          <td className="p-3.5 text-slate-300">{p.manager}</td>
                          <td className="p-3.5">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-medium ${statusClass}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3.5 w-36">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>{p.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-200 font-medium">{p.budget}</td>
                          <td className="p-3.5 text-slate-400">{p.dueDate}</td>
                          <td className="p-3.5 text-right">
                            <button className="text-slate-400 hover:text-white p-1">
                              <ChevronRight size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Projects":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">Manage all active client deliverables and timelines.</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-2">
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">{p.id}</span>
                      <h4 className="font-semibold text-white mt-1 text-sm">{p.name}</h4>
                      <p className="text-xs text-slate-400">{p.client}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full">{p.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                    <span>Budget: <strong className="text-white">{p.budget}</strong></span>
                    <span>Due: <strong className="text-white">{p.dueDate}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Clients":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">Directory of all enterprise client accounts and portfolios.</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-2">
                <Plus size={14} /> Add Client
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Client Company</th>
                    <th className="p-3.5">Primary Contact</th>
                    <th className="p-3.5">Active Projects</th>
                    <th className="p-3.5">Portfolio Revenue</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {clientsList.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-medium text-white flex items-center gap-2">
                        <Building size={16} className="text-blue-400" /> {c.name}
                      </td>
                      <td className="p-3.5 text-slate-300">{c.contact}</td>
                      <td className="p-3.5 text-slate-300">{c.projects} Projects</td>
                      <td className="p-3.5 text-white font-semibold">{c.revenue}</td>
                      <td className="p-3.5">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Tasks & Milestones":
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Track granular task boards and upcoming milestone deadlines.</p>
            {["Finalize Database Architecture Schema", "Client UAT Feedback Implementation", "API Security & Token Auth Review"].map(
              (task, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-500" size={18} />
                    <div>
                      <p className="text-xs font-medium text-white">{task}</p>
                      <p className="text-[10px] text-slate-400">Due in {i + 2} days • Assigned to Dev Team</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded">In Progress</span>
                </div>
              )
            )}
          </div>
        );

      case "Budgets & Invoices":
        return (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-white mb-2">Financial Allocation & Utilization</h4>
              <p className="text-xs text-slate-400 mb-4">Total Portal Budget: R 485,000 across 8 client accounts.</p>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[82%]"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>R 397,700 Incurred</span>
                <span>82% of R 485,000 Limit</span>
              </div>
            </div>
          </div>
        );

      case "Reports & Analytics":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <BarChart3 size={40} className="mx-auto text-blue-500 mb-2" />
              <h4 className="text-sm font-semibold text-white">Performance Analytics Report</h4>
              <p className="text-xs text-slate-400 mt-1">Client satisfaction rating: <strong>4.9 / 5.0</strong> with 100% on-time delivery.</p>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-4 max-w-xl">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h4 className="text-sm font-semibold text-white">Manager Portal Preferences</h4>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400 block">Manager Name</label>
                <input type="text" defaultValue="Musa Masanabo" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-slate-400 text-xs">Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-20`}
      >
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg text-white font-bold text-xs">CPM</div>
                <div>
                  <h1 className="font-semibold text-sm leading-tight">Project Portal</h1>
                  <p className="text-[10px] text-slate-400 capitalize">{portalRole} Portal</p>
                </div>
              </div>
            ) : (
              <div className="p-2 bg-blue-600 rounded-lg text-white font-bold mx-auto text-xs">CPM</div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <Menu size={18} />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {sidebarOpen && (
          <div className="p-4 border-t border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700 text-xs">
              {portalRole === "manager" ? "MM" : "AG"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium truncate">
                {portalRole === "manager" ? "Musa Masanabo" : "Apex Global Client"}
              </p>
              <p className="text-[10px] text-slate-400 truncate capitalize">{portalRole} View</p>
            </div>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-white">{activeTab}</h2>
            {/* ROLE SWITCHER TOGGLE */}
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => {
                  setPortalRole("manager");
                  setActiveTab("Dashboard");
                }}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  portalRole === "manager" ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-white"
                }`}
              >
                Manager View
              </button>
              <button
                onClick={() => {
                  setPortalRole("client-view" as any ? "client" : "client") // safe setter
                  setPortalRole("client");
                  setActiveTab("Dashboard");
                }}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  portalRole === "client" ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-white"
                }`}
              >
                Client View
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}