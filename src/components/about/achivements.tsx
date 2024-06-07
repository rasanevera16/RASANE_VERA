"use client";

import { Edit, Plus, Trash } from "lucide-react";

import { TAboutAchievements } from "@/types/about-type";
import { CardWrapperForm } from "../card-wrapper-form";
import { CountUp } from "../count-up";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useModalStore } from "@/stores/modal-store";
import { numberFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDeleteAchievement } from "@/features/about/use-delete-achievement";

interface AchievementsProps {
  data: TAboutAchievements[];
  aboutId: string;
}

export const Achievements = ({ data, aboutId }: AchievementsProps) => {
  const { onOpen } = useModalStore();
  const { statusDeleteAchievement, executeDeleteAchievement } =
    useDeleteAchievement();

  return (
    <>
      <div className="h-max">
        <div className="w-full rounded-xl border-2 border-dashed">
          <button
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4"
            type="button"
            onClick={() =>
              onOpen(
                "addAchievement",
                {
                  title: "Menambahkan Pencapaian",
                  message: (
                    <>
                      Tambahkan pencapaian yang telah diraih oleh Rasane Vera.
                    </>
                  ),
                },
                {
                  id: aboutId,
                },
              )
            }
          >
            <Plus className="size-6 text-gray-500" />
            <h1 className="text-sm font-medium text-gray-700">
              Tambahkan Pencapaian
            </h1>
          </button>
        </div>
      </div>
      {data && data.length > 0 ? (
        data.map((achievement) => (
          <div className="h-max" key={achievement.id}>
            <CardWrapperForm>
              <div className="space-y-2 pb-3">
                <div className="items-center-gap-2 flex">
                  <h1 className="line-clamp-1 break-all text-2xl font-bold">
                    <CountUp
                      start={0}
                      end={achievement.count}
                      formattingFn={numberFormat}
                    />
                  </h1>
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8"
                      type="button"
                      onClick={() =>
                        onOpen(
                          "editAchievement",
                          {
                            title: "Edit Pencapaian",
                            message: (
                              <>
                                Edit pencapaian yang telah diraih oleh Rasane
                                Vera.
                              </>
                            ),
                          },
                          {
                            id: aboutId,
                            aboutAchievement: achievement,
                          },
                        )
                      }
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8"
                      type="button"
                      onClick={() =>
                        onOpen("delete", {
                          title: "Apakah kamu yakin?",
                          message: (
                            <>
                              Apakah kamu yakin ingin menghapus pencapaian ini?
                              Pencapaian{" "}
                              <span className="font-semibold text-primary-purple">
                                {achievement.title}
                              </span>{" "}
                              akan dihapus secara permanen. Tindakan ini tidak
                              bisa dibatalkan.
                            </>
                          ),
                          onDelete: () =>
                            executeDeleteAchievement({ id: achievement.id }),
                          loading: statusDeleteAchievement === "executing",
                        })
                      }
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>
                <h2 className="text-sm text-gray-700">{achievement.title}</h2>
              </div>
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-1"
              >
                <AccordionItem
                  value={achievement.id}
                  className="-mx-2 border-none"
                >
                  <AccordionTrigger className="rounded-lg p-2 text-sm font-medium hover:bg-gray-100 hover:no-underline">
                    Show More
                  </AccordionTrigger>
                  <AccordionContent className="bg-primary-soft-green/60 mt-2 whitespace-pre-line break-words rounded-lg px-2 pb-2 pt-2 text-xs text-gray-700">
                    {achievement.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardWrapperForm>
          </div>
        ))
      ) : (
        <div className="h-max">
          <CardWrapperForm>
            <p className="text-center text-xs font-medium text-gray-700">
              Belum ada pencapaian yang ditambahkan
            </p>
          </CardWrapperForm>
        </div>
      )}
    </>
  );
};
