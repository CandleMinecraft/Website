"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Hier können weitere Navigationspunkte hinzugefügt werden */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
} 