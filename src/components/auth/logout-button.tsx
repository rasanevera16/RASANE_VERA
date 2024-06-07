"use client";

import { useState } from "react";

import { logout } from "@/server/actions/logout";
import { Loader } from "../ui/loader";

const LogoutButton = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);

    await logout();

    setLoading(false);
  };

  return (
    <>
      <span
        onClick={onLogout}
        aria-disabled={loading}
        className="inline-flex w-full items-center gap-2"
      >
        {loading && <Loader />}
        {children}
      </span>
    </>
  );
};

export default LogoutButton;
