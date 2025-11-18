import {
  ChartBarIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PlusIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const mockStats = [
  {
    label: "Created Websites",
    value: 18,
    change: "+3 this month",
    icon: PlusIcon,
  },
  {
    label: "Last Update",
    value: "Nov 12, 2025",
    change: "2 tasks pending",
    icon: PencilSquareIcon,
  },
  {
    label: "Drafts",
    value: 5,
    change: "1 ready to publish",
    icon: DocumentDuplicateIcon,
  },
  {
    label: "Published",
    value: 13,
    change: "+2 this week",
    icon: ChartBarIcon,
  },
];

const mockActivity = [
  {
    title: "Homepage redesign published",
    timestamp: "2 hours ago",
    actor: "You",
  },
  {
    title: "Analytics dashboard template saved as draft",
    timestamp: "Yesterday",
    actor: "You",
  },
  {
    title: "Landing page copy updated",
    timestamp: "Nov 15, 2025",
    actor: "Alex Rivera",
  },
  {
    title: "New blog layout created",
    timestamp: "Nov 14, 2025",
    actor: "You",
  },
];

const mockWebsites = [
  {
    id: "1",
    title: "Aurora SaaS Landing",
    updatedAt: "Nov 16, 2025",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Product Analytics Hub",
    updatedAt: "Nov 12, 2025",
    status: "Draft",
    thumbnail:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Creative Portfolio v3",
    updatedAt: "Nov 10, 2025",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Marketing Campaign Microsite",
    updatedAt: "Nov 9, 2025",
    status: "Draft",
    thumbnail:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=400&q=80",
  },
];

type PanelKey = "overview" | "websites" | "profile";

const navItems: Array<{ label: string; key: PanelKey; icon: typeof UserIcon } | { label: string; key: "create"; icon: typeof PlusIcon }> = [
  { label: "Dashboard", key: "overview", icon: UserGroupIcon },
  { label: "My Websites", key: "websites", icon: DocumentDuplicateIcon },
  { label: "Create New", key: "create", icon: PlusIcon },
  { label: "Profile", key: "profile", icon: UserCircleIcon },
];
 
export type { PanelKey };
export { mockStats, mockActivity, mockWebsites, navItems };