import type { Metadata } from "next";

import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login untuk masuk ke dashboard admin dan mengelola data pada aplikasi.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
