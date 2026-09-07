import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type UserRole = "EMPLOYEE" | "ADMIN"

interface DemoPaneProps {
  badge: string
  title: string
  description: string
  role: UserRole
  activeLoadingRole: UserRole | null
  onLogin: (role: UserRole) => void
  className?: string
}

export function DemoPane({
  badge,
  title,
  description,
  role,
  activeLoadingRole,
  onLogin,
  className,
}: DemoPaneProps) {
  const isLoading = activeLoadingRole === role

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 lg:p-16 transition-colors",
        className
      )}
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {badge}
        </span>

        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>

        <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>

        <Button
          size="lg"
          className="w-full text-base font-semibold shadow-sm transition-all hover:shadow-md"
          onClick={() => onLogin(role)}
          disabled={!!activeLoadingRole}
        >
          Sign In as {role === "ADMIN" ? "Admin" : "Employee"}
        </Button>
      </div>
    </div>
  )
}