import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";

interface NavigationSidebarProps {
  setIsOpen?: (value: boolean) => void;
}

export const NavigationSidebar = ({ setIsOpen }: NavigationSidebarProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 bg-white">
      <ScrollArea className="flex-1 px-3 py-2">
        <NavigationItem setIsOpen={setIsOpen} />
      </ScrollArea>
    </div>
  );
};
