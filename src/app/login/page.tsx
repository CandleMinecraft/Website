"use client";

import { LoginForm } from "@/components/login-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    // Wenn ein Redirect-Parameter existiert, überprüfen wir, ob es eine valide candlemc.net URL ist
    if (redirect) {
      try {
        // Überprüfen, ob die URL mit einem Slash beginnt und keine externe URL ist
        if (!redirect.startsWith('/') || redirect.includes('://') || redirect === '/login') {
          // Ungültige URL - Parameter aus der URL entfernen
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('redirect');
          router.replace(newUrl.pathname);
        }
      } catch (e) {
        // Bei ungültiger URL, Parameter entfernen
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('redirect');
        router.replace(newUrl.pathname);
      }
    }
  }, [searchParams, router]);

  const handleLoginSuccess = () => {
    // Store auth state in sessionStorage
    sessionStorage.setItem("isAuthenticated", "true");
    
    // Nach erfolgreicher Anmeldung zum Redirect-Ziel navigieren, falls vorhanden
    const redirect = searchParams.get('redirect');
    if (redirect && redirect.startsWith('/') && !redirect.includes('://') && redirect !== '/login') {
      router.push(redirect);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
} 