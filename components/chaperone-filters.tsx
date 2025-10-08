"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ChaperoneFiltersProps {
  onFilterChange: (filters: ChaperoneFilterState) => void
}

export interface ChaperoneFilterState {
  services: string[]
  vehicleTypes: string[]
  petTypes: string[]
  priceRange: string[]
  licensed: boolean
  insured: boolean
  minRating: number
  maxDistance: number
}

const availableServices = [
  "Vet Appointments",
  "Airport Transport",
  "Long Distance",
  "Emergency Transport",
  "Grooming Transport",
  "Day Care Drop-off",
  "Pet Sitting",
  "Multi-Pet Transport",
]

const availableVehicleTypes = ["Sedan", "SUV", "Minivan", "Climate-Controlled Van", "Large Van"]

const availablePetTypes = ["Dogs", "Cats", "Birds", "Small Animals", "Exotic Pets"]

const priceRanges = [
  { label: "$ - Budget", value: "$" },
  { label: "$$ - Moderate", value: "$$" },
  { label: "$$$ - Premium", value: "$$$" },
]

export function ChaperoneFilters({ onFilterChange }: ChaperoneFiltersProps) {
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

  const updateFilters = (updates: Partial<ChaperoneFilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleArrayFilter = (
    key: keyof Pick<ChaperoneFilterState, "services" | "vehicleTypes" | "petTypes" | "priceRange">,
    value: string,
  ) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters({ [key]: newArray })
  }

  const clearFilters = () => {
    const defaultFilters: ChaperoneFilterState = {
      services: [],
      vehicleTypes: [],
      petTypes: [],
      priceRange: [],
      licensed: false,
      insured: false,
      minRating: 0,
      maxDistance: 50,
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters =
    filters.services.length > 0 ||
    filters.vehicleTypes.length > 0 ||
    filters.petTypes.length > 0 ||
    filters.priceRange.length > 0 ||
    filters.licensed ||
    filters.insured ||
    filters.minRating > 0 ||
    filters.maxDistance < 50

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Services */}
        <div>
          <h4 className="font-medium mb-3">Services</h4>
          <div className="space-y-2">
            {availableServices.map((service) => (
              <div key={service} className="flex items-center gap-2">
                <Checkbox
                  id={`service-${service}`}
                  checked={filters.services.includes(service)}
                  onCheckedChange={() => toggleArrayFilter("services", service)}
                />
                <Label htmlFor={`service-${service}`} className="text-sm font-normal cursor-pointer">
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Types */}
        <div>
          <h4 className="font-medium mb-3">Vehicle Type</h4>
          <div className="space-y-2">
            {availableVehicleTypes.map((vehicle) => (
              <div key={vehicle} className="flex items-center gap-2">
                <Checkbox
                  id={`vehicle-${vehicle}`}
                  checked={filters.vehicleTypes.includes(vehicle)}
                  onCheckedChange={() => toggleArrayFilter("vehicleTypes", vehicle)}
                />
                <Label htmlFor={`vehicle-${vehicle}`} className="text-sm font-normal cursor-pointer">
                  {vehicle}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Pet Types */}
        <div>
          <h4 className="font-medium mb-3">Pet Types</h4>
          <div className="space-y-2">
            {availablePetTypes.map((pet) => (
              <div key={pet} className="flex items-center gap-2">
                <Checkbox
                  id={`pet-${pet}`}
                  checked={filters.petTypes.includes(pet)}
                  onCheckedChange={() => toggleArrayFilter("petTypes", pet)}
                />
                <Label htmlFor={`pet-${pet}`} className="text-sm font-normal cursor-pointer">
                  {pet}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${range.value}`}
                  checked={filters.priceRange.includes(range.value)}
                  onCheckedChange={() => toggleArrayFilter("priceRange", range.value)}
                />
                <Label htmlFor={`price-${range.value}`} className="text-sm font-normal cursor-pointer">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div>
          <h4 className="font-medium mb-3">Credentials</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="licensed"
                checked={filters.licensed}
                onCheckedChange={(checked) => updateFilters({ licensed: checked as boolean })}
              />
              <Label htmlFor="licensed" className="text-sm font-normal cursor-pointer">
                Licensed
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="insured"
                checked={filters.insured}
                onCheckedChange={(checked) => updateFilters({ insured: checked as boolean })}
              />
              <Label htmlFor="insured" className="text-sm font-normal cursor-pointer">
                Insured
              </Label>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Minimum Rating</h4>
            <span className="text-sm text-muted-foreground">
              {filters.minRating > 0 ? `${filters.minRating}+` : "Any"}
            </span>
          </div>
          <Slider
            value={[filters.minRating]}
            onValueChange={([value]) => updateFilters({ minRating: value })}
            max={5}
            step={0.5}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>5</span>
          </div>
        </div>

        {/* Distance */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Max Distance</h4>
            <span className="text-sm text-muted-foreground">{filters.maxDistance} mi</span>
          </div>
          <Slider
            value={[filters.maxDistance]}
            onValueChange={([value]) => updateFilters({ maxDistance: value })}
            max={50}
            step={5}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 mi</span>
            <span>50 mi</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
