import Image from "next/image";
import Link from "next/link";

import { MobileToggle } from "./mobile-toggle";
import { currentUser } from "@/lib/auth";
import UserButton from "@/components/auth/user-button";

export const NavigationHeader = async () => {
  const user = await currentUser();

  return (
    <header className="sticky left-0 top-0 z-40 w-full">
      <div className="bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MobileToggle />

            <Link href="/">
              <Image
                src="/logo-with-text.svg"
                alt="Logo"
                width={140}
                height={30}
                className="flex-shrink-0 object-contain"
                draggable={false}
              />
            </Link>
          </div>
          {/* User Button */}
          <UserButton
            name={user?.name}
            imageURL={user?.image}
            email={user?.email}
          />
        </div>
      </div>
    </header>
  );
};
