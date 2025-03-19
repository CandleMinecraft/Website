"use client";

import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Store auth state in sessionStorage
    sessionStorage.setItem("isAuthenticated", "true");
    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
} 