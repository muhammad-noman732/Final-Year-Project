export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
          Super Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage universities, admins, and platform settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Universities</p>
          <p className="text-3xl font-bold text-gold-400 mt-2">1</p>
          <p className="text-xs text-muted-foreground mt-1">Active tenants</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold text-gold-400 mt-2">—</p>
          <p className="text-xs text-muted-foreground mt-1">Across all universities</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Platform Status</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">Online</p>
          <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <p className="text-muted-foreground text-sm">
          Full super admin dashboard (university management, admin creation, platform analytics)
          will be built in the next phase.
        </p>
      </div>
    </div>
  )
}
