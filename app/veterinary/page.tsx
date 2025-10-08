"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { VeterinaryCard } from "@/components/veterinary-card"
import { VeterinaryFilters, type FilterState } from "@/components/veterinary-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { mockVeterinaryClinics } from "@/lib/mock-data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

function VeterinaryContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialLocation = searchParams.get("location") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [location, setLocation] = useState(initialLocation)
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    emergency24_7: false,
    acceptsWalkIns: false,
    minRating: 0,
    maxDistance: 50,
  })

  const filteredClinics = useMemo(() => {
    return mockVeterinaryClinics.filter((clinic) => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch =
          clinic.name.toLowerCase().includes(search) ||
          clinic.services.some((s) => s.toLowerCase().includes(search)) ||
          clinic.description.toLowerCase().includes(search)
        if (!matchesSearch) return false
      }

      // Location filter
      if (location) {
        const loc = location.toLowerCase()
        const matchesLocation =
          clinic.city.toLowerCase().includes(loc) ||
          clinic.state.toLowerCase().includes(loc) ||
          clinic.zipCode.includes(loc)
        if (!matchesLocation) return false
      }

      // Services filter
      if (filters.services.length > 0) {
        const hasService = filters.services.some((service) => clinic.services.includes(service))
        if (!hasService) return false
      }

      // Emergency filter
      if (filters.emergency24_7 && !clinic.emergency24_7) return false

      // Walk-ins filter
      if (filters.acceptsWalkIns && !clinic.acceptsWalkIns) return false

      // Rating filter
      if (clinic.rating < filters.minRating) return false

      // Distance filter
      if (clinic.distance && clinic.distance > filters.maxDistance) return false

      return true
    })
  }, [searchTerm, location, filters])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-primary/5 py-12 border-b">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4 text-balance">Find a Veterinary Clinic</h1>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Browse verified veterinary clinics in your area
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 max-w-3xl">
              <Input
                type="text"
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button size="lg" className="md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-8">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredClinics.length} {filteredClinics.length === 1 ? "clinic" : "clinics"} found
              </p>

              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <VeterinaryFilters onFilterChange={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-8">
              {/* Desktop Filters Sidebar */}
              <aside className="hidden md:block w-80 flex-shrink-0">
                <div className="sticky top-20">
                  <VeterinaryFilters onFilterChange={setFilters} />
                </div>
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                {filteredClinics.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredClinics.map((clinic) => (
                      <VeterinaryCard key={clinic.id} clinic={clinic} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">No clinics found matching your criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setLocation("")
                        setFilters({
                          services: [],
                          emergency24_7: false,
                          acceptsWalkIns: false,
                          minRating: 0,
                          maxDistance: 50,
                        })
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function VeterinaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VeterinaryContent />
    </Suspense>
  )
}
