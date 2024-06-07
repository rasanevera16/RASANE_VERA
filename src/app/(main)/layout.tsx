import { NavigationHeader } from "./_components/navigation-header";
import { NavigationSidebar } from "./_components/navigation-sidebar";

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-full w-full">
      <NavigationHeader />
      <aside className="fixed inset-y-0 left-0 z-30 mt-12 hidden h-full w-52 flex-col transition md:flex">
        <NavigationSidebar />
      </aside>
      <main className="h-full md:pl-52">
        <div className="mb-4 mt-2 flex flex-1 flex-col">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
