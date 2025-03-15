"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MoonIcon, SunIcon, GitHubLogoIcon, DiscordLogoIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { setTheme, theme } = useTheme();

  const MenuItems = () => (
    <div className="flex flex-col space-y-3">
      <Link href="https://github.com/CandleMinecraft" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <GitHubLogoIcon className="h-5 w-5" />
        <span className="font-medium">GitHub</span>
      </Link>
      <Link href="https://discord.gg/invite/a8Sj3dUcB4" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <DiscordLogoIcon className="h-5 w-5" />
        <span className="font-medium">Discord</span>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Development Status Banner */}
      <div className="bg-primary/10 py-2 px-4 text-center text-sm">
        🚧 CandleMC is currently in early development. Join our community to stay updated! 🚧
      </div>

      {/* Navbar */}
      <nav className="border-b">
        <div className="container max-w-7xl mx-auto flex h-16 items-center px-4">
          <div className="mr-6 flex items-center space-x-2">
            <Image src="/logo128.png" alt="CandleMC Logo" width={32} height={32} className="rounded-sm" />
            <span className="font-bold text-xl">CandleMC</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="https://github.com/CandleMinecraft" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      GitHub
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="https://discord.gg/invite/a8Sj3dUcB4" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Discord
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center ml-auto space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <HamburgerMenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image src="/logo128.png" alt="CandleMC Logo" width={24} height={24} className="rounded-sm" />
                    <span>Menu</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8">
                  <MenuItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <Image src="/logo512.png" alt="CandleMC Logo" width={128} height={128} className="mb-8 rounded-xl" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              CandleMC
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-[600px]">
              A next-generation Minecraft server software focused on performance and developer experience.
              Currently in early development.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="https://github.com/CandleMC">
                  <GitHubLogoIcon className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/discord">
                  <DiscordLogoIcon className="mr-2 h-5 w-5" />
                  Join Discord
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="container max-w-7xl mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Development Status</CardTitle>
                <CardDescription>Current progress and upcoming milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      CandleMC is in active development. Core features are being implemented and tested.
                      Follow our GitHub repository for the latest updates.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <h4 className="font-medium">Current Focus:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Core server implementation</li>
                      <li>Network protocol handling</li>
                      <li>Basic world generation</li>
                      <li>Plugin API design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
                <CardDescription>Ways to contribute to the project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We welcome contributions from developers of all skill levels. Here's how you can help:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Star and watch our GitHub repository</li>
                    <li>Join our Discord community</li>
                    <li>Report bugs and suggest features</li>
                    <li>Contribute code via pull requests</li>
                    <li>Help with documentation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            CandleMC is not affiliated with Mojang AB. Minecraft is a trademark of Mojang AB.
          </p>
          <p>© {new Date().getFullYear()} CandleMC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
