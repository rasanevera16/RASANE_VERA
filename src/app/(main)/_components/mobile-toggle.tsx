"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "./navigation-sidebar";
import { useState } from "react";

export const MobileToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 md:hidden"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-1 py-2">
          <SheetHeader className="pl-5 pr-3">
            <Image
              src="/logo-with-text.svg"
              alt="Logo"
              width={150}
              height={40}
              className="flex-shrink-0 object-contain"
              draggable={false}
            />
          </SheetHeader>
          <NavigationSidebar setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    );
  }
};
