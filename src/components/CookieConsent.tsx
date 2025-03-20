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
      "Oh bitte, bitte, BITTE akzeptiere unsere Cookies! 🥺",
      "Komm schon! Unsere Cookies sind super lecker und TOTAL harmlos! 🍪",
      "WARUM HASST DU COOKIES SO SEHR?! 😭",
      "Ich schwöre, diese Cookies sind anders! Sie sind besonders! 🥹",
      "Weißt du eigentlich, wie viele Stunden ich in diesen Cookie-Dialog gesteckt habe? 😢"
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
              ? "Juhu! Du magst also doch Cookies! Willst du sie... vielleicht wieder hassen? 👉👈" 
              : "Ohne Cookies fühle ich mich so... leer. Bitte hilf mir! 🥺"}
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
              {cookieConsent ? "Cookies verbieten" : "Cookies erlauben"}
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
                ? "Nein, ich liebe Cookies!" 
                : "Nein, ich hasse Cookies!"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent; 