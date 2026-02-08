export interface NavRoute {
  key: string;
  label: string;
  href: string;
}

export const ROUTES: NavRoute[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "ai", label: "AI / ML", href: "/ai" },
  { key: "dev", label: "Development", href: "/dev" },
  { key: "ds", label: "Data Science", href: "/ds" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];