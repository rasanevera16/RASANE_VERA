"use client";

import { Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useModalStore } from "@/stores/modal-store";

interface HeaderProps {
  title: string;
  showAddButton: boolean;
}

export const Header = ({ title, showAddButton }: HeaderProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="sticky inset-0 top-12 z-10 h-fit max-h-0 w-full md:top-11">
      <div className="bg-background py-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <Container>
          <div className="flex items-center justify-between gap-2">
            <Heading title={title} />
            {showAddButton && (
              <Button
                size="custom_icon"
                className="relative md:h-9 md:w-9"
                type="button"
                onClick={() =>
                  onOpen("addAbout", {
                    title: "Tambah Tentang Rasane Vera",
                    message: <>Tambahkan informasi tentang Rasane Vera.</>,
                  })
                }
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
