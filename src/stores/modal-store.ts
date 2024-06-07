import { TAboutAchievements } from "@/types/about-type";
import { create } from "zustand";

export type TModal =
  | "delete"
  | "addAbout"
  | "addAchievement"
  | "editAchievement";

export interface IModalData {
  id?: string;
  aboutAchievement?: TAboutAchievements;
}

interface IModalConfig {
  title?: string;
  message?: React.ReactNode;
  loading?: boolean;
  onDelete?: () => void;
}

interface IModalStore {
  type: TModal | null;
  data: IModalData;
  isOpen: boolean;
  config: IModalConfig;
  onOpen: (type: TModal, config?: IModalConfig, data?: IModalData) => void;
  onClose: (config?: IModalConfig, data?: IModalData) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  config: {},
  onOpen: (type, config = {}, data = {}) =>
    set({ isOpen: true, type, config, data }),
  onClose: (config = {}, data = {}) =>
    set({ type: null, isOpen: false, config, data }),
}));
