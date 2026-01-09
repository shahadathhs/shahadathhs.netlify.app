'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Home,
  Plus,
  FolderHeart,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Blogs',
    href: '/dashboard/blogs',
    icon: FileText,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderHeart,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 py-4 text-sm ml-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          className={cn(
            'flex w-full items-center justify-start gap-2',
            pathname === item.href && 'bg-secondary font-medium',
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
      <div className="mt-auto space-y-1">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2"
          asChild
        >
          <Link href="/dashboard/blogs/new">
            <Plus className="h-4 w-4" />
            New Blog
          </Link>
        </Button>
        <div className="px-3 py-2">
          <div className="h-px bg-border" />
        </div>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href="/">
            <Globe className="h-4 w-4" />
            View Site
          </Link>
        </Button>
      </div>
    </nav>
  );
}
