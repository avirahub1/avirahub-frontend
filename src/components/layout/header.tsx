
'use client';

import { CodeXml, Menu, ChevronDown } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useClientRender } from "@/hooks/use-client-render";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";


const mainNavLinks = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
];

const coreServiceLinks = [
    { href: '/website-design-services-india', label: 'Web Design Services' },
    { href: '/frontend-developer-services', label: 'Frontend Development' },
    { href: '/seo-services-india', label: 'SEO Services' },
    { href: '/small-business-web-design', label: 'Small Business Websites' },
]

const industryNavLinks = [
    { href: '/services/gym-website-development', label: 'Gyms & Fitness' },
    { href: '/services/restaurant-website-design', label: 'Restaurants & Cafes' },
    { href: '/services/salon-website-development', label: 'Salons & Spas' },
    { href: '/services/real-estate-website-development', label: 'Real Estate' },
    { href: '/services/education-website-development', label: 'Education & E-Learning' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useClientRender();
  const pathname = usePathname();

  const isCoreServiceActive = coreServiceLinks.some(link => pathname === link.href);
  const isIndustryActive = industryNavLinks.some(link => pathname === link.href);


  if (!isClient) {
    return (
       <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
            <div className="w-[95%] max-w-7xl">
                <div className="bg-muted/60 backdrop-blur-md border-border rounded-full p-2">
                    <div className="flex items-center justify-between h-12 px-4">
                         <Link href="/" className="flex items-center space-x-2">
                            <CodeXml className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold tracking-tight hidden sm:inline">Avira Hub</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-24 hidden md:block" />
                            <Skeleton className="h-8 w-24 hidden md:block" />
                            <Skeleton className="h-10 w-28 hidden md:block" />
                            <Skeleton className="h-10 w-10 md:hidden" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 animate-fade-in-up">
        <div className="w-[95%] max-w-7xl">
            <div className="bg-card/50 backdrop-blur-lg border border-border/30 rounded-full p-2 shadow-lg shadow-black/10">
                <div className="flex items-center justify-between h-12 px-2 sm:px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <CodeXml className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold tracking-tight hidden sm:inline">Avira Hub</span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={cn("text-sm font-medium hover:text-foreground rounded-full", isCoreServiceActive ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>
                            Core Services <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-xl">
                            {coreServiceLinks.map(link => (
                                <DropdownMenuItem key={link.href} asChild className={cn(pathname === link.href && "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                                    <Link href={link.href}>{link.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={cn("text-sm font-medium hover:text-foreground rounded-full", isIndustryActive ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>
                            Industries <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-xl">
                            {industryNavLinks.map(link => (
                                <DropdownMenuItem key={link.href} asChild className={cn(pathname === link.href && "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                                    <Link href={link.href}>{link.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>

                        {mainNavLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href} 
                          className={cn(
                            "text-sm font-medium px-3 py-2 rounded-full hover:bg-accent transition-colors",
                             pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                            {link.label}
                        </Link>
                        ))}
                        <Button asChild className="rounded-full">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-xs bg-background p-0 flex flex-col h-full">
                            <SheetHeader className="p-4 border-b border-border flex flex-row items-center justify-between space-y-0 flex-shrink-0">
                                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                                    <CodeXml className="h-6 w-6 text-primary" />
                                    <span className="text-lg font-bold tracking-tight">Avira Hub</span>
                                </Link>
                                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="flex-1 min-h-0">
                                <nav className="p-4 space-y-4">
                                    <p className="px-4 font-semibold text-muted-foreground text-sm">Core Services</p>
                                    <div className="space-y-1">
                                    {coreServiceLinks.map((link) => (
                                        <Link 
                                          key={link.href} 
                                          href={link.href} 
                                          className={cn("block text-base font-medium rounded-md px-4 py-2 hover:bg-accent", pathname === link.href && 'bg-accent text-accent-foreground')} 
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    </div>
                                    <p className="px-4 pt-4 font-semibold text-muted-foreground text-sm">Industries</p>
                                    <div className="space-y-1">
                                    {industryNavLinks.map((link) => (
                                        <Link 
                                          key={link.href} 
                                          href={link.href} 
                                          className={cn("block text-base font-medium rounded-md px-4 py-2 hover:bg-accent", pathname === link.href && 'bg-accent text-accent-foreground')} 
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    </div>
                                    <p className="px-4 pt-4 font-semibold text-muted-foreground text-sm">Company</p>
                                    <div className="space-y-1">
                                    {mainNavLinks.map((link) => (
                                    <Link 
                                      key={link.href} 
                                      href={link.href} 
                                      className={cn("block text-base font-medium rounded-md px-4 py-2 hover:bg-accent", pathname === link.href && 'bg-accent text-accent-foreground')} 
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    ))}
                                    </div>
                                    <Button asChild className="w-full mt-8">
                                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                                    </Button>
                                </nav>
                            </ScrollArea>
                        </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
