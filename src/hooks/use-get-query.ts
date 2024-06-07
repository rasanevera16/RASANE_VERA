"use client";

import { useQuery } from "@tanstack/react-query";

interface useGetQueryProps {
  queryKey: string;
  queryFn: () => Promise<any[]>;
}

export const useGetQuery = ({ queryKey, queryFn }: useGetQueryProps) => {
  const { data, isLoading, status } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  });

  return {
    data,
    isLoading,
    status,
  };
};
