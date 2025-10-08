"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface VeterinaryFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  services: string[]
  emergency24_7: boolean
  acceptsWalkIns: boolean
  minRating: number
  maxDistance: number
}

const availableServices = [
  "General Care",
  "Emergency Care",
  "Surgery",
  "Dental",
  "Vaccinations",
  "X-Ray",
  "Diagnostics",
  "Grooming",
  "Behavioral Consultation",
]

export function VeterinaryFilters({ onFilterChange }: VeterinaryFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    emergency24_7: false,
    acceptsWalkIns: false,
    minRating: 0,
    maxDistance: 50,
  })

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleService = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service]
    updateFilters({ services: newServices })
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      services: [],
      emergency24_7: false,
      acceptsWalkIns: false,
      minRating: 0,
      maxDistance: 50,
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters =
    filters.services.length > 0 ||
    filters.emergency24_7 ||
    filters.acceptsWalkIns ||
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
                  id={service}
                  checked={filters.services.includes(service)}
                  onCheckedChange={() => toggleService(service)}
                />
                <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="emergency"
                checked={filters.emergency24_7}
                onCheckedChange={(checked) => updateFilters({ emergency24_7: checked as boolean })}
              />
              <Label htmlFor="emergency" className="text-sm font-normal cursor-pointer">
                24/7 Emergency Care
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="walkins"
                checked={filters.acceptsWalkIns}
                onCheckedChange={(checked) => updateFilters({ acceptsWalkIns: checked as boolean })}
              />
              <Label htmlFor="walkins" className="text-sm font-normal cursor-pointer">
                Accepts Walk-ins
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
