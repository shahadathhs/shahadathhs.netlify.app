import { nanoid } from 'nanoid';
import { ActiveLink } from './ActiveLink';
import { navLinks } from '@/constant/navigationLinks';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export const MobileNavDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[10000] w-56 p-2">
        {navLinks.map((link) => (
          <DropdownMenuItem key={nanoid()} asChild>
            <ActiveLink href={link.link}>{link.title}</ActiveLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {user ? (
          <>
            <DropdownMenuItem key={nanoid()} asChild>
              <ActiveLink
                href="/dashboard"
                extraClasses="flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4 text-primary" />
                Dashboard
              </ActiveLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              key={nanoid()}
              onClick={() => logout()}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
