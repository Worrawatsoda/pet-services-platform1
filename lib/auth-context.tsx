"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  userType: "pet-owner" | "provider"
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  userType: "pet-owner" | "provider"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("petcare_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any email/password
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      userType: "pet-owner",
    }

    setUser(mockUser)
    localStorage.setItem("petcare_user", JSON.stringify(mockUser))
    return true
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      userType: data.userType,
    }

    setUser(newUser)
    localStorage.setItem("petcare_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("petcare_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("petcare_user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
