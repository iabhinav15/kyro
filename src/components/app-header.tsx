import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () => {
  return (
    <header className="h-14 flex items-center gap-2 px-4 border-b bg-background">
      <SidebarTrigger />
    </header>
  );
};
