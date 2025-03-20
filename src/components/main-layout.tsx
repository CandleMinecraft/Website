"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import Image from "next/image";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-background pointer-events-none" />
      <div className="fixed inset-0 bg-grid-primary/[0.03] dark:bg-grid-primary/[0.05] [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

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

        <Footer />
      </div>
    </div>
  );
}