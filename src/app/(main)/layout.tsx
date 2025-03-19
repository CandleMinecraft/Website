"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      // Replace this with your actual auth check logic
      const isAuthed = sessionStorage.getItem("isAuthenticated") === "true";
      if (!isAuthed) {
        const currentPath = window.location.pathname;
        // Überprüfen, ob die URL eine candlemc.net Sub-URL ist
        if (currentPath && currentPath !== '/login') {
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          router.push('/login');
        }
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null; // Return nothing while checking auth
  }
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-background pointer-events-none" />
      <div className="fixed inset-0 bg-grid-primary/[0.03] dark:bg-grid-primary/[0.05] [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      {/* Content Container */}
      <div className="relative">
        {/* Development Status Banner */}
        <div className="bg-[#2B2B2B] text-white py-2 px-4 text-center text-sm animate-fade-in backdrop-blur-sm border-b border-primary/10">
          🚧 CandleMC is in active development - Join us in shaping the future of Minecraft servers! 🚧
        </div>

        {/* Navbar */}
        <nav className="border-b animate-fade-in [animation-delay:200ms] bg-background/50 backdrop-blur-5xl sticky top-0 z-50">
          <div className="container max-w-7xl mx-auto flex h-16 items-center px-4">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image 
                src="/logo512.png" 
                alt="CandleMC Logo" 
                width={32} 
                height={32} 
                className="rounded-sm" 
              />
              <span className="font-bold text-xl">CandleMC</span>
            </Link>
            <MainNav />
            <div className="flex items-center ml-auto space-x-2">
              <ThemeSwitcher />
              <MobileNav />
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t py-12 mt-12 bg-background/50 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              CandleMC is not affiliated with Mojang AB. Minecraft is a trademark of Mojang AB.
            </p>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CandleMC Team. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
} 