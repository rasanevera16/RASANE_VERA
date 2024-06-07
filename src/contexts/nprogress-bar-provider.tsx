"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NProgressBarProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#9333EA"
        options={{
          showSpinner: false,
          easing: "ease",
        }}
        shallowRouting
        startPosition={0.08}
      />
    </>
  );
};
