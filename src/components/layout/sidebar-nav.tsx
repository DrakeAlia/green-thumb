"use client"; // Indicates this is a client-side component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types/nav";
import { cn } from "@/lib/utils";

// Props interface for ItemsSidebarNav
export interface ItemsSidebarNavProps {
  items: SidebarNavItem[];
}

// Main ItemsSidebarNav component: Designed for larger screens, typically desktop or tablet views.
export function ItemsSidebarNav({ items }: ItemsSidebarNavProps) {
  const pathname = usePathname(); // Get current pathname for active link styling

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          {/* Section title */}
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {/* Render sub-items if they exist */}
          {item?.items?.length && (
            <ItemsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null; // Render nothing if there are no items
}

// Props interface for ItemsSidebarNavItems
interface ItemsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

// Component for rendering individual nav items
export function ItemsSidebarNavItems({
  items,
  pathname,
}: ItemsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          // Render as a link if href is provided and item is not disabled
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {/* Render label if it exists */}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          // Render as a span if no href or item is disabled
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {/* Render label if it exists */}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null; // Render nothing if there are no items
}
