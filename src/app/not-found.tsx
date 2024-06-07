"use client";

import { useRouter } from "next-nprogress-bar";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-secondary-red lg:text-7xl">
          404
        </h1>
        <p className="text-lg font-light text-gray-500">
          Sorry, we can`t find that page. You`ll find lots to explore on the
          home page.
        </p>
        <Button
          variant="custom_primary"
          onClick={() => router.back({ showProgressBar: true })}
        >
          <ArrowLeft className="relative size-4" />
          <span className="tracking-wides relative font-semibold">Back</span>
        </Button>
      </div>
    </div>
  );
};

export default Page;
