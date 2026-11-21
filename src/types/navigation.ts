export interface NavLink {
  title: string;
  href: string;
}

export interface NavigationConfig {
  mainNav: NavLink[];
  cta: NavLink;
}
