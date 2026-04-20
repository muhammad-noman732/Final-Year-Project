import { FileX, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: "file" | "search" | "users";
    title: string;
    description: string;
    className?: string;
    children?: React.ReactNode;
}

const icons = {
    file: FileX,
    search: Search,
    users: Users,
};

export default function EmptyState({
    icon = "file",
    title,
    description,
    className,
    children,
}: EmptyStateProps) {
    const Icon = icons[icon];

    return (
        <div className={cn("flex flex-col items-center justify-center py-16 px-4", className)}>
            <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-navy-700/50 flex items-center justify-center border border-gold-500/10">
                    <Icon className="w-10 h-10 text-gold-500/40" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-navy-800 border border-gold-500/20 flex items-center justify-center">
                    <span className="text-gold-500/60 text-xs">?</span>
                </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground/80 tracking-tight mb-2">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
                {description}
            </p>
            {children}
        </div>
    );
}
