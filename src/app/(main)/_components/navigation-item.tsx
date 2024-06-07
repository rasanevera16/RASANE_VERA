"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BadgeInfo,
  HandHeart,
  LayoutGrid,
  Package2,
  ShieldAlert,
  ShoppingBasket,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavigationItemProps {
  setIsOpen?: (value: boolean) => void;
}

export const NavigationItem = ({ setIsOpen }: NavigationItemProps) => {
  const pathname = usePathname();

  const mainRoutes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutGrid,
      active: pathname === "/",
    },
    {
      name: "Products",
      path: "/manage-products",
      icon: Package2,
      active: pathname === "/manage-products",
    },
    {
      name: "Orders",
      path: "/manage-orders",
      icon: ShoppingBasket,
      active: pathname === "/manage-orders",
    },
    {
      name: "About",
      path: "/manage-about",
      icon: BadgeInfo,
      active: pathname === "/manage-about",
    },
  ];

  const legalRoutes = [
    {
      name: "Privacy Policy",
      path: "/manage-privacy-policy",
      icon: ShieldAlert,
      active: pathname === "/manage-privacy-policy",
    },
    {
      name: "Terms of Service",
      path: "/manage-terms-of-service",
      icon: HandHeart,
      active: pathname === "/manage-terms-of-service",
    },
  ];

  return (
    <ul className="flex flex-col gap-1">
      {mainRoutes.map((route, index) => (
        <li key={index} onClick={() => setIsOpen && setIsOpen(false)}>
          <Link
            href={route.path}
            className={cn(
              "group flex w-full items-center gap-x-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-[#fafafb]",
              route.active && "bg-[#fafafb]",
            )}
          >
            <route.icon
              className={cn(
                "h-5 w-5 flex-shrink-0 text-muted-foreground",
                route.active && "text-secondary-green",
              )}
            />
            <p
              className={cn(
                "line-clamp-1 text-sm font-medium text-muted-foreground transition group-hover:text-gray-600",
                route.active && "text-secondary-green",
              )}
            >
              {route.name}
            </p>
          </Link>
        </li>
      ))}
      <div className="px-2.5 pb-1 pt-3 text-sm font-semibold text-gray-700">
        Other
      </div>
      {legalRoutes.map((route, index) => (
        <li key={index} onClick={() => setIsOpen && setIsOpen(false)}>
          <Link
            href={route.path}
            className={cn(
              "group flex w-full items-center gap-x-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-[#fafafb]",
              route.active && "bg-[#fafafb]",
            )}
          >
            <route.icon
              className={cn(
                "h-5 w-5 flex-shrink-0 text-muted-foreground",
                route.active && "text-secondary-green",
              )}
            />
            <p
              className={cn(
                "line-clamp-1 text-sm font-medium text-muted-foreground transition group-hover:text-gray-600",
                route.active && "text-secondary-green",
              )}
            >
              {route.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
