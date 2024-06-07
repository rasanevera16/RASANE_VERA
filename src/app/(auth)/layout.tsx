const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-6 py-6 sm:max-w-md">
      {children}
    </div>
  );
};

export default AuthLayout;
