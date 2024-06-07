export type TAbout = {
  id: string;
  youtubeUrl: string;
  description: string;
  vision: string;
  mission: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAboutAchievements = {
  id: string;
  aboutId: string;
  count: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAboutWithAchievements = TAbout & {
  aboutAchievements: TAboutAchievements[];
};
