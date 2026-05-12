export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-[100dvh] bg-white dark:bg-[#050811] relative">
            <div className="relative z-10">{children}</div>
        </div>
    );
}
