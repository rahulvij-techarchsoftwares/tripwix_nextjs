export interface MenuItem {
  id: number;
  href: string;
  text: string;
}

export interface FooterAccordionProps {
  title: string;
  menuItems: MenuItem[];
  lang: string;
}
