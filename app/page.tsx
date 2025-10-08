import { SiteHeader } from "@/components/site-header"
import { ServiceCard } from "@/components/service-card"
import { SearchSection } from "@/components/search-section"
import { Stethoscope, Car, Shield, Clock, Heart, Star, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Quality Pet Care, <span className="text-primary">Right When You Need It</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Connect with trusted veterinary clinics and reliable pet transport services in your area. Your pet's
              health and safety, our priority.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mb-16">
            <SearchSection type="veterinary" />
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ServiceCard
              title="Find a Vet"
              description="Browse verified veterinary clinics, read reviews, and book appointments with trusted professionals near you."
              icon={Stethoscope}
              href="/veterinary"
              iconBgColor="bg-primary/10"
              iconColor="text-primary"
            />
            <ServiceCard
              title="Pet Transport"
              description="Find reliable pet chaperones and transport services for safe, comfortable travel for your furry friends."
              icon={Car}
              href="/chaperone"
              iconBgColor="bg-accent/10"
              iconColor="text-accent"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose PetCare Connect?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              We make finding quality pet care simple and trustworthy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-muted-foreground text-pretty">
                All veterinary clinics and transport services are thoroughly vetted and verified
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Reviews</h3>
              <p className="text-muted-foreground text-pretty">
                Read honest reviews from pet owners who've used these services
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-muted-foreground text-pretty">
                Find emergency veterinary care and transport services anytime, day or night
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
            <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Are You a Pet Care Provider?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join our network of trusted veterinary clinics and pet transport services. Connect with pet owners in your
              area.
            </p>
            <Button size="lg" variant="default" asChild>
              <Link href="/provider-signup">List Your Service</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <PawPrint className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">PetCare Connect</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Connecting pet owners with quality care providers since 2025.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/veterinary" className="hover:text-foreground transition-colors">
                    Find a Vet
                  </Link>
                </li>
                <li>
                  <Link href="/chaperone" className="hover:text-foreground transition-colors">
                    Pet Transport
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-foreground transition-colors">
                    Emergency Care
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/provider-signup" className="hover:text-foreground transition-colors">
                    List Your Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PetCare Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
