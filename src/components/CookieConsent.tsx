"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cookie, Ban } from "lucide-react";
import { useCookie } from '@/hooks/useCookie';

const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useCookie('cookieConsent', false, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 Jahr
    path: '/'
  });
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const getDesperateMessage = () => {
    const messages = [
      "Oh please, please, PLEASE accept our cookies! 🥺",
      "Come on! Our cookies are super tasty and TOTALLY harmless! 🍪",
      "WHY DO YOU HATE COOKIES SO MUCH?! 😭",
      "I swear, these cookies are different! They are special! 🥹",
      "Do you even know how many hours I spent on this cookie dialog? 😢"
    ];
    return messages[Math.min(clickCount, messages.length - 1)];
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Cookie-Einstellungen"
      >
        {cookieConsent ? (
          <Cookie className="h-5 w-5" />
        ) : (
          <div className="relative">
            <Cookie className="h-5 w-5 text-muted-foreground" />
            <Ban className="h-4 w-4 absolute -top-2 -right-2 text-destructive" />
          </div>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="text-4xl mb-4 block animate-bounce">
                {cookieConsent ? (
                  <Cookie className="h-12 w-12 mx-auto" />
                ) : (
                  <div className="relative inline-block">
                    <Cookie className="h-12 w-12 text-muted-foreground" />
                    <Ban className="h-8 w-8 absolute -top-3 -right-3 text-destructive" />
                  </div>
                )}
              </span>
              {getDesperateMessage()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center text-muted-foreground text-sm mb-4">
            {cookieConsent 
              ? "Yay! So you do like cookies! Do you... maybe want to hate them again? 👉👈" 
              : "Without cookies, I feel so... empty. Please help me! 🥺"}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setCookieConsent(!cookieConsent);
                setClickCount(prev => prev + (!cookieConsent ? 0 : 1));
                setIsOpen(false);
              }}
              variant={cookieConsent ? "destructive" : "default"}
              className="w-full"
            >
              <span className="mr-2 relative">
                {cookieConsent ? (
                  <>
                    <Cookie className="h-4 w-4 text-current" />
                    <Ban className="h-3 w-3 absolute -top-1.5 -right-1.5 text-current" />
                  </>
                ) : (
                  <Cookie className="h-4 w-4" />
                )}
              </span>
              {cookieConsent ? "Prohibit cookies" : "Allow cookies"}
            </Button>
            <Button
              onClick={() => {
                if (!cookieConsent) {
                  setClickCount(prev => prev + 1);
                }
                setIsOpen(false);
              }}
              variant="outline"
              className="w-full"
            >
              {cookieConsent 
                ? "No, I love cookies!" 
                : "No, I hate cookies!"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent; 