"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddPetDialog } from "@/components/add-pet-dialog"
import { useAuth, type Pet } from "@/lib/auth-context"
import { Trash2, AlertCircle, Pill, Syringe, Heart } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PetProfileCardProps {
  pet: Pet
}

export function PetProfileCard({ pet }: PetProfileCardProps) {
  const { deletePet } = useAuth()

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex gap-4">
          {pet.photo ? (
            <img src={pet.photo || "/placeholder.svg"} alt={pet.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          )}
          <div>
            <CardTitle className="text-xl">{pet.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} old
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <AddPetDialog pet={pet} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {pet.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {pet.name}'s profile and all associated
                  medical information.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deletePet(pet.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {pet.allergies && (
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Allergies</p>
              <p className="text-sm text-muted-foreground">{pet.allergies}</p>
            </div>
          </div>
        )}

        {pet.conditions && (
          <div className="flex gap-2">
            <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Chronic Conditions</p>
              <p className="text-sm text-muted-foreground">{pet.conditions}</p>
            </div>
          </div>
        )}

        {pet.medications && (
          <div className="flex gap-2">
            <Pill className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Current Medications</p>
              <p className="text-sm text-muted-foreground">{pet.medications}</p>
            </div>
          </div>
        )}

        {pet.vaccinations && (
          <div className="flex gap-2">
            <Syringe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Vaccinations</p>
              <p className="text-sm text-muted-foreground">{pet.vaccinations}</p>
            </div>
          </div>
        )}

        {!pet.allergies && !pet.conditions && !pet.medications && !pet.vaccinations && (
          <p className="text-sm text-muted-foreground">No medical information added yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
