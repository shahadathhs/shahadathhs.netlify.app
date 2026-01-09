'use client';

import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { LogOut, Menu, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/shared/ModeToggle';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
      router.push('/');
    } catch {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: 'An error occurred while logging out.',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 p-2 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
              <div className="p-6 border-b flex items-center justify-between">
                <Link
                  href="/"
                  className="font-bold text-lg flex items-center gap-2"
                >
                  <div className="bg-primary text-primary-foreground h-6 w-6 rounded-md flex items-center justify-center text-xs">
                    S
                  </div>
                  Portfolio
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" />
                </SheetTrigger>
              </div>
              <DashboardNav />
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all hover:opacity-80 group"
          >
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden flex-col items-start md:flex">
              <span className="font-bold text-sm tracking-tight leading-none text-foreground">
                Shahadath Sajib
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                Visit Public Site
              </span>
            </div>
          </Link>

          <div className="h-6 w-px bg-border/60 mx-1 hidden md:block" />

          <Link
            href="/dashboard"
            className="flex items-center gap-2 md:ml-2 group"
          >
            <span className="font-semibold text-sm text-foreground transition-colors group-hover:text-primary">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/">View Site</Link>
          </Button>

          <ModeToggle />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full border-primary/20 hover:border-primary/50 transition-colors"
                >
                  {user.name.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Menu className="mr-2 h-4 w-4" />
                    <span>Home Page</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
