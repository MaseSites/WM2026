export interface NavItem {
  href: string;
  label: string;
  icon: string; // lucide icon name
  badge?: "live";
}

export const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Tournament",
    items: [
      { href: "/", label: "Home", icon: "Home" },
      { href: "/live", label: "Live Center", icon: "Radio", badge: "live" },
      { href: "/matches", label: "Matches", icon: "CalendarDays" },
      { href: "/bracket", label: "Bracket", icon: "Trophy" },
      { href: "/standings", label: "Standings", icon: "ListOrdered" },
    ],
  },
  {
    section: "Explore",
    items: [
      { href: "/teams", label: "Teams", icon: "Shield" },
      { href: "/players", label: "Players", icon: "Users" },
      { href: "/news", label: "News", icon: "Newspaper" },
      { href: "/predictions", label: "Predictions", icon: "Sparkles" },
    ],
  },
  {
    section: "Compete",
    items: [
      { href: "/leaderboard", label: "Leaderboard", icon: "Medal" },
      { href: "/profile", label: "My Profile", icon: "CircleUser" },
    ],
  },
];

export const MOBILE_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/live", label: "Live", icon: "Radio", badge: "live" },
  { href: "/bracket", label: "Bracket", icon: "Trophy" },
  { href: "/standings", label: "Tables", icon: "ListOrdered" },
  { href: "/profile", label: "Profile", icon: "CircleUser" },
];
