"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ChaperoneCard } from "@/components/chaperone-card"
import { ChaperoneFilters, type ChaperoneFilterState } from "@/components/chaperone-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { mockPetChaperones } from "@/lib/mock-data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

function ChaperoneContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialLocation = searchParams.get("location") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [location, setLocation] = useState(initialLocation)
  const [filters, setFilters] = useState<ChaperoneFilterState>({
    services: [],
    vehicleTypes: [],
    petTypes: [],
    priceRange: [],
    licensed: false,
    insured: false,
    minRating: 0,
    maxDistance: 50,
  })

  const filteredChaperones = useMemo(() => {
    return mockPetChaperones.filter((chaperone) => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch =
          chaperone.name.toLowerCase().includes(search) ||
          chaperone.businessName?.toLowerCase().includes(search) ||
          chaperone.services.some((s) => s.toLowerCase().includes(search)) ||
          chaperone.description.toLowerCase().includes(search)
        if (!matchesSearch) return false
      }

      // Location filter
      if (location) {
        const loc = location.toLowerCase()
        const matchesLocation =
          chaperone.city.toLowerCase().includes(loc) ||
          chaperone.state.toLowerCase().includes(loc) ||
          chaperone.zipCode.includes(loc)
        if (!matchesLocation) return false
      }

      // Services filter
      if (filters.services.length > 0) {
        const hasService = filters.services.some((service) => chaperone.services.includes(service))
        if (!hasService) return false
      }

      // Vehicle types filter
      if (filters.vehicleTypes.length > 0) {
        const hasVehicle = filters.vehicleTypes.some((vehicle) => chaperone.vehicleTypes.includes(vehicle))
        if (!hasVehicle) return false
      }

      // Pet types filter
      if (filters.petTypes.length > 0) {
        const hasPetType = filters.petTypes.some((pet) => chaperone.petTypes.includes(pet))
        if (!hasPetType) return false
      }

      // Price range filter
      if (filters.priceRange.length > 0) {
        if (!filters.priceRange.includes(chaperone.priceRange)) return false
      }

      // Licensed filter
      if (filters.licensed && !chaperone.licensed) return false

      // Insured filter
      if (filters.insured && !chaperone.insured) return false

      // Rating filter
      if (chaperone.rating < filters.minRating) return false

      // Distance filter
      if (chaperone.distance && chaperone.distance > filters.maxDistance) return false

      return true
    })
  }, [searchTerm, location, filters])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-accent/5 py-12 border-b">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4 text-balance">Find Pet Transport Services</h1>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Connect with trusted pet chaperones and transport professionals
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
                {filteredChaperones.length} {filteredChaperones.length === 1 ? "provider" : "providers"} found
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
                    <ChaperoneFilters onFilterChange={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-8">
              {/* Desktop Filters Sidebar */}
              <aside className="hidden md:block w-80 flex-shrink-0">
                <div className="sticky top-20">
                  <ChaperoneFilters onFilterChange={setFilters} />
                </div>
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                {filteredChaperones.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredChaperones.map((chaperone) => (
                      <ChaperoneCard key={chaperone.id} chaperone={chaperone} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">
                      No transport providers found matching your criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setLocation("")
                        setFilters({
                          services: [],
                          vehicleTypes: [],
                          petTypes: [],
                          priceRange: [],
                          licensed: false,
                          insured: false,
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

export default function ChaperonePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChaperoneContent />
    </Suspense>
  )
}
