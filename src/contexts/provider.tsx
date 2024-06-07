import { AuthProvider } from "./auth-provider";
import { ModalStoreProvider } from "./modal-store-provider";
import { NProgressBarProvider } from "./nprogress-bar-provider";

export const Providers = async ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      <ModalStoreProvider />
      <NProgressBarProvider>{children}</NProgressBarProvider>
    </AuthProvider>
  );
};
