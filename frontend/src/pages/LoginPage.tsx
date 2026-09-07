import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/config"
import { useAuth } from "@/context/AuthContext"
import { LoginForm } from "@/components/login-form"
import { DemoPane, type UserRole } from "@/components/demo-pane"

const IS_DEMO = import.meta.env.VITE_IS_DEMO === "true"

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null)

  const handleDemoLogin = async (role: UserRole) => {
    setLoadingRole(role)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/demo-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate demo session")
      }

      const user = await response.json()
      setUser(user)

      toast.success(`Welcome, ${user.first_name}.`)
      navigate("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Could not start demo")
    } finally {
      setLoadingRole(null)
    }
  }

  if (IS_DEMO) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <DemoPane
          badge="Standard Access"
          title="Employee View"
          description="Experience the app from an employee's perspective. View available hardware, check your assigned items, and request equipment."
          role="EMPLOYEE"
          activeLoadingRole={loadingRole}
          onLogin={handleDemoLogin}
          className="bg-background"
        />

        <DemoPane
          badge="Full Control"
          title="Admin View"
          description="Explore administrative controls. Oversee global inventory, monitor ongoing repairs, and track equipment distribution."
          role="ADMIN"
          activeLoadingRole={loadingRole}
          onLogin={handleDemoLogin}
          className="bg-muted/40"
        />
      </div>
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:flex items-center justify-center p-10">
        <img
          src="/booksy.svg"
          alt="Company Logo"
          className="max-h-24 max-w-xs h-auto w-auto object-contain dark:brightness-200"
        />
      </div>
    </div>
  )
}