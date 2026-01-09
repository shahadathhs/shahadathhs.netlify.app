import { ActiveLink } from '@/components/shared/nav/utils/ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import { nanoid } from 'nanoid';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';

export const LargeNavLinks = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center space-x-2 lg:space-x-3 mr-3">
      {navLinks.map((link) => (
        <ActiveLink key={nanoid()} href={link.link}>
          {link.title}
        </ActiveLink>
      ))}

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-primary/10 hover:border-primary/30"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 z-[10000] mt-2">
            <div className="flex items-center gap-2 p-2 px-3">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate w-40">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-destructive focus:text-destructive flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
