import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-8 gap-6 border-b border-border/50 px-4 -mx-4 rounded-lg">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
