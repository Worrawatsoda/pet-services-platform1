"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Pet {
  id: string
  name: string
  breed: string
  age: number
  photo?: string
  allergies?: string
  conditions?: string
  medications?: string
  vaccinations?: string
}

interface User {
  id: string
  name: string
  email: string
  userType: "pet-owner" | "admin"
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  pets?: Pet[]
  favoriteVets?: string[]
  favoriteChaperones?: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  addPet: (pet: Omit<Pet, "id">) => void
  updatePet: (petId: string, data: Partial<Pet>) => void
  deletePet: (petId: string) => void
  toggleFavoriteVet: (vetId: string) => void
  toggleFavoriteChaperone: (chaperoneId: string) => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("petcare_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const saveUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem("petcare_user", JSON.stringify(userData))
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@petcare.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin",
        name: "Admin",
        email,
        userType: "admin",
      }
      saveUser(adminUser)
      return true
    }

    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      userType: "pet-owner",
      pets: [],
      favoriteVets: [],
      favoriteChaperones: [],
    }

    saveUser(mockUser)
    return true
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      userType: "pet-owner",
      pets: [],
      favoriteVets: [],
      favoriteChaperones: [],
    }

    saveUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("petcare_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...data }
    saveUser(updatedUser)
  }

  const addPet = (pet: Omit<Pet, "id">) => {
    if (!user) return
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(),
    }
    const updatedUser = {
      ...user,
      pets: [...(user.pets || []), newPet],
    }
    saveUser(updatedUser)
  }

  const updatePet = (petId: string, data: Partial<Pet>) => {
    if (!user || !user.pets) return
    const updatedPets = user.pets.map((pet) => (pet.id === petId ? { ...pet, ...data } : pet))
    saveUser({ ...user, pets: updatedPets })
  }

  const deletePet = (petId: string) => {
    if (!user || !user.pets) return
    const updatedPets = user.pets.filter((pet) => pet.id !== petId)
    saveUser({ ...user, pets: updatedPets })
  }

  const toggleFavoriteVet = (vetId: string) => {
    if (!user) return
    const favorites = user.favoriteVets || []
    const updatedFavorites = favorites.includes(vetId) ? favorites.filter((id) => id !== vetId) : [...favorites, vetId]
    saveUser({ ...user, favoriteVets: updatedFavorites })
  }

  const toggleFavoriteChaperone = (chaperoneId: string) => {
    if (!user) return
    const favorites = user.favoriteChaperones || []
    const updatedFavorites = favorites.includes(chaperoneId)
      ? favorites.filter((id) => id !== chaperoneId)
      : [...favorites, chaperoneId]
    saveUser({ ...user, favoriteChaperones: updatedFavorites })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        addPet,
        updatePet,
        deletePet,
        toggleFavoriteVet,
        toggleFavoriteChaperone,
        isLoading,
      }}
    >
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

export type { User, Pet }
