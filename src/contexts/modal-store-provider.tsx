"use client";

import { useMountedState } from "react-use";

import { AddAchievementModal } from "@/components/modals/add-achievement-modal";
import { DeleteModal } from "@/components/modals/delete-modal";
import { EditAchievementModal } from "@/components/modals/edit-achievement-modal";
import { AddAboutModal } from "@/components/modals/add-about-modal";

export const ModalStoreProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AddAboutModal />
      <AddAchievementModal />
      <EditAchievementModal />
      <DeleteModal />
    </>
  );
};
