"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Play } from "lucide-react";

import { Skeleton } from "./ui/skeleton";

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted && typeof window !== "undefined") {
    return (
      <Skeleton className="aspect-video h-full w-full overflow-hidden rounded-xl" />
    );
  }

  return (
    <ReactPlayer
      url={url || ""}
      alt="Tentang Rasane Vera"
      width="100%"
      height="100%"
      playing
      controls
      playIcon={
        <button>
          <Play className="size-12 fill-white stroke-none" />
        </button>
      }
      light={"/thumbnail.jpg"}
      fallback={
        <Skeleton className="aspect-video h-full w-full overflow-hidden rounded-xl" />
      }
    />
  );
};
