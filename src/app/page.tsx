
"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CalendarDays, MapPin, Users, Heart, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-spiritual');
  
  return (
    <div className="flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover brightness-[0.4]"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground border border-primary/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wider uppercase">Spiritual Awakening 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-headline leading-tight">
            Uniting the Sangha in <span className="text-primary">Divine Harmony</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Join the Hindu Sakti 2024 gathering. A journey of faith, community, and enlightenment dedicated to Lord Krishna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 py-7 text-lg font-bold shadow-xl shadow-primary/30">
              <Link href="/register">Register Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-7 text-lg bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20">
              Explore Event
            </Button>
          </div>
        </div>
      </section>

      {/* Event Intelligence Cards */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: CalendarDays, label: "Event Date", val: "Oct 15 - 20, 2024" },
            { icon: MapPin, label: "Location", val: "Spiritual Grounds, Bengaluru" },
            { icon: Users, label: "Expected Turnout", val: "10,000+ Delegates" }
          ].map((item, i) => (
            <Card key={i} className="border-none shadow-2xl bg-white/95 backdrop-blur-md transform hover:scale-105 transition-transform">
              <CardContent className="p-8 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">{item.val}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">Our Divine Vision</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/vision/800/600" 
                alt="Vision" 
                fill 
                className="object-cover"
                data-ai-hint="indian temple"
              />
            </div>
            <div className="space-y-8">
              {[
                { title: "Empowering Sangha", desc: "Building a stronger digital connect for the spiritual community.", icon: Heart },
                { title: "Cultural Resonance", desc: "A platform that respects and reflects our rich heritage.", icon: Sparkles },
                { title: "Secure Experience", desc: "Advanced verification for a safe and focused gathering.", icon: ShieldCheck }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simulation */}
      <footer className="bg-foreground text-white/60 py-12 px-4 text-center">
        <p className="text-sm">© 2024 SewaConnect - Dedicated to the Hindu Sakti Sangha.</p>
      </footer>
    </div>
  );
}
