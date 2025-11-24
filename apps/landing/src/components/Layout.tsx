import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950">
      {/* Header with Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
