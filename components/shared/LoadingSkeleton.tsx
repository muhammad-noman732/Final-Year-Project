import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    variant?: "card" | "table" | "chart" | "stat" | "feed";
    count?: number;
    className?: string;
}

export default function LoadingSkeleton({
    variant = "card",
    count = 1,
    className,
}: LoadingSkeletonProps) {
    if (variant === "stat") {
        return (
            <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="glass-card rounded-xl p-6 space-y-3">
                        <Skeleton className="h-4 w-24 bg-navy-600" />
                        <Skeleton className="h-8 w-32 bg-navy-600" />
                        <Skeleton className="h-3 w-20 bg-navy-600" />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "table") {
        return (
            <div className={cn("glass-card rounded-xl p-4 space-y-3", className)}>
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-48 bg-navy-600" />
                    <Skeleton className="h-8 w-32 bg-navy-600" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full bg-navy-600 rounded" />
                    {Array.from({ length: count }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full bg-navy-600/50 rounded" />
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <Skeleton className="h-8 w-64 bg-navy-600" />
                </div>
            </div>
        );
    }

    if (variant === "chart") {
        return (
            <div className={cn("glass-card rounded-xl p-6 space-y-4", className)}>
                <Skeleton className="h-5 w-40 bg-navy-600" />
                <Skeleton className="h-64 w-full bg-navy-600/50 rounded" />
            </div>
        );
    }

    if (variant === "feed") {
        return (
            <div className={cn("glass-card rounded-xl p-4 space-y-3", className)}>
                <Skeleton className="h-5 w-32 bg-navy-600" />
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full bg-navy-600" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-3 w-3/4 bg-navy-600" />
                            <Skeleton className="h-3 w-1/2 bg-navy-600" />
                        </div>
                        <Skeleton className="h-5 w-16 bg-navy-600" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="glass-card rounded-xl p-6 space-y-3">
                    <Skeleton className="h-5 w-40 bg-navy-600" />
                    <Skeleton className="h-4 w-full bg-navy-600/50" />
                    <Skeleton className="h-4 w-3/4 bg-navy-600/50" />
                </div>
            ))}
        </div>
    );
}
