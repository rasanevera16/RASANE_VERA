"use client";

import { useRouter } from "next-nprogress-bar";
import { Plus } from "lucide-react";

import { Container } from "./ui/container";
import { Button } from "./ui/button";
import { Heading } from "./ui/heading";

interface ContentHeaderProps {
  title: string;
  description?: string;
  link?: string;
}

export const ContentHeader = ({
  title,
  description,
  link,
}: ContentHeaderProps) => {
  const router = useRouter();

  return (
    <div className="sticky inset-0 top-12 z-10 h-fit max-h-0 w-full md:top-11">
      <div className="bg-background py-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <Container>
          <div className="flex items-center justify-between gap-2">
            <Heading title={title} description={description} />
            {link && link !== "" && (
              <Button
                onClick={() =>
                  router.push(link, undefined, {
                    showProgressBar: true,
                  })
                }
                size="custom_icon"
                className="relative"
              >
                <Plus className="size-4" />
              </Button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
