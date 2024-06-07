import { AuthProvider } from "./auth-provider";
import { ModalStoreProvider } from "./modal-store-provider";
import { NProgressBarProvider } from "./nprogress-bar-provider";
import { QueryProvider } from "./query-provider";

export const Providers = async ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ModalStoreProvider />
        <NProgressBarProvider>{children}</NProgressBarProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
