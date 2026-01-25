import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/50 px-4 -mx-4 rounded-lg">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-4 mb-1">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-12 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-6 w-24 md:ml-8" />
    </div>
  );
}
