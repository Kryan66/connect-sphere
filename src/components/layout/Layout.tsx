import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

export const Layout = ({ children, user, onLogout, onSearch }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header user={user} onLogout={onLogout} onSearch={onSearch} />
      <main className="container px-4 py-8">
        {children}
      </main>
    </div>
  );
};