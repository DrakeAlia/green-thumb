import { Icons } from "@/components/ui/icons";

// This nav.ts file plays a crucial role in maintaining type safety and consistency
// in navigation-related code across the application. By defining these interfaces,
// it ensures that all parts of the application dealing with navigation items are working
// with a consistent data structure, reducing the likelihood of errors and
// improving maintainability.

// Base interface for all navigation items
export interface NavItem {
  title: string; // The display text for the navigation item
  href?: string; // Optional URL or path the item links to
  disabled?: boolean; // Optional flag to disable the item
  external?: boolean; // Optional flag to indicate an external link
  icon?: keyof typeof Icons; // Optional icon from the Icons component
  label?: string; // Optional additional label text
}

// Interface for navigation items that can have nested items
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]; // Array of child navigation items
}

// Interface for main navigation items
export interface MainNavItem extends NavItem {}

// Interface for sidebar navigation items
export interface SidebarNavItem extends NavItemWithChildren {}
