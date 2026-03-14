"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PRICING, RegistrationCategory, Registrant } from "@/app/lib/types";
import { store } from "@/app/lib/store";
import { User, Mail, Phone, IndianRupee, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Professional" as RegistrationCategory,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9).toUpperCase();
    const registrant: Registrant = {
      id,
      ...formData,
      amount: PRICING[formData.category],
      status: "Pending",
      registrationDate: new Date().toISOString(),
    };
    
    store.save(registrant);
    router.push(`/checkout?id=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-xl border-none shadow-2xl bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold font-headline text-primary">Join the Sangha</CardTitle>
            <CardDescription className="text-lg">Register for Hindu Sakti 2024</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Participation Category</Label>
                <RadioGroup 
                  defaultValue={formData.category} 
                  onValueChange={(v) => setFormData({ ...formData, category: v as RegistrationCategory })}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {(Object.keys(PRICING) as RegistrationCategory[]).map((cat) => (
                    <Label
                      key={cat}
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        formData.category === cat ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={cat} className="sr-only" />
                        <div>
                          <p className="font-bold text-foreground">{cat}</p>
                          <p className="text-xs text-muted-foreground">Access all sessions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">₹{PRICING[cat]}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 pt-6">
              <div className="w-full p-4 bg-muted/50 rounded-2xl flex justify-between items-center border border-muted">
                <span className="font-medium text-muted-foreground">Total Registration Fee</span>
                <span className="text-2xl font-bold text-foreground flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" /> {PRICING[formData.category]}
                </span>
              </div>
              <Button type="submit" className="w-full h-14 text-lg font-bold rounded-full group">
                Proceed to Payment <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
