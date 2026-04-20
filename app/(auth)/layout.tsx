export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-[100dvh] bg-navy-gradient relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold-500/3 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold-700/3 blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-sky-500/2 blur-3xl" />
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
