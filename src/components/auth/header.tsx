import Image from "next/image";

import { CardTitle } from "../ui/card";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Image
        src="/logo-with-caption.svg"
        alt="Logo"
        width={60}
        height={60}
        priority
      />
      <CardTitle className="text-center font-bold leading-none tracking-normal text-muted-foreground">
        {label}
      </CardTitle>
    </div>
  );
};

export default Header;
