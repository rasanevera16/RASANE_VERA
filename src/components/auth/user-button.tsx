import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitialName, truncate } from "@/lib/utils";
import LogoutButton from "./logout-button";
import { CustomAvatar } from "../custom-avatar";

interface UserButtonProps {
  name?: string | null;
  imageURL?: string | null;
  email?: string | null;
}

const UserButton = ({ name, email, imageURL }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CustomAvatar
          src={imageURL || ""}
          alt={name || ""}
          fallback={
            <p className="text-xs font-medium text-white">
              {getInitialName(name || "")}
            </p>
          }
          className="h-8 w-8 cursor-pointer"
          classNameAvatarFallback="bg-secondary-green"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl shadow-xl" align="end">
        <div className="flex flex-row gap-2.5 px-2 py-2">
          <Avatar className="h-10 w-10 self-start">
            <AvatarImage src={imageURL || ""} />
            <AvatarFallback className="bg-secondary-green">
              <p className="text-sm font-medium text-white">
                {getInitialName(name || "")}
              </p>
            </AvatarFallback>
          </Avatar>
          <div className="self-start">
            <h2 className="text-base font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{truncate(email!, 20)}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer gap-3 focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="flex h-5 w-5 items-center justify-center" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
